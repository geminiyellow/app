import { create, value, fontMaker, dropShadower } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem'
}

export default create({
  // $outline: 1,
  menuContainer: {
    backgroundColor: '$browser_mobileMenu_backgroundColor',
    ...dropShadower(1, 0, 0, value('$browser_mobileMenu_shadowColor'))
  },
  button: {
    paddingHorizontal: 3,
    paddingVertical: 4
  },
  buttonIcon: {
    fontSize: '1.6rem'
  },
  option: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '$browser_mobileMenu_optionBorderColor'
  },
  optionText: {
    ...text,
    textAlign: 'left',
    marginLeft: 10
  }
})
