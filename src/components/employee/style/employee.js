import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    width: '96%',
    overflowX: 'auto',
    marginLeft: 30,
    fontSize: 15,
    height: '79vh',
    fontFamily: 'monospace',
  },
  table: {
    minWidth: 700,
    fontFamily: 'monospace',
  },
  tableHead: {
    height: '30',
    background: '#8a8888',
    color: '#fff',
    fontWeight: 'bold',
    top: 0,
    fontFamily: 'monospace',
  },
  tableWrapper: {
    overflow: 'auto',
    maxHeight: '79vh',
  },
  tableRowData: {
    '&:hover': {
      background: "#ededf2",
    },
    fontFamily: 'monospace',
  },
  editIcon: {
    color: 'blue',
    marginRight: 20,
    cursor: 'pointer',
  },
  cursor: {
    cursor: 'pointer',
  },
  rowData: {
    fontFamily: 'monospace',
    wordBreak: 'break-all'
  },
  modalClose: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#fff',
    cursor: 'pointer',
  },
  modal: {
    height: 850,
    width: '100%',
    overflow: 'auto',
    marginTop: '4rem',
    position: 'fixed'

  },
  modalMain: {
    height: 530,
    overflow: 'hidden',
    marginBottom: '15rem',
    paddingBottom: '15rem',
    position: 'fixed'
  },
  modalHead: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    background: '#0c9ebf',
    borderRadius: '.6rem .6rem 0 0',
    boxShadow: '0px 1px 12px 0px #778977',
    color: '#fff',
  },
  modalTitle: {
    paddingLeft: 40,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: 'monospace',
    fontSize: '20px'
  },
  loadingIcon: {
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  search: {
    width: '40rem'
  },
  empHeader: {
    margin: '7rem 2rem 1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  empTitle: {
    fontFamily: 'monospace',
    fontSize: '25px',
    letterSpacing: '2px',
    color: '#8a8888'
  }
});
