import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

import { SHOW, HIDE } from './actions'
import MODALS from '../../utils/modals'

export default () => {
  const InitialState = Immutable.Map(
    Object.keys(MODALS).reduce(
      (m, k) => ({
        ...m,
        [MODALS[k]]: undefined
      }),
      {}
    )
  )

  return handleActions(
    {
      [SHOW]: (state, { payload: { type } }) => state.set(type, true),
      [HIDE]: (state, { payload: { type } }) => state.set(type, false)
    },
    InitialState
  )
}
