import { create } from '../../styles'

export default create({
  container: {
    flex: 0
  },
  modalContent: {
    width: 500,
    minHeight: 500
  },
  table: {
    flex: 1,
    width: '100%',
    marginTop: 10
  },
  tableRow: {
    paddingVertical: 0
  },
  tableRowDataButton: {
    width: '100%',
    borderRadius: 0
  },
  tableRowDataButtonText: {
    textAlign: 'left'
  }
})