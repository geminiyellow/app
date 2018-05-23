import { AsyncStorage } from 'react-native'
import PouchDB from 'pouchdb-core'
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage'

import logger from '../logger'
import { sha512 } from '../utils/crypto'
import AddressBook from './addressBook'
import CustomTokens from './customTokens'
import Transactions from './transactions'
import AppSettings from './appSettings'

PouchDBAsyncStorageAdapter(PouchDB)

const log = logger.create('Storage')

const DBCLASS = {
  addressBook: AddressBook,
  customTokens: CustomTokens,
  transactions: Transactions,
  appSettings: AppSettings
}

const PER_NETWORK_DBS = [ 'transactions', 'addressBook', 'customTokens' ]
const PER_MNEMONIC_DBS = [ 'appSettings' ]

/**
 * Writing to storage should be considered volatile, and storage calls should
 * be expected to fail at any time.
 */
class Storage {
  init ({ config, store }) {
    log.debug('Initializing ...')

    this._store = store
    this._syncUrl = config.getBackendUrl()
    this._db = {}
  }

  async setMnemonic (mnemonic) {
    log.info(`Set storage mnemonic ...`)

    this._mnemonic = mnemonic

    if (!this._mnemonic) {
      this.shutdownDatabases(...PER_MNEMONIC_DBS, ...PER_NETWORK_DBS)
    } else {
      this.setupDatabases(...PER_MNEMONIC_DBS)
    }
  }

  async setNetwork ({ description, genesisBlock } = {}) {
    if (!genesisBlock) {
      log.info('Clear storage network key')

      this.shutdownDatabases(...PER_NETWORK_DBS)
    } else {
      log.info(`Set storage network key: ${description} - ${genesisBlock} ...`)

      this._network = genesisBlock

      this.setupDatabases(...PER_NETWORK_DBS)
    }
  }

  get transactions () {
    return this._db.transactions
  }

  get addressBook () {
    return this._db.addressBook
  }

  get customTokens () {
    return this._db.customTokens
  }

  get appSettings () {
    return this._db.appSettings
  }

  shutdownDatabases (...dbKeys) {
    dbKeys.forEach(dbKey => {
      if (this._db[dbKey]) {
        log.info(`Shutdown database: ${dbKey} ...`)

        this._db[dbKey].shutdown()

        delete this._db[dbKey]
      }
    })
  }

  /**
   * Setup per-mnemonic databases
   */
  setupDatabases (...dbKeys) {
    if (!this._mnemonic) {
      return
    }

    const key = sha512(this._mnemonic)
    const authKey = key.substr(0, 64)
    const encryptionKey = key.substr(64)

    dbKeys.forEach(dbKey => {
      log.info(`Setup database: ${dbKey} ...`)

      this.shutdownDatabases(dbKey)

      this._db[dbKey] = new DBCLASS[dbKey](
        this._store,
        this._network,
        authKey,
        encryptionKey
      )
    })
  }

  /**
   * Load app data (call this when app starts)
   */
  loadAppData () {
    this._loadlastConnectedNodeId()
  }

  async _loadlastConnectedNodeId () {
    log.info('Load last connected node id ...')

    const data = await this._load('lastConnectedNodeId')

    if (data) {
      this._store.actions.injectLastConnectedNodeId(data)
    }
  }

  async saveLastConnectedNodeId (id) {
    log.debug('Save last connected node id ...', id)

    await this._save('lastConnectedNodeId', id)
  }

  async _load (key) {
    log.debug(`Load: ${key} ...`)

    const json = await AsyncStorage.getItem(key)

    try {
      return JSON.parse(json)
    } catch (err) {
      return undefined
    }
  }

  async _save (key, value) {
    log.debug(`Save: ${key} ...`)

    return AsyncStorage.setItem(key, JSON.stringify(value))
  }
}

export default new Storage()
