import Q from 'bluebird'
import EventEmitter from 'eventemitter3'

import { EVENT, STATE, ERROR } from '../../../common/constants'
const log = require('../../utils/log').create('Adapter')



/**
 * Base node connection adapter
 *
 * Supports stateful connection.
 */
class Adapter extends EventEmitter {
  /**
   * @constructor
   * @param  {Object} nodeConfig node config
   * @param  {String} adapterType
   * @param  {Object} availableMethods (String method_name => Boolean allowed)
   */
  constructor (nodeConfig, adapterType, availableMethods) {
    super()

    this._adapterType = adapterType
    this._nodeConfig = nodeConfig
    this._methods = availableMethods
    this._callId = 0 // 'id' incremental counter
    this._state = STATE.DISCONNECTED
    this._blockPollEnabled = true

    this._log = log.create(adapterType)
  }

  get isConnected () {
    return STATE.CONNECTED === this._state
  }

  get state () {
    return this._state
  }

  _updateState (state) {
    this._state = state

    this.emit(EVENT.STATE_CHANGE, state)
  }

  /**
   * Connect.
   * @return {Promise}
   */
  async connect () {
    if (STATE.CONNECTED === this._state) {
      this._log.trace('Already connected')

      return Q.resolve()
    }

    if (STATE.CONNECTING === this._state && this._connectPromise) {
      this._log.trace('Already connecting')

      return this._connectPromise
    }

    this._log.trace('Connecting...')
    this._updateState(STATE.CONNECTING, 'Connecting...')

    this._connectPromise = this._connect()

    try {
      await this._connectPromise

      this._log.trace('Connected')

      this._connectPromise = null
      this._updateState(STATE.CONNECTED)

      this._startBlockPoll()
    } catch (err) {
      this._log.trace('Connection error', err)

      this._updateState(STATE.DISCONNECTED)

      throw err
    }
  }

  /**
   * Disconnect.
   *
   * @return {Promise}
   */
  async disconnect () {
    if (STATE.DISCONNECTED === this._state) {
      this._log.trace('Already disconnected')

      return Q.resolve()
    }

    if (STATE.DISCONNECTING === this._state && this._disconnectPromise) {
      this._log.trace('Already disconnecting')

      return this._disconnectPromise
    }

    this._log.trace('Disconnecting...')
    this._stopBlockPoll()
    this._updateState(STATE.DISCONNECTING)
    this._disconnectPromise = this._disconnect()

    try {
      await this._disconnectPromise

      this._log.trace('Disconnected')

      this._disconnectPromise = null
      this._updateState(STATE.DISCONNECTED)
    } catch (err) {
      this._log.trace('Disconnection error', err)

      throw err
    }
  }


  /**
   * Execute a method
   * @return {Promise}
   */
  async execMethod (method, params) {
    try {
      return this._doExecMethod(++this._callId, method, params)
    } catch (err) {
      this._log.debug('Method exec error', err)

      // augment the error
      err.method = method
      err.params = params
      throw err
    }
  }


  /**
   * Actual connect method.
   *
   * Subclasses may override this.
   *
   * @return {Promise}
   */
  async _connect () {
    this._log.trace('Connect...', this._url)

    try {
      await this.execMethod('eth_blockNumber')

      this._log.trace('Connection successful')
    } catch (err) {
      this._log.trace('Connection failed', err)

      throw err
    }
  }

  /**
   * Actual disconnect method.
   *
   * Subclasses may override this.
   *
   * @return {Promise}
   */
  async _disconnect () {
    this._log.debug('Disconnected')

    return Q.resolve()
  }


  /**
   * Execute a method, to be implemented by subclasses
   * @return {Promise}
   */
  async _doExecMethod (requestId, method, params) {
    throw new Error('Not yet implemented')
  }


  /**
   * Approve given method call
   * @param  {String} method
   * @return {Promise}
   */
  async _approveMethod (method) {
    if (true !== this._methods[method]) {
      throw new Error(ERROR.METHOD_NOT_ALLOWED)
    }
  }


  /**
   * Poll for latest block.
   *
   * Subclasses may override this.
   */
  async _doBlockPoll () {
    if (!this._blockPollEnabled) {
      return
    }

    const block = await this.execMethod(
      'eth_getBlockByNumber', ['latest', false]
    )

    if (block.number !== this._lastBlockNumber) {
      this._log.info(`Got new block ${block.number}`)

      this._lastBlockNumber = block.number

      this.emit(EVENT.NEW_BLOCK, block)
    }

    if (this._blockPollEnabled) {
      // every 10 seconds
      setTimeout(() => this._doBlockPoll, 5000)
    }
  }

  /**
   * Start polling for latest block.
   *
   * Subclasses may override this.
   */
  _startBlockPoll () {
    this._log.info(`Start polling for blocks`)

    this._doBlockPoll()
  }

  /**
   * Stop polling for latest block.
   *
   * Subclasses may override this.
   */
  _stopBlockPoll () {
    this._log.info(`Stop polling for blocks`)

    this._blockPollEnabled = false
  }

  /**
   * Construct and throw an error
   * @param  {String} errMsg  [description]
   * @param  {Object} details [description]
   * @throws {Error}
   */
  _throwError (errMsg, details) {
    const e = new Error(errMsg)
    e.details = details
    throw e
  }
}

exports.Adapter = Adapter
