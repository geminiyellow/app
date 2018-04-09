import { create, fontMaker } from '../../../styles'

const card = {
  width: 250,
  minHeight: 250
}

const text = {
  ...fontMaker(),
  color: '$content_textColor',
  fontSize: '1rem'
}

export default create({
  // $outline: 1,

  layoutContent: {
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 0,
    height: '95%'
  },
  topLevelLoading: {
    alignSelf: 'center'
  },

  /* account cards */

  cardsScrollView: {
    flex: 0,
    width: '100%',
    marginTop: 10
  },
  cardsContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },

  /* card */

  walletCardButton_active: {
    borderWidth: 1,
    borderRadius: 0,
    borderBottomWidth: 0
  },
  walletCardButton_inactive: {
    borderWidth: 1,
    borderRadius: 0,
    borderBottomColor: '$button_walletCard_enabled_hover_borderColor'
  },
  card: { ...card },

  /* tab bar */

  tabBar: {
    marginTop: 50
  },

  /* tokens */

  tokenTable: {
    flex: 1,
    marginTop: 10,
    paddingBottom: 20,
    width: '100%'
  },
  tokenTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  tokenTableFilter: {
    fontSize: '0.7rem',
    paddingVertical: 7,
    marginBottom: 5
  },
  tokenRowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tokenSymbolText: {
    ...text,
    fontSize: '0.8rem',
    color: '$wallet_tokens_symbol_textColor'
  },
  tokenNameText: {
    ...text,
    fontSize: '0.65rem',
    color: '$wallet_tokens_name_textColor',
    marginLeft: 5
  },
  tokenRowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tokenBalanceText: {
    ...text,
    fontSize: '0.8rem',
    color: '$wallet_tokens_balance_textColor',
    marginRight: 5
  },
  tokenCheckButton: {
    borderWidth: 0
  },
  tokenErrorBox: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    marginRight: 5
  }
})
