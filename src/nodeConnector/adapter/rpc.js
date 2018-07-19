import { loadJSON } from '../../utils/fetch'
import { Adapter } from './base'
import METHODS from './availableMethods'

const RPC_METHODS = {
  ...METHODS,
  eth_coinbase: { shareable: true }
}


export default class RpcAdapter extends Adapter {
  constructor (nodeConfig) {
    super(nodeConfig, 'rpc', RPC_METHODS)

    this._url = nodeConfig.url
  }

  async _doExecMethod (id, method, params = []) {
    try {
      await this._checkMethodAllowed(method)

      this._log.trace(`Calling ${this._url} with method ${method}`)

      const json = await loadJSON(
        this._url,
        'POST',
        {},
        {
          jsonrpc: '2.0',
          id,
          method,
          params
        }
      )

      if (json.error) {
        this._throwError(JSON.stringify(json.error), json)
      } else {
        return json.result
      }
    } catch (err) {
      this._log.trace('Method call error', err)

      throw err
    }

    return true
  }
}
