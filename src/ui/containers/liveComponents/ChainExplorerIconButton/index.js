import React from 'react'
import PropTypes from 'prop-types'

import { connectStore } from '../../../helpers/redux'
import { CachePureComponent } from '../../../helpers/components'
import { t, tSub } from '../../../../../common/strings'
import IconButton from '../../../components/IconButton'
import styles from './styles'


@connectStore('node')
export default class ChainExplorerIconButton extends CachePureComponent {
  static propTypes = {
    linkType: PropTypes.oneOf([ 'block', 'transaction', 'address' ]).isRequired,
    blockHash: PropTypes.string,
    address: PropTypes.string,
    txHash: PropTypes.string,
    style: PropTypes.any,
    textStyle: PropTypes.any
  }

  render () {
    const { style, textStyle, linkType, blockHash, txHash, address } = this.props
    const { getNodeConnection } = this.props.selectors
    const { network: { blockUrl, txUrl, addressUrl } } = getNodeConnection()

    let url

    switch (linkType) {
      case 'block': {
        if (blockUrl && blockHash) {
          url = tSub(blockUrl, { blockHash })
        }
        break
      }
      case 'address': {
        if (addressUrl && address) {
          url = tSub(addressUrl, { address })
        }
        break
      }
      case 'transaction': {
        if (txUrl && txHash) {
          url = tSub(txUrl, { txHash })
        }
        break
      }
      default:
        break
    }

    return url ? (
      <IconButton
        style={[ styles.button ].concat(style)}
        icon={{ name: 'md-link', style: [ styles.text ].concat(textStyle) }}
        onPress={this.bind(this._onPress, url)}
        tooltip={t('button.viewInChainExplorer')}
      />
    ) : null
  }

  _onPress = url => {
    const { openExternalUrl } = this.props.actions

    openExternalUrl(url)
  }
}
