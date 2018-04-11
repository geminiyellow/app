import _ from 'lodash'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Form from 'react-native-advanced-forms'
import { isAddress } from 'web3-utils'

import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import Modal from '../../../components/Modal'
import ErrorBox from '../../../components/ErrorBox'
import TextInput from '../../../components/TextInput'
import IconText from '../../../components/IconText'
import ProgressButton from '../../../components/ProgressButton'
import Button from '../../../components/Button'
import TitleText from '../../../components/TitleText'
import AskUserConfirmModal from '../../../components/AskUserConfirmModal'
import styles from './styles'
import formStyles from '../../../styles/forms'

@connectStore('modals', 'account', 'node')
export default class EditToken extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      symbol: PropTypes.string
    }).isRequired
  }

  constructor (props, ctx) {
    super(props, ctx)

    const { data: { symbol } } = this.props

    const { getCustomTokens } = this.props.selectors

    const token = _.get(getCustomTokens(), symbol, {})

    this.state = {
      ...token,
      submitting: false,
      error: null
    }
  }

  render () {
    const { data: { symbol: updatingToken } } = this.props

    const { getNodeConnection } = this.props.selectors

    const network = _.get(getNodeConnection(), 'network.description')

    const { submitting, name, symbol, decimals, contractAddress } = this.state

    return (
      <Modal
        contentStyle={styles.content}
        onPressCloseButton={this.close}
      >
        <TitleText style={styles.titleText} text={t('title.addToken')} />
        {this._renderMeta({ network })}
        <Form
          style={styles.form}
          ref={this._onFormRef}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          validate={this.validate}
        >
          <Form.Field
            name='name'
            label={t('modal.editToken.nameFieldLabel')}
            style={styles.field}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              onChange={this._onLabelChange}
              value={name}
              style={styles.labelInput}
              placeholder={t('modal.editToken.nameInputPlaceholder')}
            />
          </Form.Field>
          <Form.Field
            name='symbol'
            label={t('modal.editToken.symbolFieldLabel')}
            style={styles.field}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              onChange={this._onLabelChange}
              value={symbol}
              style={styles.labelInput}
              placeholder={t('modal.editToken.symbolInputPlaceholder')}
            />
          </Form.Field>
          <Form.Field
            name='decimals'
            label={t('modal.editToken.decimalsFieldLabel')}
            style={styles.field}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              onChange={this._onLabelChange}
              value={decimals}
              style={styles.labelInput}
              placeholder={t('modal.editToken.decimalsInputPlaceholder')}
            />
          </Form.Field>
          <Form.Field
            name='contractAddress'
            label={t('modal.editToken.addressFieldLabel')}
            style={styles.field}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            <TextInput
              onChange={this._onLabelChange}
              value={contractAddress}
              style={styles.labelInput}
              placeholder={t('modal.editToken.addressInputPlaceholder')}
            />
          </Form.Field>
        </Form>
        <View style={styles.buttons}>
          <ProgressButton
            style={styles.button}
            showInProgress={submitting}
            onPress={this.submit}
            title={t('button.save')}
          />
          {updatingToken ? (
            <Button
              style={styles.button}
              onPress={this.delete}
              title={t('button.delete')}
            />
          ) : null}
        </View>
        {this._renderError()}
        <AskUserConfirmModal
          ref={this._onConfirmDeleteModalRef}
          question={t('modal.editAddress.areYouSureYouWantToDelete')}
          yesButtonText={t('button.yes')}
          noButtonText={t('button.no')}
          onPressYes={this.onDelete}
        />
      </Modal>
    )
  }

  _onConfirmDeleteModalRef = d => {
    this.confirmDeleteModal = d
  }

  _onFormRef = f => {
    this.form = f
  }

  _renderMeta ({ network }) {
    if (network) {
      return null
    }

    return (
      <View style={styles.meta}>
        {network ? (
          <IconText
            style={styles.metaIcon}
            textStyle={styles.metaIconText}
            icon={{ name: 'plug', style: styles.metaIconText }}
            text={network}
          />
        ) : null}
      </View>
    )
  }

  _renderError () {
    const { error } = this.state

    return (!error) ? null : (
      <ErrorBox style={styles.errorBox} error={error} />
    )
  }

  onChange = values => {
    this.setState({
      ...values,
      error: null
    })
  }

  onSubmit = () => {
    const { data: { symbol: updatingSymbol } } = this.props

    if (updatingSymbol) {
      this.submitUpdateToken()
    }

    this.submitAddToken()
  }

  submitUpdateToken () {
    const { data: { symbol: updatingSymbol } } = this.props
    const { updateCustomToken } = this.props.actions
    const { name, symbol, decimals, contractAddress } = this.state

    this.setState({
      submitting: true,
      error: null
    }, () => {
      updateCustomToken(updatingSymbol, { name, symbol, decimals, contractAddress })
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  submitAddToken () {
    const { addCustomToken } = this.props.actions
    const { name, symbol, decimals, contractAddress } = this.state

    this.setState({
      submitting: true,
      error: null
    }, () => {
      addCustomToken(symbol, { name, symbol, decimals, contractAddress })
        .then(() => this.close())
        .catch(error => {
          this.setState({
            submitting: false,
            error
          })
        })
    })
  }

  validate = (values = {}) => {
    const ret = {}

    if (!values.symbol) {
      ret.symbol = Form.VALIDATION_RESULT.MISSING
    }

    if (!values.decimals) {
      ret.decimals = Form.VALIDATION_RESULT.MISSING
    } else {
      const decInt = parseInt(values.decimals, 10)

      if (Number.isNaN(decInt) || `${decInt}` !== values.decimals) {
        ret.decimals = Form.VALIDATION_RESULT.INCORRECT
      }
    }

    if (!values.contractAddress) {
      ret.contractAddress = Form.VALIDATION_RESULT.MISSING
    } else if (!isAddress(values.contractAddress)) {
      ret.contractAddress = Form.VALIDATION_RESULT.INCORRECT
    }

    return ret
  }

  submit = () => {
    if (this.form) {
      this.form.validateAndSubmit()
    }
  }

  delete = () => {
    if (this.confirmDeleteModal) {
      this.confirmDeleteModal.show()
    }
  }

  onDelete = () => {
  }

  close = () => {
    const { hideEditTokenModal } = this.props.actions

    hideEditTokenModal()
  }
}
