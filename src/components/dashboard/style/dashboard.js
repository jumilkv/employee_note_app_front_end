import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(theme => ({
    mainBox: {
        marginTop: '10rem',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    boxTotal: {
        width: '20rem',
        height: '12rem',
        background: '#dff3f0ad',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: '20px',
        boxShadow: '2px 3px 4px 1px #adadad',
        borderRadius: '10px',
        color: 'gray',
        '&:hover': {
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#007974',
            boxShadow: '3px 5px 7px 2px #adadad',
        }
    },
    boxActive: {
        width: '20rem',
        height: '12rem',
        background: '#e2f3ce',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: '20px',
        boxShadow: '2px 3px 4px 1px #adadad',
        borderRadius: '10px',
        color: 'gray',
        '&:hover': {
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#007974',
            boxShadow: '3px 5px 7px 2px #adadad',
        }
    },
    boxInactive: {
        width: '20rem',
        height: '12rem',
        background: '#ffebe5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: '20px',
        boxShadow: '2px 3px 4px 1px #adadad',
        borderRadius: '10px',
        color: 'gray',
        '&:hover': {
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#007974',
            boxShadow: '3px 5px 7px 2px #adadad',
        }
    },
    boxAdd: {
        width: '20rem',
        height: '12rem',
        background: '#e7e8ff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontFamily: 'monospace',
        fontSize: '20px',
        boxShadow: '2px 3px 4px 1px #adadad',
        borderRadius: '10px',
        color: 'gray',
        '&:hover': {
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#007974',
            boxShadow: '3px 5px 7px 2px #adadad',
        }
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
    }
}));