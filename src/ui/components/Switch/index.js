import React, { Component } from 'react'
import { View, Text, Switch } from 'react-native'

import createStyles from './styles'
import TouchableView from '../TouchableView'

export default class CustomSwitch extends Component {
  render () {
    const {
      label,
      turnedOn,
      style,
      switchStyle,
      labelTextStyle
    } = this.props

    const { styles, thumbColor, trackColor } = createStyles({ turnedOn })

    return (
      <View style={[ styles.container, style ]}>
        <Switch
          thumbColor={thumbColor}
          trackColor={trackColor}
          activeThumbColor={thumbColor}
          activeTrackColor={trackColor}
          tintColor={trackColor}
          onTintColor={trackColor}
          thumbTintColor={thumbColor}
          style={[ styles.switch, switchStyle ]}
          value={turnedOn}
          onValueChange={this.onPress}
        />
        {(!label) ? null : (
          <TouchableView onPress={this.onPress} style={styles.textContainer}>
            <Text style={[ styles.labelText, labelTextStyle ]}>{label}</Text>
          </TouchableView>
        )}
      </View>
    )
  }

  onPress = () => {
    const { onChange } = this.props

    onChange(!this.props.turnedOn)
  }

  getValue () {
    return this.props.turnedOn
  }
}
