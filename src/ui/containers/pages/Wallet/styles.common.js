import { perWidth } from '../../../styles'

module.exports = {
  // $outline: 1,

  layoutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  topLevelLoading: {
    flex: 1,
    alignSelf: 'center'
  },
  tokenTableLoading: {

  },
  pageTitleText: {
    margin: 10
  },

  /* cards */

  cards: {
    width: '100%',
    marginTop: perWidth(10, 0)
  },
  addAccountAlertBox: {
    marginTop: 10,
    alignSelf: 'center'
  },

  /* tokens */

  tokenTable: {
    marginTop: 10,
    width: '100%',
    alignItems: 'stretch',
    paddingBottom: 10
  }
}
