import React from 'react'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import MobileHeader from '../containers/liveComponents/MobileHeader'
import MobileDrawer from '../containers/liveComponents/MobileDrawer'


const disableGesturesProps = {
  gesturesEnabled: false,
  gestureResponseDistance: {
    horizontal: 0,
    vertical: 0
  }
}

export default routes => {
  const {
    Home,
    LoginMnemonic,
    GenerateMnemonic,
    ConfirmNewMnemonic,
    EnterPinAfterLogin,
    SetupPin,
    AddressBook,
    Contracts,
    Transactions,
    Wallet,
    Browser
  } = routes

  const LoggedOutStack = createStackNavigator({
    Home,
    LoginMnemonic,
    GenerateMnemonic,
    ConfirmNewMnemonic,
    EnterPinAfterLogin,
    SetupPin
  }, {
    ...disableGesturesProps,
    headerMode: 'none',
    mode: 'card',
    initialRouteName: Home.routeName
  })

  const LoggedInStack = createStackNavigator({
    LoggedInDrawer: createDrawerNavigator({
      Wallet,
      Browser,
      Contracts,
      Transactions,
      AddressBook
    }, {
      contentComponent: MobileDrawer,
      initialRouteName: Wallet.routeName
    })
  }, {
    headerMode: 'float',
    navigationOptions: () => ({
      header: props => <MobileHeader {...props} />
    })
  })

  return createStackNavigator({
    LoggedOutStack,
    LoggedInStack
  }, {
    ...disableGesturesProps,
    headerMode: 'none',
    initialRouteName: 'LoggedOutStack'
  })
}
