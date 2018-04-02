import { createActionCreator } from '../utils'

import { SHOW, HIDE } from './actions'
import {
  CONNECT_NODE,
  SEND_TRANSACTION,
  ALERT,
  LOG,
  DAPP_PERMISSIONS,
  EDIT_ADDRESS,
  ADDRESS_QR
} from '../../../common/constants/modals'

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

export const showLog = createActionCreator(SHOW, () => ({
  type: LOG
}))
export const hideLog = createActionCreator(HIDE, () => ({
  type: LOG
}))

export const showConnectionModal = createActionCreator(SHOW, () => ({
  type: CONNECT_NODE
}))
export const hideConnectionModal = createActionCreator(HIDE, () => ({
  type: CONNECT_NODE
}))

export const showDappPermissionsModal = createActionCreator(SHOW, dappId => ({
  type: DAPP_PERMISSIONS,
  data: { dappId }
}))
export const hideDappPermissionsModal = createActionCreator(HIDE, () => ({
  type: DAPP_PERMISSIONS
}))

export const showSendTransactionModal = createActionCreator(
  SHOW,
  () => ({ type: SEND_TRANSACTION })
)
export const hideSendTransactionModal = createActionCreator(
  HIDE,
  () => ({ type: SEND_TRANSACTION })
)

export const showEditAddressModal = createActionCreator(SHOW, address => ({
  type: EDIT_ADDRESS,
  data: { address }
}))
export const hideEditAddressModal = createActionCreator(
  HIDE,
  () => ({ type: EDIT_ADDRESS })
)

export const showAddressQrModal = createActionCreator(SHOW, address => ({
  type: ADDRESS_QR,
  data: { address }
}))
export const hideAddressQrModal = createActionCreator(
  HIDE,
  () => ({ type: ADDRESS_QR })
)
