import { intToHex } from 'web3-utils'

import { SEND_RAW_TX, GENERATE_RAW_TX } from './actions'
import { getNetworkInfo } from '../node/selectors'
import { createAction } from '../utils'
import logger from '../../utils/log'

const log = logger.create('walletMiddleware')

// eslint-disable-next-line consistent-return
export default ({ nodeConnector, walletManager }) => store => next => async action => {
  switch (action.type) {
    case GENERATE_RAW_TX: {
      log.debug('Generate raw tx ...')

      const { from, to, value, data, gasLimit, gasPrice } = action.payload

      // chain id
      const chainId = getNetworkInfo(store.getState())
      log.debug(`chainId: ${chainId}`)

      // nonce
      const nonce = intToHex(
        await nodeConnector.rawCall('eth_getTransactionCount', [ from ])
      )
      log.debug(`nonce: ${nonce}`)

      return walletManager.wallet().sign({
        from, to, value, data, gasLimit, gasPrice, nonce, chainId
      })

      // return Promise.resolve('0xdeadbeef')
    }
    case SEND_RAW_TX: {
      const rawTx = action.payload

      const receipt =
        await nodeConnector.rawCall('eth_sendRawTransaction', [ rawTx ])

      await next(createAction(action.type, receipt))

      return Promise.resolve(receipt)
    }
    default: {
      return next(action)
    }
  }
}
