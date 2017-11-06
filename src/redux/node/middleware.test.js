import { createAction } from '../utils'

import fn from './middleware'
import { CONNECT_NODE, DISCONNECT_NODE, NODE_CONNECTED, NODE_CONNECT_ERROR } from './actions'

describe('node middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)
  })

  describe('processes the DISCONNECT_NODE action', () => {
    it('and intercepts it', async () => {
      const next = jest.fn()

      const nodeConnector = {
        disconnect: jest.fn(() => Promise.resolve())
      }

      const handler = fn({ nodeConnector })()(next)

      const action = createAction(DISCONNECT_NODE)

      await handler(action)

      expect(next).not.toHaveBeenCalledWith(action)
    })

    it('and tries to disconnect the node', async () => {
      const next = jest.fn()

      const nodeConnector = {
        disconnect: jest.fn(() => Promise.resolve())
      }

      const handler = fn({ nodeConnector })()(next)

      const action = createAction(DISCONNECT_NODE)

      await handler(action)

      expect(nodeConnector.disconnect).toHaveBeenCalled()
    })
  })

  describe('processes the CONNECT_NODE action', () => {
    it('and intercepts it', async () => {
      const next = jest.fn()

      const store = {
        dispatch: jest.fn()
      }

      const nodeConnector = {
        connect: jest.fn(data => Promise.resolve({ config: data }))
      }

      const handler = fn({ nodeConnector })(store)(next)

      const action = createAction(CONNECT_NODE, {
        host: 'meth'
      })

      await handler(action)

      expect(store.dispatch).toHaveBeenCalled()
      expect(next).not.toHaveBeenCalledWith(action)
    })

    describe('and tries to connect the node connector', () => {
      let next
      let store
      let nodeConnector
      let handler

      beforeEach(async () => {
        next = jest.fn()

        store = {
          dispatch: jest.fn()
        }

        nodeConnector = {}

        handler = fn({ nodeConnector })(store)(next)
      })

      it('and dispatches the success state if connecting succeeds', async () => {
        const mockConnect = jest.fn(data => Promise.resolve({ config: data }))

        nodeConnector.connect = mockConnect

        const action = createAction(CONNECT_NODE, {
          host: 'meth'
        })

        await handler(action)

        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(createAction(NODE_CONNECTED, {
          node: {
            host: 'meth'
          },
          network: {
            config: {
              host: 'meth'
            }
          }
        }))
      })

      it('and dispatches the error state if connecting fails', async () => {
        const err = 123

        const mockConnect = jest.fn(() => Promise.reject(err))

        nodeConnector.connect = mockConnect

        const action = createAction(CONNECT_NODE, {
          host: 'meth'
        })

        try {
          await handler(action)
        } catch (err2) {
          expect(err).toEqual(err)
        }

        expect(store.dispatch).toHaveBeenCalledTimes(1)
        expect(store.dispatch).toHaveBeenCalledWith(createAction(NODE_CONNECT_ERROR, err))
      })
    })
  })
})
