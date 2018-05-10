import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import Form from 'react-native-advanced-forms'

import {
  getSupportedParamTypes,
  canRenderMethodParams,
  renderMethodParams,
  canRenderMethodOutputs,
  renderMethodOutputs,
  FIELD_TYPES
} from './ethereum-abi-ui'
import { t } from '../../../../../common/strings'
import { isAddress, prefixedWith0x, prefixWith0x } from '../../../../utils/string'
import { toNumberStr } from '../../../../utils/number'
import { getAbiFunctionNames, isAbiFunctionReadOnly, methodHasOutputs } from '../../../../utils/contracts'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import formStyles from '../../../styles/forms'
import Layout from '../Layout'
import TitleText from '../../../components/TitleText'
import AlertBox from '../../../components/AlertBox'
import FormWrapper from '../../../components/FormWrapper'
import ProgressButton from '../../../components/ProgressButton'
import Loading from '../../../components/Loading'
import Picker from '../../../components/Picker'
import TextInput from '../../../components/TextInput'
import Switch from '../../../components/Switch'
import ErrorBox from '../../../components/ErrorBox'
import AddressTextInput from '../../liveComponents/AddressTextInput'


@connectStore('account')
export default class AddressBook extends PureComponent {
  state = {
    address: '',
    abi: '',
    params: {},
    methodPickerOptions: null,
    selectedMethod: null,
    abiFunctions: null,
    error: null,
    results: null,
    submitting: false
  }

  render () {
    const { getAccounts } = this.props.selectors
    const accounts = getAccounts()
    const haveAccounts = !!(Object.keys(accounts).length)

    return (
      <Layout contentStyle={styles.layoutContent}>
        <TitleText text={t('title.contracts')} />
        {haveAccounts ? (
          this._renderContent()
        ) : (
          <Loading />
        )}
      </Layout>
    )
  }

  _renderContent () {
    const {
      error,
      address,
      abi,
      methodPickerOptions,
      selectedMethod
    } = this.state

    return (
      <FormWrapper style={styles.container}>
        <View style={styles.field}>
          <Text style={formStyles.labelText}>{t('contracts.field.addressLabel')}</Text>
          <AddressTextInput
            value={address}
            onChange={this._onAddressChange}
            style={styles.textInput}
            placeholder={t('contracts.field.addressPlaceholder')}
          />
        </View>
        <View style={styles.field}>
          <Text style={formStyles.labelText}>{t('contracts.field.abiLabel')}</Text>
          <TextInput
            value={abi}
            style={styles.textInput}
            placeholder={t('contracts.field.abiPlaceholder')}
            multiline={true}
            numberOfLines={5}
            onChange={this._onAbiChange}
          />
        </View>
        {methodPickerOptions ? (
          <View style={styles.methodContainer}>
            <View style={styles.field}>
              <Text style={formStyles.labelText}>{t('contracts.field.methodLabel')}</Text>
              <Picker
                style={styles.picker}
                button={{ style: styles.pickerButton }}
                options={methodPickerOptions}
                selected={selectedMethod}
                onChange={this._onSelectMethod}
              />
            </View>
            {this._renderParamsForm(abi, selectedMethod)}
          </View>
        ) : null}
        {this._renderResults()}
        <ErrorBox error={error} style={styles.errorBox} />
      </FormWrapper>
    )
  }

  _onAbiChange = abi => {
    this.setState({
      abi,
      results: null,
      error: null
    }, this._recalculateMethodPickerOptions)
  }

  _onAddressChange = value => {
    let address = value

    // lowercase the address
    if (address) {
      address = address.toLowerCase()
      // prefix with 0x if needed
      if (!prefixedWith0x(address)) {
        address = prefixWith0x(address)
      }
    }

    this.setState({
      address,
      results: null,
      error: null
    }, this._recalculateMethodPickerOptions)
  }

  _onSelectMethod = selectedMethod => {
    this.setState({
      selectedMethod,
      results: null,
      error: null
    })
  }

  _recalculateMethodPickerOptions = () => {
    const { abi, address } = this.state

    // if both set and valid
    if (abi && address && isAddress(address)) {
      // calculate method picker options
      let methodPickerOptions
      let selectedMethod

      const functions = getAbiFunctionNames(abi)
      if (functions) {
        methodPickerOptions = functions.map(f => ({
          value: f,
          label: f
        }))
        // select first option by default
        methodPickerOptions[0].selected = true
        selectedMethod = methodPickerOptions[0].value
      }

      this.setState({
        methodPickerOptions,
        selectedMethod,
        // reset params
        params: {}
      })
    }
  }


