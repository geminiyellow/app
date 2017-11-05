import { createActionCreator } from '../utils'

import { SHOW, HIDE } from './actions'
import { CONNECT_NODE, SEND_TRANSACTION, ALERT } from '../../utils/modals'

export const showAlert = createActionCreator(SHOW, msg => ({
  type: ALERT,
  data: {
    type: 'info',
    msg
  }
}))

export const showErrorAlert = createActionCreator(SHOW, msg => ({
  type: ALERT,
  data: {
    type: 'error',
    msg
  }
}))

export const hideAlert = createActionCreator(HIDE, () => ({ type: ALERT }))

export const showConnectionModal = createActionCreator(SHOW, () => ({
  type: CONNECT_NODE
}))
export const hideConnectionModal = createActionCreator(HIDE, () => ({
  type: CONNECT_NODE
}))

export const showSendTransactionModal = createActionCreator(
  SHOW,
  () => ({ type: SEND_TRANSACTION })
)
export const hideSendTransactionModal = createActionCreator(
  HIDE,
  () => ({ type: SEND_TRANSACTION })
)