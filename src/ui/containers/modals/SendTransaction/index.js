import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

import { connectStore, mutable } from '../../../helpers/redux'
import { t } from '../../../../../common/strings'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import ErrorBox from '../../../components/ErrorBox'
import styles from './styles'

@connectStore('wallet')
export default class SendTransaction extends PureComponent {
  state = {
    error: null,
    rawTx: null,
    gasPrice: 1,
    gasLimit: null
  }

  render () {
    const {
      wallet: {
        currentTransaction: {
          from, to, value, gas, data
        }
      }
    } = mutable(this.props)

    const { error, rawTx, receipt } = this.state

    const { gasLimit, gasPrice } = this._gas()

    return (
      <Modal onOverlayPress={this.dismissModal}>
        <View style={styles.container}>
          <Text>{from}</Text>
          <Text>{to}</Text>
          <Text>{value}</Text>
          <Text>{gasLimit || gas}</Text>
          <Text>{gasPrice}</Text>
          <Text>{data}</Text>
          {receipt ? this.renderReceipt(receipt) : this.renderActions(rawTx)}
          {(!error) ? null : (
            <ErrorBox error={error} />
          )}
        </View>
      </Modal>
    )
  }

  renderReceipt (receipt) {
    return (
      <Text>Receipt: {receipt}</Text>
    )
  }

  renderActions (rawTx) {
    return rawTx ? (
      <View>
        <Text>{rawTx}</Text>
        <Button title={t('button.confirmAndSendTransaction')} onPress={this.confirmAndSend} />
      </View>
    ) : (
      <Button title={t('button.generateRawTransaction')} onPress={this.generateRaw} />
    )
  }

  confirmAndSend = () => {
    const { rawTx } = this.state

    this.setState({
      error: null
    }, () => {
      this.props.actions.sendRawTransaction(rawTx)
        .then(receipt => {
          this.setState({
            receipt
          })
        })
        .catch(error => {
          this.setState({ error })
        })
    })
  }

  generateRaw = () => {
    const {
      wallet: {
        currentTransaction: {
          from, to, value, data
        }
      }
    } = mutable(this.props)

    const { gasLimit, gasPrice } = this._gas()

    this.setState({
      rawTx: null,
      error: null
    }, () => {
      this.props.actions.generateRawTransaction({
        from, to, value, gasLimit, data, gasPrice
      })
        .then(rawTx => {
          this.setState({
            rawTx
          })
        })
        .catch(error => {
          this.setState({ error })
        })
    })
  }

  dismissModal = () => {
    const { receipt } = this.state

    // only cancel tx if not already succeeded
    if (!receipt) {
      this.props.actions.cancelTransaction(t('error.userCancelledTransaction'))
    }
  }

  _gas () {
    return {
      gasLimit: this.state.gasLimit || this.props.wallet.currentTransaction.gas,
      gasPrice: this.state.gasPrice
    }
  }
}
