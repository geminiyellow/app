import API from '../../../common/constants/api'
import { createActionCreator } from '../utils'

import { GENERATE_ADDRESS, WEB3_REQUEST, SEND_TX, CANCEL_TX } from './actions'

export const web3Request = createActionCreator(WEB3_REQUEST, (request, permissions) => ({
  request, permissions
}))

export const generateAddress = createActionCreator(GENERATE_ADDRESS)

export const sendTransaction = createActionCreator(SEND_TX, tx => ({ tx }))

export const cancelTransaction = createActionCreator(CANCEL_TX)

exports[API.GENERATE_ADDRESS] = generateAddress
exports[API.LABEL_ADDRESS] = generateAddress
