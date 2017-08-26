/*
 * The default preload script for each Dapp browser tab.
 *
 * This will setup the web3 instance for any Dapp running in the page.
 */
const { ipcRenderer: ipc } = require('electron')
const Web3 = require('web3')

class Web3IpcProvider {
  constructor () {
    this._requests = {}

    ipc.on('web3', (a) => {
      // take into account batch requests
      const firstRequest = (a instanceof Array) ? a[0] : a

      const req = this._requests[firstRequest.id]

      if (req) {
        if (a.error) {
          req.reject(a)
        } else {
          req.resolve(a)
        }
      }
    })
  }

  isConnected () {
    return true
  }

  send () {
    throw new Error('Synchronous web3 calls are not supported.')
  }

  sendAsync (payload, callback) {
    // take into account batch requests
    const firstRequest = (payload instanceof Array) ? payload[0] : payload

    new Promise((resolve, reject) => {
      this._requests[firstRequest.id] = { resolve, reject }
    })
      .then(result => { callback(null, result) })
      .catch(callback)

    ipc.sendToHost('web3', payload)
  }
}

window.web3 = new Web3(new Web3IpcProvider())
