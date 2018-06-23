import React, { PureComponent } from 'react'
import { StackActions } from 'react-navigation'

import { connectStore } from '../helpers/redux'
import { getStore } from '../../redux'
import { addListener } from './reduxIntegration'
import createNavigator from './nav'

import Home from '../containers/pages/Home'
import Test from '../containers/pages/Test'
import GenerateMnemonic from '../containers/pages/GenerateMnemonic'
import LoginMnemonic from '../containers/pages/LoginMnemonic'
import ConfirmNewMnemonic from '../containers/pages/ConfirmNewMnemonic'
import SetupPin from '../containers/pages/SetupPin'
import EnterPinAfterLogin from '../containers/pages/EnterPinAfterLogin'
import AddressBook from '../containers/pages/AddressBook'
import Contracts from '../containers/pages/Contracts'
import Wallet from '../containers/pages/Wallet'
import Browser from '../containers/pages/Browser'
import Transactions from '../containers/pages/Transactions'
import UnitConverter from '../containers/pages/UnitConverter'

export const routes = {
  Home: { screen: Home },
  Test: { screen: Test },
  GenerateMnemonic: { screen: GenerateMnemonic },
  LoginMnemonic: { screen: LoginMnemonic },
  ConfirmNewMnemonic: { screen: ConfirmNewMnemonic },
  SetupPin: { screen: SetupPin },
  EnterPinAfterLogin: { screen: EnterPinAfterLogin },
  Wallet: { screen: Wallet },
  AddressBook: { screen: AddressBook },
  Contracts: { screen: Contracts },
  Browser: { screen: Browser },
  Transactions: { screen: Transactions },
  UnitConverter: { screen: UnitConverter }
}

// add route name to object
Object.keys(routes).forEach(r => {
  routes[r].routeName = r
})

const RootNavigator = createNavigator(routes)

export const { router } = RootNavigator
export const { onceAuthenticatedRouteName } = RootNavigator

@connectStore('nav')
export class Navigator extends PureComponent {
  render () {
    const { nav: state, dispatch } = this.props

    return (
      <RootNavigator
        navigation={{
          dispatch,
          state,
          addListener
        }}
      />
    )
  }
}

export const addRouteListener = (screenName, cb) => (
  addListener('action', ({ action: { type } }) => {
    if (StackActions.COMPLETE_TRANSITION === type) {
      const { routeName } = getStore().selectors.getCurrentRoute()

      if (routeName === screenName) {
        cb()
      }
    }
  })
)
