import Q from 'bluebird'
import _ from 'lodash'
import { buildAction } from '../actions'
import log from '../../utils/log'


/**
 * Controller/controller
 */
class Controller {
  constructor () {
    this._log = log.create('controller')

    this._loadMixin('init', require('./mixins/init'))
    this._loadMixin('nav', require('./mixins/nav'))
    this._loadMixin('modals', require('./mixins/modals'))
    this._loadMixin('nodes', require('./mixins/nodes'))
    this._loadMixin('wallet', require('./mixins/wallet'))
  }

  setStore (store) {
    this._dispatch = store.dispatch
    this._getState = (name) => store.getState()[name].toObject()
  }

  _loadMixin (namespace, methods) {
    if (_.isFunction(methods)) {
      this[namespace] = Q.method(methods).bind(this)
    } else {
      this[namespace] = {}

      _.each(methods, (body, key) => {
        this[namespace][key] = Q.method(body).bind(this)
      })
    }
  }

  _action (type, payload) {
    this._dispatch(buildAction(type, payload))
  }

  _stateAction (type, state, data) {
    if (typeof state !== 'string') {
      throw new Error('State must be a string')
    }

    this._dispatch(buildAction(type, {
      state: state,
      data: data,
    }))
  }
}



export default new Controller()
