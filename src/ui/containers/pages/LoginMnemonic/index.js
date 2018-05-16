import React, { PureComponent } from 'react'
import { Text } from 'react-native'

import { onceLoggedInRouteName, routes } from '../../../nav'
import logger from '../../../../logger'
import { instanceOfError, UnableToConnectError } from '../../../../utils/errors'
import { t } from '../../../../../common/strings'
import { connectStore } from '../../../helpers/redux'
import styles from './styles'
import ErrorBox from '../../../components/ErrorBox'
import FormWrapper from '../../../components/FormWrapper'
import ProgressButton from '../../../components/ProgressButton'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import Layout from '../Layout'

const log = logger.create('LoginMnemonic')

@connectStore('nav')
export default class LoginMnemonic extends PureComponent {
  static navigationOptions = {
    title: t('title.login')
  }

  state = {
    mnemonic: 'fringe media suggest gesture intact raise aisle pupil exclude spatial hand lottery',
    // mnemonic: null,
    error: null,
    submitting: false
  }

  render () {
    const { error, submitting } = this.state

    return (
      <Layout contentStyle={styles.layoutContent}>
        <Text style={styles.introText}>{t('mnemonic.enterYourMnemonic')}</Text>
        <FormWrapper style={styles.formWrapper}>
          <TextInput
            onChange={this.onChange}
            value={this.state.mnemonic}
            placeholder={t('mnemonic.inputPlaceholderText')}
            onSubmitEditing={this.onSubmit}
          />
          {error ? <ErrorBox error={error} /> : null}
        </FormWrapper>
        <ProgressButton
          showInProgress={submitting}
          style={styles.nextButton}
          onPress={this.onSubmit}
          title={t('button.login')}
        />
        <Button
          textStyle={styles.createPasswordButtonText}
          onPress={this.onPressSignUp}
          title={t('linkButton.dontHavePasswordCreateOne')}
        />
      </Layout>
    )
  }

  onChange = mnemonic => {
    this.setState({
      mnemonic
    })
  }

  onPressSignUp = () => {
    const { navGo } = this.props.actions

    navGo(routes.GenerateMnemonic.routeName)
  }

  onSubmit = () => {
    const { navReset, loadWallet } = this.props.actions

    this.setState({
      error: null,
      submitting: true
    }, () => {
      // timeout to give the UI time to re-render
      setTimeout(() => {
        loadWallet(this.state.mnemonic)
          .then(() => navReset(onceLoggedInRouteName))
          .catch(error => {
            log.debug(error)

            if (!instanceOfError(error, UnableToConnectError)) {
              return this.setState({
                error,
                submitting: false
              })
            }

            return navReset(onceLoggedInRouteName)
          })
      }, 1)
    })
  }
}
