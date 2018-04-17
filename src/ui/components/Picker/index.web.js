import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { CachePureComponent } from '../../helpers/components'
import TouchableView from '../TouchableView'
import { Popup } from '../Popup'
import PickerButton from '../PickerButton'
import styles from './styles'

export default class Picker extends CachePureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
      category: PropTypes.string
    })).isRequired,
    onChange: PropTypes.func,
    selected: PropTypes.string,
    renderOption: PropTypes.func,
    renderButtonLabel: PropTypes.func,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    button: PropTypes.shape({
      style: PropTypes.any,
      textStyle: PropTypes.any
    })
  }

  state = {
    open: false,
    popupStyle: {}
  }

  render () {
    const { open, popupStyle } = this.state

    const {
      options,
      selected,
      style,
      button,
      renderButtonLabel
    } = this.props

    const { label } = options.find(({ value }) => value === selected)

    return (
      <View style={[ styles.container, style ]} onLayout={this.onLayout}>
        <div ref={this._onButtonElementRef}>
          <PickerButton
            onPress={this.onPressButton}
            label={label}
            open={open}
            renderLabel={renderButtonLabel}
            {...button}
          />
        </div>
        {(!open) ? null : (
          <Popup style={popupStyle}>
            <View style={styles.optionsContainer}>
              {this.renderOptions({ options })}
            </View>
          </Popup>
        )}
      </View>
    )
  }

  renderOptions ({ options }) {
    const { renderOption, selected } = this.props

    return options.map(option => {
      const { label, value } = option

      return (
        <TouchableView
          key={value}
          style={styles.optionContainer}
          hoverStyle={styles.optionContainerHover}
          onPress={this.bind(this.onSelect, value)}>
            {renderOption ? renderOption(option, value === selected) : (
              <Text style={styles.optionText}>{label}</Text>
            )}
        </TouchableView>
      )
    })
  }

  onPressButton = () => {
    const open = !this.state.open

    // if going to open then reposition popup box near button
    if (open && this.btnDiv) {
      const { left, top, width, height } = this.btnDiv.getBoundingClientRect()

      this.setState({
        open,
        popupStyle: { left, top: top + height, width }
      })
    } else {
      this.setState({
        open
      })
    }
  }

  _onButtonElementRef = elem => {
    this.btnDiv = elem
  }

  focus () {
  }

  unfocus () {
  }

  getValue () {
    return this.props.selected
  }

  onSelect = value => {
    const { onChange } = this.props

    this.setState({
      open: false
    }, () => {
      onChange(value)
    })
  }
}
