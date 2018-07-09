import { ETH, TRANSACTION_TYPE } from '../../../common/constants/protocol'
import { ethToWeiBigNum, gweiToWeiBigNum, toTokenRawBalanceBigNum, toHexStr } from '../../utils/number'
import { getStore } from '../'

const { CONTRACT_CALL, CONTRACT_CREATION, TOKEN_TRANSFER, ETH_TRANSFER } = TRANSACTION_TYPE

export default ({ nodeConnector }) => async tx => {
  const { selectors: { getTokenList } } = getStore()

  const { from, amount, gasLimit, gasPrice, unit, isContractCreation } = tx
  let { to, data } = tx
  let value
  const meta = { unit }

  // if contract creation
  if (isContractCreation) {
    meta.type = CONTRACT_CREATION

    value = toHexStr(0)
    to = null
  } else if (ETH === unit) {
    meta.type = data ? CONTRACT_CALL : ETH_TRANSFER

    value = toHexStr(ethToWeiBigNum(amount || '0'))
  } else {
    meta.type = TOKEN_TRANSFER
    meta.recipient = to
    meta.amount = amount

    const { decimals, contractAddress } = getTokenList()[unit]
    const contract = await nodeConnector.getTokenContractAt(contractAddress)
    const tokenRawAmountBigNum = toTokenRawBalanceBigNum(amount || 0, decimals)

    data = contract.contract.transfer.getData(to, toHexStr(tokenRawAmountBigNum))
    to = contractAddress
    value = toHexStr(0)
  }

  const ret = { from, value, meta }

  if (!isContractCreation) {
    ret.to = to
  }

  if (data) {
    ret.data = data
  }

  if (gasLimit) {
    ret.gasLimit = toHexStr(gasLimit)
  }

  if (gasPrice) {
    ret.gasPrice = toHexStr(gweiToWeiBigNum(gasPrice))
  }

  return ret
}
