import { create } from '../../../../../styles'

const cardButton = {
  borderRadius: 0
}


export default create({
  cardButton_active: {
    ...cardButton,
    backgroundColor: '$button_walletCard_enabled_hover_backgroundColor',
    borderColor: '$button_walletCard_enabled_hover_borderColor',
    borderBottomWidth: 0
  },
  cardButton_inactive: {
    ...cardButton,
    borderBottomColor: '$button_walletCard_enabled_hover_borderColor'
  }
})
