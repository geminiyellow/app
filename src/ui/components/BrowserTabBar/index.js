import _ from 'lodash'
import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import styles from './styles'
import TouchableView from '../TouchableView'


const Tab = SortableElement(({ label, active, index, onSelect }) => (
  <TouchableView
    style={[styles.tab, active ? styles.activeTab : null]}
    onPress={active ? null : onSelect}
  >
    <Text style={[styles.tabText, active ? styles.activeTabText : null]}>{label}</Text>
  </TouchableView>
))

const TabList = SortableContainer(({ tabs, onSelect }) => {
  const items = _.map(tabs, (tab, index) => (
    <Tab key={index} index={index} onSelect={() => onSelect(index)} {...tab} />
  ))
  return (
    <View style={styles.tabs}>{items}</View>
  )
})


export default class BrowserTabBar extends Component {
  render () {
    const { tabs } = this.props

    return (
      <View style={styles.container}>
        <TabList
          tabs={tabs}
          onSortEnd={this.onSortEnd}
          onSelect={this.onSelectTab}
          axis='x'
          lockAxis='x'
        />
      </View>
    )
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { onSort, tabs } = this.props

    onSort(arrayMove(tabs, oldIndex, newIndex))
  }

  onSelectTab = (id) => {
    const { onSelect } = this.props

    onSelect(id)
  }
}
