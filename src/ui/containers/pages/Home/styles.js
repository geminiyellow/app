import { create, fontMaker } from '../../../styles'

const introText = {
  ...fontMaker(),
  fontSize: '1rem',
  textAlign: 'center',
  color: '$startScreen_textColor',
  maxWidth: '70%',
  marginBottom: 20
}

export default create({
  layoutContent: {
    backgroundColor: '$startScreen_backgroundColor',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  introText1: {
    ...introText,
    ...fontMaker({ weight: 'Light' }),
    fontSize: '2.5rem',
    marginBottom: 30
  },
  introText2: {
    ...introText,
    maxWidth: '50%'
  },
  getStartedButton: {
    marginTop: 20,
    marginBottom: 100
  },
  loginButtonText: {
    fontSize: '0.65rem'
  }
})
