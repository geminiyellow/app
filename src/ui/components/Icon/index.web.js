import React, { Component } from 'react'
import FAIcon from 'react-native-vector-icons/dist/FontAwesome'

import { addWebFont } from '../../styles'

import faFontUrl from 'react-native-vector-icons/Fonts/FontAwesome.ttf'
addWebFont('FontAwesome', faFontUrl)


export default class Icon extends Component {
  render () {
    return (
      <FAIcon {...this.props} />
    )
  }
}
