import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { t } from '../../../../common/strings'
import {
  instanceOfError,
  UnableToConnectError,
  RequestTimeoutError
} from '../../../utils/errors'
import AlertBox from '../AlertBox'
import styles from './styles'


const renderError = error => {
  if (!error) {
    return null
  }

  let couldBeMethodCallError = false
  let renderedError

  if (instanceOfError(error, UnableToConnectError)) {
    renderedError = t('error.unableToConnect')
  } else if (instanceOfError(error, RequestTimeoutError)) {
    renderedError = t('error.requestTimeout')
  } else {
    couldBeMethodCallError = true
    renderedError = error.message || String(error)
  }

  const key = String(error)

  if (couldBeMethodCallError && _.get(error, 'method')) {
    const { method } = error

    renderedError = (
      <View key={key}>
        <Text style={styles.errorText}>
          {t('error.methodCall', { method })}
        </Text>
        <Text style={styles.errorText}>{renderedError}</Text>
      </View>
    )
  } else {
    renderedError = (
      <Text key={key} style={styles.errorText}>{renderedError}</Text>
    )
  }

  return renderedError
}

const ErrorBox = ({ error, style, shouldAnimate }) => {
  const errors = [].concat(error).map(renderError)

  const validErrors = errors.filter(e => !!e)

  if (!validErrors.length) {
    return null
  }

  return (
    <AlertBox
      animate={shouldAnimate ? {
        finalMaxHeight: 3000,
        duration: 1500
      } : null}
      type="error"
      style={style}
    >
      {validErrors}
    </AlertBox>
  )
}

ErrorBox.propTypes = {
  shouldAnimate: PropTypes.bool,
  error: PropTypes.any,
  style: PropTypes.any
}

ErrorBox.defaultProps = {
  shouldAnimate: true
}

export default ErrorBox
