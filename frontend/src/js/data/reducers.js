import Immutable from 'immutable'

import { Actions } from './actions'
import { Router } from '../ui/nav'

const InitialState = {
  nav: Router.getStateForAction(
    Router.getActionForPathAndParams('')
  ),
  config: Immutable.Map({
    nodes: {},
    isConnected: false,
  }),
}

export function nav (state = InitialState.nav, action) {
  const { type } = action

  let nextState

  switch (type) {
    case 'Navigation/RESET':
      const { pathName, params } = action
      nextState = Router.getStateForAction(
        Router.getActionForPathAndParams(pathName, params)
      )
      break
    case 'Navigation/NAVIGATE':
      nextState = Router.getStateForAction(action, state)
      break
  }

  return nextState || state
}


export function config (state = InitialState.config, { type, payload }) {
  switch (type) {
    case Actions.NODES:
      state = state.set('nodes', payload)
      break
    case Actions.NODE_CONNECTED:
      state = state.set('isConnected', payload)
      break
  }

  return state
}
