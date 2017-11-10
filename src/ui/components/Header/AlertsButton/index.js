import React from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'

import IconButton from '../../IconButton'
import styles from './styles'

const AlertsButton = ({ style, onPress, unseenAlertsCount }) => (
  <IconButton
    style={style}
    type='header'
    onPress={onPress}
    icon={{ name: 'bell-o' }}>
      {unseenAlertsCount ? (
        <Text style={styles.numbersText}>{unseenAlertsCount}</Text>
      ) : null}
  </IconButton>
)

AlertsButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  unseenAlertsCount: PropTypes.number,
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}

export default AlertsButton
