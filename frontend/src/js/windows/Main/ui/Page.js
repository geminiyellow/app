import React, { Component } from 'react'

import Dispatcher from '../data/dispatcher'

export default class Page extends Component {
  render () {
    return (
      <div>
        <h2>main page!</h2>
      </div>
    )
  }

  componentDidMount () {
    Dispatcher.init()
  }
}
