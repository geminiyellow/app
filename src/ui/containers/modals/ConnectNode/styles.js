import { create, fontMaker } from '../../../styles'

const text = {
  ...fontMaker({ weight: 'Light' }),
  color: '$modal_content_textColor'
}

export default create({
  content: {
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400,
    height: 'auto'
  },
  form: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  picker: {
    marginBottom: 20
  },
  pickerButton: {
    width: 300
  },
  button: {
    marginTop: 25,
    width: 200
  },
  title: {
    ...text,
    fontSize: '1.2rem',
    marginBottom: 30
  },
  nameText: {
    ...text,
    fontSize: '1.4rem'
  },
  urlText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10,
    color: '$modal_connectNode_darkTextColor'
  },
  networkText: {
    ...text,
    fontSize: '1.4rem',
    marginTop: 20
  },
  chainIdText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10,
    color: '$modal_connectNode_darkTextColor'
  },
  blockText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10,
    color: '$modal_connectNode_darkTextColor'
  },
  syncingText: {
    ...text,
    fontSize: '0.7rem',
    marginTop: 10,
    color: '$modal_connectNode_darkTextColor'
  },
  errorBox: {
    marginTop: 30
  },
  disconnectReasonBox: {
    marginBottom: 20
  }
})