  _renderResults () {
    const { submitting, abi, selectedMethod, results } = this.state

    if (!results && !submitting) {
      return null
    }

    let content = null
    let resultsTitle = t('contracts.results')

    // if still executing
    if (submitting) {
      content = <Loading />
    }
    // if no outputs or was tx call
    else if (!results.length || !methodHasOutputs(abi, selectedMethod)) {
      resultsTitle = t('contracts.success')
    }
    // if can't render outputs
    else if (!canRenderMethodOutputs(abi, selectedMethod)) {
      content = (
        <AlertBox
          type='info'
          text={t('contracts.cannotRenderMethodOutputsDueToTypes')}
        />
      )
    }
    // render outputs!
    else {
      content = []

      renderMethodOutputs(
        abi,
        selectedMethod,
        results,
        this._buildRenderOutputMethod(content)
      )
    }

    return (
      <View style={styles.results}>
        <Text style={formStyles.labelText}>{resultsTitle}</Text>
        {content}
      </View>
    )
  }

  _renderParamsForm (abi, method) {
    const { submitting } = this.state

    const can = canRenderMethodParams(abi, method)

    let content

    if (!can) {
      content = (
        <AlertBox
          type='info'
          text={t('contracts.cannotCallMethodDueToParams', {
            types: getSupportedParamTypes().join(', ')
          })}
        />
      )
    } else {
      const uiContainer = []
      const helpers = {}

      renderMethodParams(
        abi,
        method,
        this._buildRenderFieldMethod(uiContainer, helpers)
      )

      content = uiContainer.length ? (
        <Form
          ref={this._onParamsFormRef}
          style={styles.paramsForm}
          onChange={this._buildParamsChangeHandler(helpers)}
          onSubmit={this._onPressSubmit}
          validate={this._buildParamsValidationHandler(helpers)}
          submitOnReturn={false}
        >
          {uiContainer}
        </Form>
      ) : (
        <AlertBox
          type='info'
          text={t('contracts.methodHasNoParams')}
        />
      )
    }

    const isReadOnlyMethod = isAbiFunctionReadOnly(abi, method)

    return (
      <View style={styles.paramsContainer}>
        {content}
        {can ? (
          <ProgressButton
            showInProgress={submitting}
            title={t(isReadOnlyMethod ? 'button.executeLocalContractCall' : 'button.executeTransactionContractCall')}
            onPress={this._onPressSubmit}
            style={styles.submitButton}
          />
        ) : null}
      </View>
    )
  }

  _onParamsFormRef = ref => {
    this.paramsForm = ref
  }

  _buildRenderOutputMethod = uiContainer => (name, index, fieldType, value) => {
    let finalValue

    switch (fieldType) {
      case FIELD_TYPES.NUMBER:
        finalValue = toNumberStr(value)
        break
      case FIELD_TYPES.BOOLEAN:
        finalValue = !!value
        break
      default:
        finalValue = value
    }

    uiContainer.push(
      <Text key={`output${index}`} style={styles.resultValueText}>{`${finalValue}`}</Text>
    )
  }

  _buildRenderFieldMethod = (uiContainer, helpers) =>
    (name, fieldType, { placeholder, isValid, sanitize }) => {
      const { params } = this.state

      let field

      switch (fieldType) {
        case FIELD_TYPES.NUMBER:
        case FIELD_TYPES.TEXT: {
          field = (
            <TextInput
              value={params[name]}
              style={styles.textInput}
              placeholder={placeholder}
            />
          )
          break
        }
        case FIELD_TYPES.BOOLEAN: {
          field = (
            <Switch
              turnedOn={params[name]}
              label={name}
              labelTextStyle={styles.switchLabelText}
            />
          )
          break
        }
        default:
          break
      }

      if (field) {
        // eslint-disable-next-line no-param-reassign
        helpers[name] = { isValid, sanitize }

        uiContainer.push(
          <Form.Field
            key={name}
            name={name}
            label={name}
            style={styles.field}
            labelStyle={formStyles.label}
            labelTextStyle={formStyles.labelText}
          >
            {field}
          </Form.Field>
        )
      }
    }

  _buildParamsChangeHandler = helpers => newValues => {
    const params = newValues

    Object.keys(params).forEach(key => {
      const { sanitize } = helpers[key]

      if (sanitize && params[key]) {
        params[key] = sanitize(params[key])
      }
    })

    this.setState({
      params,
      results: null,
      error: null
    })
  }

  _buildParamsValidationHandler = helpers => params => {
    const ret = {}

    Object.keys(params).forEach(key => {
      if (!params[key]) {
        ret[key] = Form.VALIDATION_RESULT.MISSING
      } else if (!helpers[key].isValid(params[key])) {
        ret[key] = Form.VALIDATION_RESULT.INCORRECT
      }
    })

    return ret
  }

  _onPressSubmit = () => {
    // validate form
    if (this.paramsForm && !this.paramsForm.validate()) {
      return
    }

    const { executeContractCall } = this.props.actions
    const { address, abi, selectedMethod: method, params } = this.state

    const localCall = isAbiFunctionReadOnly(abi, method)

    this.setState({
      submitting: true,
      results: null,
      error: null
    }, () => {
      executeContractCall({
        address,
        abi,
        method,
        params,
        localCall
      })
        .then(receipt => {
          let results = []
          if (localCall) {
            results = Array.isArray(receipt) ? receipt : [ receipt ]
          }

          this.setState({
            results,
            submitting: false
          })
        })
        .catch(error => {
          this.setState({
            error,
            submitting: false
          })
        })
    })
  }
}
