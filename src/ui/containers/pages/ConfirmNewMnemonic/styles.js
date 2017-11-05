import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$startScreen_textColor',
  textAlign: 'center',
  maxWidth: '50%',
  marginBottom: 20
}

export default create({
  layoutContent: {
    backgroundColor: '$startScreen_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro1Text: {
    ...text,
    fontSize: '1.5rem'
  },
  intro2Text: {
    ...text,
    fontSize: '1.2rem'
  },
  confirmator: {
    marginTop: 30,
    marginBottom: 40,
    maxWidth: '40%'
  }
})