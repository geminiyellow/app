import _ from 'lodash'
import React from 'react'

import { CachePureComponent } from '../../../helpers/components'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import Layout from '../Layout'
import Table from '../../../components/Table'
import FormWrapper from '../../../components/FormWrapper'
import Button from '../../../components/Button'
import LabelledAddress from '../../../components/LabelledAddress'
import PageTitleText from '../../../components/PageTitleText'

const RENDER_HEADER = () => null

const COLUMNS = [ { id: 'address' } ]


@connectStore('nav', 'account')
export default class AddressBook extends CachePureComponent {
  static navigationOptions = {
    gesturesEnabled: false,
    drawerLabel: t('title.addressBook'),
    title: t('title.addressBook')
  }

  render () {
    const { getAddressBook } = this.props.selectors

    const book = getAddressBook()

    const rows = Object.keys(book).map(addr => ({
      address: {
        ...book[addr],
        value: addr
      },
      _filterKey: `${addr} ${book[addr].label || ''}`.toLowerCase()
    }))

    return (
      <Layout contentStyle={styles.layoutContent}>
        <PageTitleText text={t('title.addressBook')} />
        <Table
          style={styles.table}
          listStyle={styles.tableList}
          rowStyle={styles.tableRow}
          renderFilter={this._renderFilter}
          filterPlaceholderText={t('addressBook.filterPlaceholder')}
          showFilter={true}
          renderHeader={RENDER_HEADER}
          renderRowData={this._renderRowData}
          columns={COLUMNS}
          rows={[ ...rows, ...rows, ...rows, ...rows ]}
        />
      </Layout>
    )
  }

  _renderFilter = defaultRenderFunc => (
    <FormWrapper style={styles.tableFilter}>
      {defaultRenderFunc()}
    </FormWrapper>
  )

  _renderRowData = row => {
    const address = _.get(row, 'address.value')
    const label = _.get(row, 'address.label')

    return (
      <Button
        style={styles.tableRowData}
        type='tableRow'
        onPress={this.bind(this.onSelectEntry, address)}
        childShouldInheritTextStyle={true}
        childTextStylePropName='addressTextStyle'
      >
        <LabelledAddress address={address} label={label} />
      </Button>
    )
  }

  onSelectEntry = address => {
    const { showEditAddressModal } = this.props.actions

    showEditAddressModal(address)
  }
}
