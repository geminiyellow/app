import { create, perWidth } from '../../../styles'

export default create({
  content: {
    height: perWidth(400, '90%')
  },
  scrollContainerContent: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  titleText: {
    marginBottom: 15,
    alignSelf: 'center'
  }
})
