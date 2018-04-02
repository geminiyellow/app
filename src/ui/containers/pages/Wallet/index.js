import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { connectStore } from '../../../helpers/redux'
import { getAccounts } from '../../../../redux/account/selectors'
import { t } from '../../../../../common/strings'
import styles from './styles'
import Layout from '../Layout'
import TitleText from '../../../components/TitleText'
import ScrollView from '../../../components/ScrollView'
import WalletCard from '../../../components/WalletCard'
import Button from '../../../components/Button'


@connectStore('account', 'modals')
export default class Wallet extends CachePureComponent {
  state = {
    activeCard: 0
  }

  render () {
    const accounts = getAccounts(this.props)

    const accountAddresses = Object.keys(accounts)

    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.wallet')} />
        <ScrollView
          style={styles.cardsScrollView}
          contentContainerStyle={styles.cardsContent}
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={true}
        >
          {accountAddresses.map((address, index) => (
            this._renderCard(accounts, address, index)
          ))}
        </ScrollView>
      </Layout>
    )
  }

  _renderCard (accounts, address, index) {
    const { activeCard } = this.state

    const isActive = index === activeCard

    return (
      <Button
        type='walletCard'
        key={address}
        style={[ styles.cardButton, isActive ? styles.cardButtonActive : null ]}
        {...(isActive ? {
          stateOverride: { hovering: true }
        } : null)}
        onPress={this.bind(this._onSelectCard, index)}
      >
        <WalletCard
          style={isActive ? styles.cardActive : styles.cardInactive}
          account={{
            address,
            ...accounts[address]
          }}
          onPressSend={this.bind(this._onSend, address)}
          onPressReceive={this.bind(this._onReceive, address)}
        />
      </Button>
    )
  }

  _onSend = address => {
    console.log('TODO: send ', address)
  }

  _onReceive = address => {
    const { showAddressQrModal } = this.props.actions

    showAddressQrModal(address)
  }

  _onSelectCard = activeCard => this.setState({ activeCard })
}
