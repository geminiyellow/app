import Immutable from 'immutable'

import {
  getNodeIsConnected,
  getDisconnectReason,
  getNodeConnection,
  getLatestBlock
} from './selectors'

describe('.getLatestBlock()', () => {
  it('returns latest block', () => {
    const state = {
      node: new Immutable.Map({
        latestBlock: 123
      })
    }

    expect(getLatestBlock(state)).toEqual(123)
  })
})

describe('.getNodeIsConnected()', () => {
  it('returns connection status', () => {
    const state = {
      node: new Immutable.Map({
        isConnected: 123
      })
    }

    expect(getNodeIsConnected(state)).toEqual(123)
  })
})

describe('.getNodeConnection()', () => {
  it('returns connection status', () => {
    const state = {
      node: new Immutable.Map({
        connection: 123
      })
    }

    expect(getNodeConnection(state)).toEqual(123)
  })
})

describe('.getDisconnectReason()', () => {
  it('returns disconnection reason', () => {
    const state = {
      node: new Immutable.Map({
        disconnectionReason: 123
      })
    }

    expect(getDisconnectReason(state)).toEqual(123)
  })
})
