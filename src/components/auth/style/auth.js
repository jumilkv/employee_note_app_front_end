import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#0c9ebf',

    },
  },
  root: {
    fontSize: '30px',
    color: 'green',

  },
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    background: '#fff',
    padding: '5% 7% 3% 7%',
    borderRadius: '15px'

  },
  form: {
    width: '100%',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    borderColor: 'green'
  },
  reset: {
    margin: '25px 10px 25px 0px',
    borderRadius: '10px',
    height: '3rem'
  },
  submit: {
    margin: '25px 0px 25px 10px',
    borderRadius: '10px',
    height: '3rem'
  },
  errorText: {
    fontSize: 15,
    color: 'red'
  },
  forgotPassword: {
    color: '#0a7bed',
    fontSize: '15px'
  },
  container: {
    width: '45rem'
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  heading: {
    fontFamily: 'monospace',
    fontSize: '30px'

  }
}));