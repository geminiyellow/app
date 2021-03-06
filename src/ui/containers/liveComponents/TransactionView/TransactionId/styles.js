import { create, fontMaker } from '../../../../styles'

const text = {
  ...fontMaker(),
  maxWidth: '100%',
  textAlign: 'left'
}

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
}

export default create({
  container: {
    ...flexRow
  },
  idTextContainer: {
    flex: 1
  },
  idText: {
    ...text,
    color: '$transactionBlock_id_textColor',
    fontSize: '0.9rem'
  },
  idLinkButton: {
    marginLeft: 3
  },
  idLinkButtonText: {
    fontSize: '0.9rem'
  }
})
