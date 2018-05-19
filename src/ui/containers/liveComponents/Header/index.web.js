import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { connectStore } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Button from '../../../components/Button'
import Loading from '../../../components/Loading'
import AlertsButton from './AlertsButton'
import IconButton from '../../../components/IconButton'
import { routes } from '../../../nav'
import styles from './styles'
import { getTotalAccountsBalanceAsStr } from '../../../../utils/number'

@connectStore('account', 'node', 'log', 'modals', 'nav')
export default class Header extends PureComponent {
  static propTypes = {
    style: PropTypes.any
  }

  render () {
    const {
      getNodeConnection,
      getNodeState,
      getAccounts,
      getUnseenAlertsCount,
      getCurrentNavState
    } = this.props.selectors

    const { network } = getNodeConnection()
    if (network) {
      network.node = getNodeState()
    }

    const addresses = getAccounts()
    const unseenAlertsCount = getUnseenAlertsCount()
    const navState = getCurrentNavState()

    const { style } = this.props

    const ALL_INITIALIZED = network && addresses

    return (
      <View style={[ styles.container, style ]}>
        <View style={styles.left}>
          {ALL_INITIALIZED ? (
            <React.Fragment>
              {this.renderBalance(navState, addresses)}
              {/*
                <IconButton
                  type='text'
                  tooltip={t('button.dappBrowser')}
                  icon={{ name: 'globe', style: styles.buttonIcon }}
                  style={styles.button}
                  onPress={this.showBrowser}
                  stateOverride={this._getButtonStateOverride(navState, routes.Browser)}
                />
              */}
              <IconButton
                type='text'
                tooltip={t('button.contracts')}
                icon={{ name: 'code', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showContracts}
                stateOverride={this._getButtonStateOverride(navState, routes.Contracts)}
              />
              <IconButton
                type='text'
                tooltip={t('button.transactionHistory')}
                icon={{ name: 'md-swap', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showTransactions}
                stateOverride={this._getButtonStateOverride(navState, routes.Transactions)}
              />
              <IconButton
                type='text'
                tooltip={t('button.addressBook')}
                icon={{ name: 'address-book-o', style: styles.buttonIcon }}
                style={styles.button}
                onPress={this.showAddressBook}
                stateOverride={this._getButtonStateOverride(navState, routes.AddressBook)}
              />
            </React.Fragment>
          ) : null}
        </View>
        <View style={styles.right}>
          {network ? this.renderNetwork(network) : null}
          {this.renderAlerts(unseenAlertsCount)}
        </View>
      </View>
    )
  }

  renderBalance (navState, addresses) {
    return (
      <Button
        tooltip={t('button.wallet')}
        style={styles.button}
        type='text'
        title={getTotalAccountsBalanceAsStr(addresses)}
        stateOverride={this._getButtonStateOverride(navState, routes.Wallet)}
        onPress={this.showWallet}
      />
    )
  }

  renderNetwork (network) {
    const syncing = !!_.get(network, 'node.syncing')
    const syncIcon = syncing ? (
      <Loading style={styles.networkButtonLoadingSpinner} />
    ) : null

    return (
      <Button
        onPress={this.showConnectionInfo}
        style={styles.networkButton}
        type='text'
        childShouldInheritTextStyle={true}
      >
        <Text style={styles.networkButtonText}>{network.description}</Text>
        {syncIcon}
      </Button>
    )
  }

  renderAlerts (unseenAlertsCount) {
    return (
      <View style={styles.alert}>
        <AlertsButton
          style={styles.button}
          unseenAlertsCount={unseenAlertsCount}
          onPress={this.showLog}
        />
      </View>
    )
  }

  _getButtonStateOverride (navState, route) {
    return (navState.routeName === route.routeName) ? {
      buttonState: 'active'
    } : null
  }

  showConnectionInfo = () => {
    this.props.actions.showConnectionModal()
  }

  showLog = () => {
    this.props.actions.showLog()
  }

  showWallet = () => {
    const { navGo } = this.props.actions

    navGo(routes.Wallet.routeName)
  }

  showAddressBook = () => {
    const { navGo } = this.props.actions

    navGo(routes.AddressBook.routeName)
  }

  showBrowser = () => {
    const { navGo } = this.props.actions

    navGo(routes.Browser.routeName)
  }

  showTransactions = () => {
    const { navGo } = this.props.actions

    navGo(routes.Transactions.routeName)
  }

  showContracts = () => {
    const { navGo } = this.props.actions

    navGo(routes.Contracts.routeName)
  }
}
