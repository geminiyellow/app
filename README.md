# Meth Browser

The Meth dapp browser, for Ethereum addicts. **Work-in-progress**

Features:

* Cross-platform (Windows, Linux, Mac)
* Mnemonic-based HD wallet ([BIP44/EIP85](https://github.com/ethereum/EIPs/issues/85))
* Connects to local as well as remote Ethereum nodes

## Architecture

### Electron.js

The [Electron](http://electron.atom.io) layer launches the main window, which is running a
React.js app. All browser, connection and web3 logic is handled within this
window.

### Browser tabs

Browser tabs are actually [`WebView`](https://electron.atom.io/docs/api/webview-tag/) instances, and communicate back and
forth with the main browser window via asynchronous IPC.

Each browser tab has the following Javascript globals made available (via the
  [preload script](electron/preloader/browserTab.js)):

  * `web3` - a web3 connection to the Ethereum network. Every tab gets
 its own connection instance. _Note: due to the security architecture,
 synchronous web3 calls are not supported_.
  * `Meth` - access to custom Meth APIs, e.g. creating a new account.

## Development

Branches:
 * `dev` - Dev branch (default). Bleeding-edge code.
 * `master` - Production branch. Clean code, only approved pull requests allowed.

Requirements:
  * [Node.js 8.0.0](http://nodejs.org) **<- we recommend using this exact version!**
  * [Yarn](yarnpkg.com)

Once Node is installed, install the dependencies:

```shell
$ npm install
```

_Note: Yarn is not currently supported, use NPM 5+ instead_

Start a local Geth dev instance:

```shell
$ geth --dev --rpc --rpccorsdomain "*"
```

### Electron desktop app

To build frontend for development:

```shell
$ npm run web
```

To start the electron backend and full UI:

```shell
$ npm run electron
```
