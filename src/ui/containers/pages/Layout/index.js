import React, { PureComponent } from 'react'
import { View } from 'react-native'

import { t } from '../../../../../strings'
import { connectStore } from '../../../helpers/redux'
import Header from '../../../components/Header'
import { getAccounts } from '../../../../redux/wallet/selectors'
import { getNodeConnection } from '../../../../redux/node/selectors'
import { getUnseenAlertsCount } from '../../../../redux/log/selectors'
import styles from './styles'

@connectStore('wallet', 'node', 'log', 'modals')
export default class Layout extends PureComponent {
  render () {
    const { network } = getNodeConnection(this.props)
    const accounts = getAccounts(this.props)
    const unseenAlertsCount = getUnseenAlertsCount(this.props)
    const { children, contentStyle } = this.props

    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          network={network && Object.keys(network).length ? network : null}
          accounts={accounts}
          unseenAlertsCount={unseenAlertsCount}
          appName={t('appName')}
          onPressNetworkInfo={this.showConnectionInfo}
          onPressAlerts={this.showLog}
        />
        <View style={[ styles.content, contentStyle ]}>{children}</View>
      </View>
    )
  }

  showConnectionInfo = () => {
    this.props.actions.showConnectionModal()
  }

  showLog = () => {
    this.props.actions.showLog()
  }
}
