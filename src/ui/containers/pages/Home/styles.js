import { create, fontMaker, whenWidthVerySmall } from '../../../styles'

const introText = {
  ...fontMaker({ weight: 'SemiBold' }),
  fontSize: '1rem',
  textAlign: 'center',
  color: '$splashContent_textColor',
  maxWidth: '90%',
  marginBottom: 20
}

export default create({
  layoutContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 20
  },
  intro2Text: {
    ...introText,
    maxWidth: '50%'
  },
  getStartedButton: {
    marginTop: 20,
    marginBottom: 100
  },
  getStartedButtonText: {
    fontSize: '1rem'
  },
  loginButtonText: {
    fontSize: '0.7rem'
  },

  ...whenWidthVerySmall({
    intro2Text: {
      maxWidth: '90%'
    }
  })
})
