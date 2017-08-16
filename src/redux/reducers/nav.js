import { Router } from '../../ui/nav'


const InitialState = Router.getStateForAction(
  Router.getActionForPathAndParams('')
)


export default function (state = InitialState, action) {
  const { type } = action

  let nextState

  switch (type) {
    // TODO: replace strings with react-navigation constant references
    case 'Navigation/RESET':
      const { pathName, params } = action
      nextState = Router.getStateForAction(
        Router.getActionForPathAndParams(pathName, params)
      )
      break
    // TODO: replace strings with react-navigation constant references
    case 'Navigation/NAVIGATE':
      nextState = Router.getStateForAction(action, state)
      break
  }

  return nextState || state
}
