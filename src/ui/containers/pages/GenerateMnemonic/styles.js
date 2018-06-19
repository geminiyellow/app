import { create, fontMaker, getHeaderHeight, perWidth } from '../../../styles'

const introText = {
  ...fontMaker({ weight: 'SemiBold' }),
  fontSize: '1rem',
  color: '$splashContent_textColor',
  textAlign: 'center',
  maxWidth: '75%',
  marginBottom: 25
}

export default create({
  layoutContent: {
    paddingVertical: Math.max(getHeaderHeight() + 10, 50),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro1Text: {
    ...introText,
    fontSize: '1.5rem',
    maxWidth: perWidth('100%', '100%', '90%')
  },
  intro2Text: {
    ...introText,
    ...fontMaker({ weight: 'Bold' }),
    fontSize: '0.8rem',
    textDecorationLine: 'underline',
    width: '60%',
    maxWidth: perWidth('100%', '100%', '90%')
  },
  mnemonic: {
    maxWidth: '90%'
  },
  nextButton: {
    maxWidth: '90%',
    marginTop: 40
  },
  nextButtonText: {
    fontSize: '1rem'
  },
  loginButton: {
    marginTop: 40,
    marginBottom: 30
  },
  loginButtonText: {
    fontSize: '0.7rem'
  }
})
