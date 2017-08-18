import React, { Component } from 'react'
import { Button, View, Text, TextInput } from 'react-native'

import { routes } from '../../nav'
import controller from '../../../redux/controller'
import { t } from '../../../../common/strings'
import { connectRedux } from '../../helpers/decorators'
import styles from './styles'
import ErrorBox from '../../components/ErrorBox'

@connectRedux()
export default class Page extends Component {
  state = {
    mnemonic: '',
    generateNewError: null,
    inputExistingError: null,
  }

  render () {
    return (
      <View style={styles.container}>
        {this.renderInputExisting()}
        <View style={styles.divider} />
        {this.renderGenerateNew()}
      </View>
    )
  }

  renderInputExisting = () => {
    const { mnemonic, inputExistingError } = this.state

    const errorBox = (!inputExistingError) ? null : (
      <ErrorBox error={inputExistingError} />
    )

    return (
      <View>
        <Text>{t('mnemonic.enterYourMnemonic')}</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={mnemonic}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoFocus={false}
          autoFocus={true}
          onChange={this.onChange}
          onSubmitEditing={this.onSubmit}
        />
        {errorBox}
      </View>
    )
  }

  renderGenerateNew = () => {
    const { generateNewError } = this.state

    const errorBox = (!generateNewError) ? null : (
      <ErrorBox error={generateNewError} />
    )

    return (
      <View>
        <Button onPress={this.onGenerate} title={t('button.generateNewMnemonic')} />
        {errorBox}
      </View>
    )
  }

  onChange = (e) => {
    this.setState({
      mnemonic: e.target.value
    })
  }

  onSubmit = () => {
    this.setState({
      inputExistingError: null,
    }, () => {
      controller.mnemonic.loginWith(this.state.mnemonic)
        .then(() => controller.nav.push(routes.Browser.path))
        .catch(inputExistingError => this.setState({ inputExistingError }))
    })
  }

  onGenerate = () => {
    this.setState({
      generateNewError: null,
    }, () => {
      controller.mnemonic.generateNew()
        .then(mnemonic => controller.nav.push(routes.ConfirmNewMnemonic.path, { mnemonic }))
        .catch(generateNewError => this.setState({ generateNewError }))
    })
  }
}
