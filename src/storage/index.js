import { AsyncStorage } from 'react-native'
import PouchDB from 'pouchdb-core'
import PouchDBAsyncStorageAdapter from 'pouchdb-adapter-asyncstorage'

import logger from '../logger'
import { sha512 } from '../utils/crypto'
import AddressBook from './addressBook'
import CustomTokens from './customTokens'
import Transactions from './transactions'

PouchDBAsyncStorageAdapter(PouchDB)

const log = logger.create('Storage')

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

    this.setupDatabases()
  }

  async setNetwork ({ description, genesisBlock } = {}) {
    if (!genesisBlock) {
      log.info('Clear storage network key')

      this.shutdownDatabases()
    } else {
      log.info(`Set storage network key: ${description} - ${genesisBlock} ...`)
    }

    this._network = genesisBlock

    this.setupDatabases()
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

  shutdownDatabases () {
    Object.keys(this._db).forEach(dbKey => {
      this._db[dbKey].destroy()
    })

    this._db = {}
  }

  /**
   * Setup db replication sync
   * @return {[type]} [description]
   */
  setupDatabases () {
    this.shutdownDatabases()

    const { authKey, encryptionKey } = this._generateKeys()

    if (!authKey || !encryptionKey) {
      return
    }

    this._db = {
      transactions: new Transactions(this._store, authKey, encryptionKey),
      addressBook: new AddressBook(this._store, authKey, encryptionKey),
      customTokens: new CustomTokens(this._store, authKey, encryptionKey)
    }

    // this._dbSync = PouchDB.sync(dbKey, `${this._syncUrl}/${dbKey}`, {
    //   live: true,
    //   retry: true
    // }).on('change', info => {
    //   log.debug('db sync: change', info)
    // }).on('paused', err => {
    //   console.log('replication paused')
    // }).on('active', () => {
    //   console.log('replication resumed')
    // }).on('denied', err => {
    //   console.log('replication denied')
    // }).on('complete', info => {
    //   console.log('replication complete')
    // }).on('error', err => {
    //   console.log('replication error', err)
    // })
  }

  /**
   * Load app data (call this when app starts)
   */
  loadAppData () {
    this._loadlastConnectedNodeId()
  }

  /**
   * Load user data (call this once password and network has been set)
   */
  // loadUserData () {
  //   this._loadUserData('addressBook', this._store.actions.injectAddressBook)
  //   this._loadUserData('bookmarks', this._store.actions.injectBookmarks)
  //   this._loadUserData(
  //     'dappPermissions',
  //     this._store.actions.injectDappPermissions
  //   )
  //   this._loadUserData('customTokens', this._store.actions.injectCustomTokens)
  //   this._loadUserData(
  //     'transactionHistory',
  //     this._store.actions.injectTransactionHistory
  //   )
  // }

  // async _loadUserData (key, onSuccess) {
  //   if (!this._canConstructUserKey()) {
  //     return
  //   }
  //
  //   log.info(`Load ${key} ...`)
  //
  //   const data = await this._load(this._userKey(key))
  //
  //   if (data) {
  //     onSuccess(data)
  //   }
  // }

  async _loadlastConnectedNodeId () {
    log.info('Load last connected node id ...')

    const data = await this._load('lastConnectedNodeId')

    if (data) {
      this._store.actions.injectLastConnectedNodeId(data)
    }
  }
  //
  // async saveTransactionHistory (data) {
  //   log.debug('Save transaction history ...', data)
  //
  //   await this._save(this._userKey('transactionHistory'), data)
  // }
  //
  // async saveDappPermissions (data) {
  //   log.debug('Save dapp permissions ...', data)
  //
  //   await this._save(this._userKey('dappPermissions'), data)
  // }
  //
  // async saveAddressBook (data) {
  //   log.debug('Save address book ...', data)
  //
  //   await this._save(this._userKey('addressBook'), data)
  // }
  //
  // async saveCustomTokens (data) {
  //   log.debug('Save custom tokens ...', data)
  //
  //   await this._save(this._userKey('customTokens'), data)
  // }
  //
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

  // _userKey (key) {
  //   if (!this._canConstructUserKey()) {
  //     log.throw('Mnemonic and network need to be set')
  //   }
  //
  //   return `${this._mnemonicHash}-${this._network}-${key}`
  // }

  _generateKeys () {
    if (!this._mnemonic || !this._network) {
      return {}
    }

    const key = sha512(`${this._mnemonic}-${this._network}`)

    return {
      authKey: key.substr(0, 64),
      encryptionKey: key.substr(64)
    }
  }

  // _canConstructUserKey () {
  //   return !!this._mnemonic && !!this._network
  // }

  // _dbKey (dbName) {
  //   if (!this._canConstructUserKey()) {
  //     return null
  //   }
  //
  //   return `${this._mnemonicHash}-${this._network}-${dbName}`
  // }
}

export default new Storage()
