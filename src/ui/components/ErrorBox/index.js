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
    renderedError = String(error)
  }

  if (couldBeMethodCallError && _.get(error, 'method')) {
    const { method, details } = error

    renderedError = (
      <View>
        <Text style={styles.errorText}>
          {t('error.methodCall', { method })}
        </Text>
        {(!details) ? null : (
          <Text style={styles.errorText}>
            {JSON.stringify(details, null, 2)}
          </Text>
        )}
      </View>
    )
  } else {
    renderedError = (
      <Text style={styles.errorText}>{renderedError}</Text>
    )
  }

  return renderedError
}

const ErrorBox = ({ error, style }) => {
  const errors = [].concat(error).map(renderError)

  return <AlertBox type="error" style={style}>{errors}</AlertBox>
}

ErrorBox.propTypes = {
  error: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
}

export default ErrorBox
