import { create, fontMaker, perWidth } from '../../../styles'

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

const flexRow = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
}

export default create({
  // $outline: 1,

  content: {
    width: perWidth(500, '90%'),
    height: 'auto'
  },

  /* texts */

  titleText: {
    marginBottom: 20
  },
  addressBlock: {
    ...flexRow
  },
  address: {
    flex: 1
  },
  addressText: {
    ...text,
    fontSize: '0.8rem'
  },
  chainLinkButton: {
    marginLeft: 3
  },
  meta: {
    marginTop: 5,
    ...flexRow
  },
  metaIcon: {
    marginHorizontal: 10
  },
  metaIconText: {
    ...text,
    color: '$modal_editAddress_metaTextColor',
    fontSize: '0.7rem'
  },

  /* form */

  formWrapper: {
    marginTop: 10,
    width: '90%'
  },
  field: {
    marginBottom: 10
  },
  errorBox: {
    marginTop: 20
  },

  /* buttons */

  buttons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginHorizontal: 5
  }
})
