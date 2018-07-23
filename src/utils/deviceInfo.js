import { Dimensions, Platform } from 'react-native'
// import DeviceInfo from 'react-native-device-info'

export const isWeb = () => 'web' === Platform.OS
export const isAndroid = () => 'android' === Platform.OS
export const isIos = () => 'ios' === Platform.OS
export const isMobile = () => isAndroid() || isIos()

export const getOsName = () => {
  if (isAndroid()) {
    return 'android'
  } else if (isIos()) {
    return 'ios'
  }

  return window.osName || 'unknown'
}

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window')

export const isIphoneX = () => (
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (WINDOW_HEIGHT === 812 || WINDOW_WIDTH === 812)
)
