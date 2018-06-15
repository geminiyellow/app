import { create, fontMaker } from '../../../styles'

const titleText = {
  ...fontMaker({ weight: 'Light' }),
  color: '$modal_content_textColor'
}

const text = {
  ...fontMaker(),
  color: '$modal_content_textColor'
}

export default create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  scrollContainerContent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  formWrapper: {
    flex: 0,
    alignSelf: 'stretch',
    marginBottom: 10
  },
  pickerButton: {
  },
  button: {
    marginTop: 25,
    width: 200
  },
  buttonText: {
    fontSize: '1rem'
  },
  title: {
    ...text,
    fontSize: '1.2rem',
    marginBottom: 30
  },

  /* when conneted */

  networkText: {
    ...titleText,
    fontSize: '1.4rem'
  },
  typeText: {
    ...text,
    marginTop: 10,
    fontSize: '0.7rem'
  },
  chainIdText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10
  },
  block: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blockText: {
    ...text,
    fontSize: '0.7rem'
  },
  blockLinkButton: {
    marginLeft: 3
  },
  blockLinkButtonText: {
    fontSize: '0.6rem'
  },
  syncingText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10
  },

  /* error display */

  errorBox: {
    marginTop: 20
  },

  /* picker stuff */

  pickerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerOptionLabelText: {
    ...fontMaker(),
    color: '$form_picker_textColor',
    fontSize: '1rem'
  },
  pickerOptionCategoryText: {
    ...fontMaker(),
    color: '$form_picker_category_textColor',
    fontSize: '0.8rem'
  }

})
