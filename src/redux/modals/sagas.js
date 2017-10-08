import { all, call, put, takeLatest } from 'redux-saga/effects'

import { INIT } from '../config/actions'
import { TX_SENDING } from '../wallet/actions'
import { showConnectionModal, showSendTransactionModal } from './actionCreators'

function* onInit () {
  yield put(showConnectionModal())
}

function* onSendTransaction () {
  yield put(showSendTransactionModal())
}

export default function* saga () {
  yield all([
    call(takeLatest, INIT, onInit),
    call(takeLatest, TX_SENDING, onSendTransaction)
  ])
}

export const _privateFunctions = {
  onInit,
  onSendTransaction
}
