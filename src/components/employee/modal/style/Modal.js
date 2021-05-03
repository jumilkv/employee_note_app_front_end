import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#fff',
    },
  },
  root: {
    fontSize: '30px',
    color: 'green'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: '25px',
  },
  formButton: {
    display: 'flex',
    marginTop: 30
  },
  submit: {
    marginLeft: 20,
    height: '7vh',
    marginRight: 20,
    background: '#4e9fbf',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      background: '#46A746',
      color: '#fff',
    }
  },
  reset: {
    color: '#4e9fbf',
    background: '#fff',
    borderColor: '#4e9fbf',
    border: '1px solid',
    marginRight: 20,
    height: '7vh',
    marginLeft: 20,
    fontWeight: 'bold',
    '&:hover': {
      color: '#2e772b',
      background: '#fff',
      borderColor: '#2e772b',
      border: '1px solid',
    }
  },
  errorText: {
    fontSize: 16,
    marginTop: '2rem',
    textAlign: 'center',
    color: 'rgb(77, 73, 73)'
  },
  successText: {
    fontSize: 16,
    marginBottom: '1rem',
    color: 'green',
    textAlign: 'center'
  },
  textField: {
    marginBottom: '2rem',
    marginTop: '3rem '
  },
  loadingIcon: {
    marginLeft: '16rem',
    marginTop: '3rem',
    color: '#09069c'
  },
  submitLoadingIcon: {
    marginLeft: '1rem',
    color: '#09069c'
  },
  container: {
    height: '17rem',
    flexDirection: 'row',
    border: '1px solid #c4c4c4',
    padding: '1rem',
    borderRadius: '4px',
    marginTop: '1rem'
  },
  items: {
    overflowX: 'auto',
    height: '12rem',
    marginTop: '3rem',
    marginBottom: '2.5rem'
  },
  head: {
    position: 'fixed',
    color: '#7f7f7f',
    fontSize: '14px'
  }
}));