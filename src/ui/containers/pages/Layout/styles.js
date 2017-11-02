import { create, fontMaker } from '../../../styles'

const textStyles = {
  ...fontMaker(),
  color: '$header_textColor',
  fontSize: '0.8rem'
}

export default create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch'
  },

  /* header */

  header: {
    flex: 0,
    backgroundColor: '$header_backgroundColor',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerAppNameText: {
    ...textStyles
  },
  etherBalanceText: {
    ...textStyles
  },
  headerConnectionText: {
    ...textStyles
  },

  /* content */

  content: {
    flex: 1,
    padding: 20
  }
})
