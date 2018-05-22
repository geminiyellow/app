import { create } from '../../../../../styles'

export default create({
  swiper: {
    backgroundColor: '$wallet_swiper_backgroundColor'
  },
  nav: {
    bottom: 5
  },
  navDot: {
    backgroundColor: '$wallet_swiper_navDot_inactive_backgroundColor'
  },
  activeNavDot: {
    backgroundColor: '$wallet_swiper_navDot_active_backgroundColor'
  },
  card: {
    width: '100%',
    height: '100%',
    paddingVertical: 10,
    paddingBottom: 20,
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch'
  }
})
