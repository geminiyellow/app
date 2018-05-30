import { createActionCreator } from '../utils'

import { SHOW, HIDE } from './actions'
import {
  CONNECT_NODE,
  SEND_TRANSACTION,
  ALERT,
  LOG,
  DAPP_PERMISSIONS,
  EDIT_ADDRESS,
  EDIT_BOOKMARK,
  ADDRESS_QR,
  EDIT_TOKEN,
  ADD_ACCOUNT
} from '../../../common/constants/modals'


const modalActionCreator = (action, type, payloadFn) => (
  createActionCreator(action, (...args) => ({
    type,
    ...(payloadFn ? { data: payloadFn(...args) } : {})
  }))
)


export const showAlert = modalActionCreator(SHOW, ALERT, msg => ({
  type: 'info',
  msg
}))

export const showErrorAlert = modalActionCreator(SHOW, ALERT, msg => ({
  type: 'error',
  msg
}))

export const hideAlert = modalActionCreator(HIDE, ALERT)

export const showLog = modalActionCreator(SHOW, LOG)
export const hideLog = modalActionCreator(HIDE, LOG)

export const showConnectionModal = modalActionCreator(SHOW, CONNECT_NODE)
export const hideConnectionModal = modalActionCreator(HIDE, CONNECT_NODE)

export const showDappPermissionsModal = modalActionCreator(SHOW, DAPP_PERMISSIONS, dappId => ({
  dappId
}))
export const hideDappPermissionsModal = modalActionCreator(HIDE, DAPP_PERMISSIONS)

export const showSendTransactionModal = modalActionCreator(SHOW, SEND_TRANSACTION)
export const hideSendTransactionModal = modalActionCreator(HIDE, SEND_TRANSACTION)

export const showEditAddressModal = modalActionCreator(SHOW, EDIT_ADDRESS, (address, type) => ({
  address, type
}))
export const hideEditAddressModal = modalActionCreator(HIDE, EDIT_ADDRESS)

export const showEditBookmarkModal = modalActionCreator(SHOW, EDIT_BOOKMARK, (url, label) => ({
  url, label
}))
export const hideEditBookmarkModal = modalActionCreator(HIDE, EDIT_BOOKMARK)

export const showAddressQrModal = modalActionCreator(SHOW, ADDRESS_QR, address => ({
  address
}))
export const hideAddressQrModal = modalActionCreator(HIDE, ADDRESS_QR)

export const showEditTokenModal = modalActionCreator(SHOW, EDIT_TOKEN, symbol => ({
  symbol
}))
export const hideEditTokenModal = modalActionCreator(HIDE, EDIT_TOKEN)

export const showAddAccountModal = modalActionCreator(SHOW, ADD_ACCOUNT)
export const hideAddAccountModal = modalActionCreator(HIDE, ADD_ACCOUNT)
