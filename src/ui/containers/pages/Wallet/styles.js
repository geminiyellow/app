import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker(),
  fontSize: '1rem',
  color: '$content_textColor'
}

export default create({
  // $outline: 1,

  layoutContent: {
    backgroundColor: '$content_backgroundColor',
    borderTopWidth: 1,
    borderTopColor: '$content_borderTop_color',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 0,
    height: '95%'
  },

  /* account cards */

  cardsScrollView: {
    flex: 0,
    width: '100%',
    marginTop: 10
  },
  cardsContent: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  card: {
    height: 200
  },
  cardText: {
    ...text
  }
})
