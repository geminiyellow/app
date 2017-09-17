import { createAction } from 'redux-actions'

import fn from './middleware'
import { INIT } from './actions'

describe('config middleware', () => {
  it('passes actions through', async () => {
    const next = jest.fn()

    const handler = fn({})()(next)

    const action = createAction('blah')

    await handler(action)

    expect(next).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledWith(action)

    expect(INIT).toBeDefined()
  })

  describe('processes the INIT action', () => {
    beforeEach(() => {
      jest.doMock('../../config', () => ({
        load: cfg => `${cfg} loaded`
      }))
    })

    afterEach(() => {
      jest.dontMock('../../config')
    })

    it('by loading the config', async () => {
      const next = jest.fn()

      const store = {
        getStateObject: () => ({})
      }

      const config = {
        load: arg => `${arg} loaded`
      }

      const handler = fn({ config })(store)(next)

      await handler(createAction(INIT)())

      expect(next).toHaveBeenCalledTimes(1)
      expect(next).toHaveBeenCalledWith(
        createAction(INIT, () => ({
          networks: 'networks loaded',
          nodes: 'nodes loaded'
        }))()
      )
    })

    it('unless config is already loaded', async () => {
      const next = jest.fn()

      const store = {
        getStateObject: () => ({
          nodes: 23
        })
      }

      const handler = fn({})(store)(next)

      await handler(createAction(INIT)())
      await handler(createAction(INIT)())
      await handler(createAction(INIT)())

      expect(next).not.toHaveBeenCalled()
    })
  })
})
