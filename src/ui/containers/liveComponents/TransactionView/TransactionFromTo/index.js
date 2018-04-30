import React from 'react'
import { View, Text } from 'react-native'

import { t } from '../../../../../../common/strings'
import styles from './styles'
import Icon from '../../../../components/Icon'


const TransactionFromTo = ({ tx, style }) => {
  const { params: { from, to } } = tx

  return (
    <View style={[ styles.container ].concat(style)}>
      <Text style={styles.text}>{from}</Text>
      <Icon name='long-arrow-right' style={styles.text} />
      <Text style={styles.text}>{to || t('')}</Text>
    </View>
  )
}

export default TransactionFromTo
