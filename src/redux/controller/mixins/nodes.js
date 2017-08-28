import { EVENT, STATE } from '../../../../common/constants'
import { Actions, StateActions } from '../../actions'
import { inProgress, success, error } from '../../../utils/stateMachines'
import { CONNECT_NODE } from '../../../utils/modals'
import { NodeConnector } from '../../../nodeConnector'

function initNodeConnector () {
  if (!this._nodeConnector) {
    this._nodeConnector = new NodeConnector(this._getState('config').networks)

    // when node disconnects let's show the node connector
    this._nodeConnector.on(EVENT.STATE_CHANGE, (newState, reason) => {
      if (STATE.DISCONNECTED === newState) {
        this._action(Actions.NODE_DISCONNECTED, reason)
      }
    })
  }

  return this._nodeConnector
}

module.exports = {
  setSelected: function (nodeKey) {
    this._action(Actions.SET_SELECTED_NODE, nodeKey)
  },

  showConnectionModal: function () {
    this.modals.show(CONNECT_NODE)
  },

  hideConnectionModal: function () {
    this.modals.hide(CONNECT_NODE)
  },

  connect: async function (nodeConfig) {
    this._log.info('Connecting to node...')

    this._stateAction(StateActions.CONNECT_NODE, inProgress)

    const connector = initNodeConnector.call(this)

    // keep track of what's going on in connector
    const onConnectingUpdate = (msg) => {
      this._stateAction(StateActions.CONNECT_NODE, inProgress, msg)
    }
    // event listener
    connector.on(EVENT.STATE_CHANGE, (newState, msg) => {
      if (STATE.CONNECTING === newState) {
        onConnectingUpdate(msg)
      }
    })

    try {
      const genesisBlock = await connector.connect(nodeConfig)

      this._log.info('Node connection succeeded!')

      this._stateAction(StateActions.CONNECT_NODE, success, genesisBlock)

      // reload wallet for new network
      this._log.debug('Reload wallet, now that we have a new connection ...')
      await this.wallet.reloadCurrent()
    } catch (err) {
      this._log.warn('Node connection failed', err)

      this._stateAction(StateActions.CONNECT_NODE, error, err)

      throw err
    } finally {
      // remove previously set event listener
      connector.removeListener(EVENT.STATE_CHANGE, onConnectingUpdate)
    }
  },

  getCurrentConnection: function () {
    return this._nodeConnector
  },

  sendRequest: async function (payload) {
    const connector = initNodeConnector.call(this)

    return connector.request(payload)
  }
}
