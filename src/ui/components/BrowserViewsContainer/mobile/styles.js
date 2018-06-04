import { create, coverParent } from '../../../styles'

export default create({

  /* non-cover-flow mode */

  container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '$browser_coverFlow_backgroundColor'
  },
  tabsButton: {
    marginLeft: 5
  },

  /* coverflow mode */

  coverFlow: {
    backgroundColor: '$browser_coverFlow_backgroundColor'
  },
  cardBlockingOverlay: {
    ...coverParent
  },
  cardsNav: {
    position: 'absolute',
    bottom: 40,
    left: '10%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    width: 40,
    height: 36,
    marginBottom: 30,
    borderRadius: 40
  },
  navDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  navDot: {
    width: 5,
    height: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '$browser_coverFlow_navDot_default_backgroundColor'
  },
  activeNavDot: {
    backgroundColor: '$browser_coverFlow_navDot_active_backgroundColor'
  }
})
