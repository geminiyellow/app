import _ from 'lodash'
import React, { PureComponent } from 'react'


export default class WebView extends PureComponent {
  constructor (props, ctx) {
    super(props, ctx)

    this.webViewEventHandlers = {
      'did-start-loading': this.onLoading,
      'did-get-redirect-request': this.onRedirect,
      'did-navigate': this.onNavigate,
      'did-stop-loading': this.onLoaded,
      'did-fail-load': this.onLoadingError,
      'crashed': this.onLoadingError,
      'gpu-crashed': this.onLoadingError,
      'plugin-crashed': this.onLoadingError,
      'page-title-updated': this.onNewTitle,
      'new-window': this.onNewWindow,
      'ipc-message': this.onWeb3Request,
    }
  }

  render () {
    const { url } = this.props

    return (
      <webview
        ref={v => { this.webView = v }}
        src={url}
        style={{
          width: '100%',
          height: '100%',
        }}
        preload={`file://${window.preloadBasePath}/browserTab.js`}
      />
    )
  }

  componentWillUnmount () {
    _.map(this.webViewEventHandlers, (f, e) => {
      this.webView.removeEventListener(e, f)
    })
  }

  componentDidMount () {
    _.map(this.webViewEventHandlers, (f, e) => {
      this.webView.addEventListener(e, f)
    })
  }

  /* event handlers */

  onLoading = () => this.props.onLoading()
  onLoaded = () => this.props.onLoaded()
  onLoadingError = ({ isMainFrame, errorDescription }) => {
    if (isMainFrame) {
      this.props.onLoadingError(errorDescription)
    }
  }
  onNavigate = ({ url }) => {
    this.props.onRedirect(url)
  }
  onRedirect = ({ newURL, isMainFrame }) => {
    if (isMainFrame) {
      this.props.onRedirect(newURL)
    }
  }
  onNewTitle = ({ title }) => this.props.onNewTitle(title)
  onNewWindow = ({ url }) => this.props.onOpenNewWindow(url)

  onWeb3Request = ({ channel, args }) => {
    if ('web3' === channel) {
      console.log(args)
    }
  }

  /* public methods */

  openUrl = (url) => {
    this.webView.loadURL(url)
  }

  goBack = () => {
    this.webView.goBack()
  }

  goForward = () => {
    this.webView.goForward()
  }

  refresh = () => {
    this.webView.reload()
  }

  openDevTools = () => {
    this.webView.openDevTools()
  }
}
