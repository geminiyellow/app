import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import QrCode from '../../../components/QrCode'
import CopyableText from '../../../components/CopyableText'
import styles from './styles'

@connectStore('modals')
export default class EditAddress extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      address: PropTypes.string
    }).isRequired
  }

  render () {
    const { data: { address } } = this.props

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <CopyableText
          style={styles.address}
          textStyle={styles.addressText}
          text={address}
        />
        <QrCode
          input={address}
          size={150}
        />
      </Modal>
    )
  }

  close = () => {
    const { hideAddressQrModal } = this.props.actions

    hideAddressQrModal()
  }
}
