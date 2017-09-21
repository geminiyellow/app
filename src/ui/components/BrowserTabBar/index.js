import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { arrayMove } from 'react-sortable-hoc'

import styles from './styles'
import IconButton from '../IconButton'
import TabList from './TabList'

export default class BrowserTabBar extends PureComponent {
  render () {
    const { tabs, onSelect, onClose } = this.props

    return (
      <View style={styles.container}>
        <TabList
          tabs={tabs}
          onSortEnd={this.onSortEnd}
          onSelect={onSelect}
          onClose={onClose}
          axis="x"
          lockAxis="x"
        />
        <IconButton name="plus" onPress={this.onNewTab} />
      </View>
    )
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { onSort, tabs } = this.props

    onSort(arrayMove(tabs, oldIndex, newIndex))
  }

  onNewTab = () => {
    const { onNewTab } = this.props

    onNewTab('about:blank')
  }
}
