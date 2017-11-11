import { all, call } from 'redux-saga/effects'

import api from './api/sagas'
import modals from './modals/sagas'
import node from './node/sagas'
import config from './config/sagas'
import wallet from './wallet/sagas'

export const createSagas = app => {
  const apiSaga = api(app)
  const modalsSaga = modals(app)
  const nodeSaga = node(app)
  const configSaga = config(app)
  const walletSaga = wallet(app)

  return function* allSagas () {
    yield all([
      call(apiSaga),
      call(modalsSaga),
      call(nodeSaga),
      call(configSaga),
      call(walletSaga)
    ])
  }
}
