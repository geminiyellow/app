import { all, call } from 'redux-saga/effects'

import Logger from '../logger'
import modals from './modals/sagas'
import node from './node/sagas'
import config from './config/sagas'
import account from './account/sagas'

export const createSagas = app => {
  const modalsSaga = modals(app)
  const nodeSaga = node(app)
  const configSaga = config(app)
  const accountSaga = account(app)

  return function* allSagas () {
    try {
      yield all([
        call(modalsSaga),
        call(nodeSaga),
        call(configSaga),
        call(accountSaga)
      ])
    } catch (err) {
      Logger.error(err.message)
      // keep going!
      yield allSagas()
    }
  }
}
