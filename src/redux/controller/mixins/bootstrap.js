import Q from 'bluebird'
import { Actions } from '../../actions'
import { load as loadConfig } from '../../../config'

export async function init() {
  const { nodes } = this._getState('config')

  if (!nodes) {
    const config = await Q.props({
      networks: loadConfig('networks'),
      nodes: loadConfig('nodes')
    })

    this._action(Actions.CONFIG, config)

    this.nodes.showConnectionModal()
  }
}
