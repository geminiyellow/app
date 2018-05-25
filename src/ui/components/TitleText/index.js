import React from 'react'
import { Text } from 'react-native'

import styles from './styles'

const TitleText = ({ text, style }) => (
  <Text style={[ styles.text, style ]}>{text.toUpperCase()}</Text>
)

export default TitleText
