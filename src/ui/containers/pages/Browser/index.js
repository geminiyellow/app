import _ from 'lodash'
import React from 'react'

import DAPP_PERMISSIONS from '../../../../../common/constants/dappPermissions'
import API from '../../../../../common/constants/api'
import IPC_UI_TASKS from '../../../../../common/constants/ipcUiTasks'
import STATE from '../../../../../common/constants/states'
import { t } from '../../../../../common/strings'
import { createDappId } from '../../../../utils/dapp'
import { globalEvents } from '../../../../env'
import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import BrowserViewsContainer from './BrowserViewsContainer'
import BrowserTabBar from '../../../components/BrowserTabBar'
import BrowserTabView from '../../../components/BrowserTabView'
import BookmarksModal from '../../modals/Bookmarks'

const newTabId = () => `${_.random(1, 1000000000)}`

const DEFAULT_PERMISSIONS = {
  [DAPP_PERMISSIONS.ALL_ADDRESSES]: true
}

const API_METHOD_NAMES = Object.values(API)

@connectStore('account')
export default class Browser extends CachePureComponent {
  static navigationOptions = {
    drawerLabel: t('title.browser'),
    title: t('title.browser')
  }

  state = {
    tabs: [
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      },
      {
        active: true,
        id: newTabId(),
        label: 'Meth',
        url: 'https://meth.app'
      }
    ]
  }

  render () {
    const tabs = _.compact(this.state.tabs)
    const activeIndex = tabs.findIndex(tab => !!tab.active)

    return (
      <Layout contentStyle={styles.layoutContent}>
        <BrowserTabBar
          tabs={tabs}
          onSort={this.onSortTabs}
          onSelect={this.onSelectTab}
          onClose={this.onCloseTab}
          onNewTab={this.openNewTab}
        />
        <BrowserViewsContainer
          style={styles.browserViews}
          activeIndex={activeIndex}
          views={this._buildViews()}
          onSelect={this.onSelectTab}
          onClose={this.onCloseTab}
        >
        </BrowserViewsContainer>
        <BookmarksModal
          ref={this._onBookmarksModalRef}
          onEditBookmark={this.editBookmark}
          onSelectBookmark={this.openNewTab}
        />
      </Layout>
    )
  }

  componentDidMount () {
    globalEvents.on(IPC_UI_TASKS.OPEN_ACTIVE_TAB_DEV_TOOLS, this.openActiveTabDevTools)
    globalEvents.on(IPC_UI_TASKS.OPEN_BOOKMARKS, this.onShowBookmarks)
    globalEvents.on(IPC_UI_TASKS.OPEN_NEW_TAB, this.openNewTab)
    globalEvents.on(IPC_UI_TASKS.RELOAD_TAB, this.reloadActiveTab)
    globalEvents.on(IPC_UI_TASKS.CLOSE_TAB, this.closeActiveTab)
    globalEvents.on(IPC_UI_TASKS.EDIT_TAB_URL, this.editActiveTabUrl)
    globalEvents.on(IPC_UI_TASKS.GOTO_PREVIOUS_TAB, this.gotoPreviousTab)
    globalEvents.on(IPC_UI_TASKS.GOTO_NEXT_TAB, this.gotoNextTab)
  }

  componentWillUnmount () {
    globalEvents.off(IPC_UI_TASKS.OPEN_ACTIVE_TAB_DEV_TOOLS, this.openActiveTabDevTools)
    globalEvents.off(IPC_UI_TASKS.OPEN_BOOKMARKS, this.onShowBookmarks)
    globalEvents.off(IPC_UI_TASKS.OPEN_NEW_TAB, this.openNewTab)
    globalEvents.off(IPC_UI_TASKS.RELOAD_TAB, this.reloadActiveTab)
    globalEvents.off(IPC_UI_TASKS.CLOSE_TAB, this.closeActiveTab)
    globalEvents.off(IPC_UI_TASKS.EDIT_TAB_URL, this.editActiveTabUrl)
    globalEvents.off(IPC_UI_TASKS.GOTO_PREVIOUS_TAB, this.gotoPreviousTab)
    globalEvents.off(IPC_UI_TASKS.GOTO_NEXT_TAB, this.gotoNextTab)
  }

  _onBookmarksModalRef = r => {
    this.bookmarksModal = r
  }

  _buildViews () {
    const { getDappPermissions, getBookmarks } = this.props.selectors

    const dappPermissions = getDappPermissions()
    const bookmarks = getBookmarks()

    const tabs = _.compact(this.state.tabs)
    const apiMethods = _.pick(this.props.actions, ...API_METHOD_NAMES)

    return tabs.map(tab => {
      const { id, active, url } = tab

      const bookmark = bookmarks.find(({ url: bUrl }) => bUrl === url)

      return {
        id,
        active,
        renderedChild: (
          <BrowserTabView
            ref={view => {
              if (active) {
                this.activeTabView = view
              }
            }}
            url={url}
            hasBookmark={!!bookmark}
            permissions={dappPermissions[createDappId(tab)] || DEFAULT_PERMISSIONS}
            apiMethods={apiMethods}
            onEditDappPermissions={this.bind(this.onEditPermissions, id)}
            onUrlChange={this.bind(this.onTabUrlChange, id)}
            onLoading={this.bind(this.onTabStatusChange, id, STATE.LOADING)}
            onLoaded={this.bind(this.onTabStatusChange, id, STATE.LOADED)}
            onLoadingError={this.bind(this.onTabStatusChange, id, STATE.ERROR)}
            onTitleChange={this.bind(this.onTabTitleChange, id)}
            onOpenNewWindow={this.openNewTab}
            onShowBookmarks={this.onShowBookmarks}
            onEditBookmark={this.bind(this.onEditBookmark, id)}
          />
        )
      }
    })
  }

  onShowBookmarks = () => {
    this.bookmarksModal.getWrappedInstance().show()
  }

  openActiveTabDevTools = () => {
    if (this.activeTabView) {
      this.activeTabView.openDevTools()
    }
  }

  onEditBookmark = id => {
    const { tabs } = this.state
    const tab = tabs.find(tab_ => tab_.id === id)

    if (tab) {
      this.editBookmark(tab.url, tab.label)
    }
  }

  editBookmark (url, label) {
    const { showEditBookmarkModal } = this.props.actions

    showEditBookmarkModal(url, label)
  }

  openNewTab = url => {
    const id = newTabId()

    this.setState({
      tabs: [ ...this.state.tabs, {
        id,
        label: url || 'about:blank',
        url: url || 'about:blank',
        status: STATE.LOADING
      } ]
    }, () => {
      this.onSelectTab(id)
    })
  }

  reloadActiveTab = () => {
    if (this.activeTabView) {
      this.activeTabView.refresh()
    }
  }

  closeActiveTab = () => {
    const { tabs } = this.state

    const tab = tabs.find(({ active }) => !!active)

    if (tab) {
      this.onCloseTab(tab.id)
    }
  }

  editActiveTabUrl = () => {
    if (this.activeTabView) {
      this.activeTabView.focusAddressBar()
    }
  }

  gotoNextTab = () => {
    const { tabs } = this.state

    let index = Math.max(0, tabs.findIndex(tab => !!tab.active))

    index = (tabs.length - 1 === index) ? 0 : index += 1

    this.onSelectTab(tabs[index].id)
  }

  gotoPreviousTab = () => {
    const { tabs } = this.state

    let index = Math.max(0, tabs.findIndex(tab => !!tab.active))

    index = (0 === index) ? tabs.length - 1 : index -= 1

    this.onSelectTab(tabs[index].id)
  }

  onTabUrlChange = (id, url) => {
    this._updateTabs(tab => {
      if (tab.id === id) {
        // eslint-disable-next-line no-param-reassign
        tab.url = url
      }
    })
  }

  onTabTitleChange = (id, title) => {
    this._updateTabs(tab => {
      if (tab.id === id) {
        // eslint-disable-next-line no-param-reassign
        tab.label = title
      }
    })
  }

  onTabStatusChange = (id, status) => {
    // tab status changes rapidly at times, let's smoothen things out so that
    // we don't update the display too often, by using a timer.
    clearTimeout(this._tabStatusTimer)
    this._tabStatusTimer = setTimeout(() => {
      this._updateTabs(tab => {
        if (tab.id === id) {
          // eslint-disable-next-line no-param-reassign
          tab.status = status
        }
      })
    }, 300)
  }

  onSortTabs = tabs => {
    this.setState({ tabs })
  }

  onSelectTab = id => {
    this._updateTabs(tab => {
      // eslint-disable-next-line no-param-reassign
      tab.active = tab.id === id
    })
  }

  onCloseTab = id => {
    const { tabs } = this.state

    // if only one tab left then don't close
    if (1 >= tabs.length) {
      return
    }

    this._filterTabs(tab => tab.id !== id)
  }

  onEditPermissions = id => {
    const { tabs } = this.state
    const tab = tabs.find(tab_ => tab_.id === id)

    if (tab) {
      const { showDappPermissionsModal } = this.props.actions

      showDappPermissionsModal(createDappId(tab))
    }
  }

  _updateTabs = cb => {
    const { tabs } = this.state

    tabs.forEach(cb)

    this.setState({
      tabs: [ ...tabs ]
    })
  }

  _filterTabs = cb => {
    const { tabs } = this.state

    const final = []
    let lastActiveTabIndex = -1

    Object.keys(tabs).forEach(index => {
      const tab = tabs[index]

      // if tab should remain
      if (cb(tab)) {
        final.push(tab)
      }
      // if tab was active then record its index
      else if (tab.active) {
        lastActiveTabIndex = index
      }
    })

    if (0 <= lastActiveTabIndex) {
      if (final.length <= lastActiveTabIndex) {
        // if last tab was closed then show new last tab as active
        final[final.length - 1].active = true
      } else {
        final[lastActiveTabIndex].active = true
      }
    }

    this.setState({
      tabs: [ ...final ]
    })
  }
}
