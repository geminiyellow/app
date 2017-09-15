const { app } = require('electron')

const IpcImpl = require('./ipc')
const Settings = require('./settings')
const BrowserTools = require('./browserTools')
const { setupMainWindow } = require('./windows')
const log = require('./logger').create('main')

global.Ipc = new IpcImpl()

const isOSX = 'darwin' === process.platform

let mainWindow

const createMainWindow = () => {
  log.info('Creating main window ...')

  // Create the browser window.
  mainWindow = setupMainWindow()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    log.info('Window closed')

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // Hence we shall nullify the reference when the window is closed
    if (isOSX) {
      mainWindow = null
    }
  })

  require('./menu').setup()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  log.info('App ready')

  // BrowserTools.installDefaultExtensions().finally(() => {
    createMainWindow()
  // })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  log.debug('All windows closed')

  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isOSX) {
    log.debug('Exit app')

    app.quit()
  }
})


// Extra security, see https://github.com/electron/electron/blob/master/docs/tutorial/security.md
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // disable nodeIntegration
    webPreferences.nodeIntegration = false
    // only allow our custom preload script - disable all others
    if (0 > webPreferences.preloadURL.indexOf(Settings.preloadBasePath)) {
      log.error('WebView started with disallowed preload script: ' + webPreferences.preloadURL)

      event.preventDefault()
    }
  })
})

// activate
app.on('activate', function () {
  log.info('App activated')

  // if reference was previously nullified we need to recreate the window
  if (!mainWindow) {
    createMainWindow()
  } else {
    mainWindow.show()
  }
})
