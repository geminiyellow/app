const _ = require('lodash'),
  { app } = require('electron'),
  path = require('path'),
  Q = require('bluebird'),
  EventEmitter = require('eventemitter3'),
  nodesConfig = require('./config/nodes.json'),
  Settings = require('./settings'),
  log = require('./logger').create('NodeConnector')



class NodeConnector {
  constructor () {
    this._connectedTo = null
  }

  get isConnected () {
    return null !== this._connectedTo
  }

  /**
   * Startup the client node.
   *
   * @return {Promise}
   */
  connect (ev) {
    ev = ev || new EventEmitter();

    if (this.isConnected) {
      ev.emit('connected');

      return Q.resolve();
    }

    return this.ensureBinary(ev)
      .then(() => {
        ev.emit('starting');

        this._inst = geth({
          autoMine: true,
          gethPath: this._gethPath,
          verbose: Settings.enableNodeLogging,
          logger: log.create('geth'),
          gethOptions: {
            port: 38543,
            rpcport: 38545,
          },
          genesisBlock: {
            difficulty: '0x1',
          }
        });

        return this._inst.start();
      })
      .then(() => {
        ev.emit('started');
      })
      .catch((err) => {
        log.error('Error starting client', err);

        ev.emit('error', err);

        throw err;
      });
  }


  /**
   * @return {Promise}
   */
  shutdown() {
    if (this.isRunning) {
      return this._inst.stop()
        .catch((err) => {
          log.error('Error stopping client', err);

          throw err;
        })
    } else {
      return Q.resolve();
    }
  }


  /**
   * Ensure client binary exists.
   *
   * This will download it if necessary.
   *
   * @return {Promise}
   */
  ensureBinary (ev) {
    ev = ev || new EventEmitter();

    log.info('Ensure client binary exists ...');

    const mgr = new ClientManager(clientBinariesConfig);
    mgr.logger = log;

    ev.emit('scanning');

    return mgr.init({
      folders: [
        path.join(Settings.userDataDir, 'binaries', 'Geth', 'unpacked'),
      ]
    })
      .then(() => {
        const item = mgr.clients.Geth;

        if (!item) {
          throw new Error('Geth not available for this platform.');
        }

        if (!item.state.available) {
          log.info('Downloading client binary ...');

          // download
          return mgr.download('Geth', {
            downloadFolder: path.join(Settings.userDataDir, 'binaries'),
          });
        }
      })
      .then(() => {
        const item = mgr.clients.Geth;

        if (item.state.available) {
          this._gethPath = item.activeCli.fullPath;

          log.info('Client binary found', this._gethPath);

          ev.emit('found');
        } else {
          throw new Error('Valid Geth could not be found or downloaded.');
        }
      })
      .catch((err) => {
        log.error('Error checking for client binaries', err);

        ev.emit('error', err);

        throw err;
      });

    return ev;
  }
}


module.exports = new NodeConnector();
