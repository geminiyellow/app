import { SEND_TX, TX_SEND_ERROR, TX_SENT } from './actions'
import { transactionSending } from './actionCreators'
import { SEND_TX_EVENT } from '../../utils/asyncEvents'
import { inProgress } from '../../utils/stateMachines'
import { SendTransactionError } from '../../utils/errors'
import { t } from '../../../common/strings'

// eslint-disable-next-line consistent-return
export default () => store => next => async action => {
  switch (action.type) {
    case SEND_TX: {
      const { wallet: { [SEND_TX_EVENT]: sendTxEvent } } = store.getStateObject()

      if (inProgress === sendTxEvent.getState()) {
        return Promise.reject(
          new SendTransactionError(t('error.transactionAlreadyInProgress'))
        )
      }

      const sendInfo = {
        tx: action.payload
      }

      const sendPromise = new Promise((resolve, reject) => {
        sendInfo.promise = { resolve, reject }
      })

      store.dispatch(transactionSending(sendInfo))

      return sendPromise
    }
    case TX_SENT: {
      const { wallet: { currentTransactionPromise: promise } } = store.getStateObject()

      if (promise) {
        promise.resolve(action.payload)
      }

      return next(action)
    }
    case TX_SEND_ERROR: {
      const { wallet: { currentTransactionPromise: promise } } = store.getStateObject()

      if (promise) {
        promise.reject(action.payload)
      }

      return next(action)
    }
    default: {
      return next(action)
    }
  }
}
