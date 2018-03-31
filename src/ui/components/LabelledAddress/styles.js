import { create, fontMaker } from '../../styles'

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  addressText: {
    ...fontMaker({ weight: 'Light' }),
    fontSize: '1rem',
    textAlign: 'left',
    color: '$addressBook_address_textColor'
  },
  labelText: {
    ...fontMaker(),
    fontSize: '0.7rem',
    color: '$addressBook_label_textColor'
  }
})
