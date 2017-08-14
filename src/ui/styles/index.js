import flatten from 'flat'
import { Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

export const theme = require('./themes')
EStyleSheet.build(flatten(theme, { delimiter: '_' }))

export const screen = Dimensions.get('window')

export const create = EStyleSheet.create.bind(EStyleSheet)

export const transparentBg = {
  backgroundColor: 'transparent'
}

export const centerText = {
  textAlign: 'center'
}

export const coverParent = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
}

const SHADOW_MAX_LEVEL = 6
export const dropShadower = (level = 1, width = 0, height = 0, color = '#000') => ({
  /* ios */
  shadowColor: color,
  shadowOffset: { width, height },
  shadowOpacity: 0.3 + 0.1 * Math.min(level, SHADOW_MAX_LEVEL),
  shadowRadius: Math.min(level, SHADOW_MAX_LEVEL) * 2,
  /* android */
  elevation: Math.min(level, SHADOW_MAX_LEVEL) * 7
})

export const fontMaker = () => ({
  ...transparentBg,
})
