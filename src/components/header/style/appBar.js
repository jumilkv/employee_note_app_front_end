import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '.5rem 2rem',
        fontFamily: 'monospace',

    },
    logout: {
        border: '1px solid #fff',
        padding: '1rem 1rem',
        fontSize: '15px',
        '&:hover': {
            fontWeight: 'bold',
            borderLeft: '3px solid #fff',
            borderRight: '3px solid #fff',
            cursor: 'pointer',
        }
    },
    title: {
        cursor: 'pinter',
        letterSpacing: '4px',
        fontSize: '30px',
        '&:hover': {
            fontWeight: 'bold',
            cursor: 'pointer',
        }
    },
    titleLink: {
        textDecoration: 'none',
        color: '#fff',
        display: 'flex',
        alignItems: 'center'
    }


}))