import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Cookie from "js-cookie";

import Style from './style/appBar';

const theme = createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff",
        },
        type: "light",
        primary: {
            light: "#7986cb",
            main: "#007974",
            dark: "#303f9f",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff4081",
            main: "#f50057",
            dark: "#c51162",
            contrastText: "#fff"
        }
    },
    spacing: 10,
    typography: {
        fontSize: 25,
        fontFamily: 'monospace'
    },
});


function AppBarComponent() {
    const classes = Style();

    const handleLogout = () => {
        Cookie.remove(process.env.REACT_APP_AUTH_TOKEN)
        window.location = '/'
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className={classes.appBar} >
                <div className={classes.heading}>
                    <h1 className={classes.title}><a href="/dashboard" className={classes.titleLink}><HomeIcon style={{ fontSize: '40px', marginRight: '.5rem' }} />Employees Note Book</a></h1>
                    <p className={classes.logout} onClick={handleLogout}>Logout</p>
                </div>
            </AppBar>
        </ThemeProvider>
    );
}

export default withRouter(AppBarComponent)