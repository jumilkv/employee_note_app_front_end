import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookie from "js-cookie";
import SimpleCrypto from "simple-crypto-js"
import { useHistory } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import Style from './style/auth';
import DataFetch from '../../utils/dataFetch';
const Crypto = new SimpleCrypto(process.env.REACT_APP_CRYPTO_KEY)
const theme = createMuiTheme({
    typography: {
        fontSize: 14,
    },
})

export default function LogIn() {
    let history = useHistory();
    const classes = Style();
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ name: false });
    const [errorMessage, setErrorMessage] = useState({ name: '' });
    useEffect(() => {
        if (Cookie.get(process.env.REACT_APP_AUTH_TOKEN) !== undefined) {
            history.push('/dashboard');
        }
    }, [])
    const handleInputChange = (event) => {
        const { value, name } = event.target;
        if (value.length > 50) {
            setErrors({ ...errors, [name]: true })
            setErrorMessage({ ...errorMessage, [name]: "Maximum 50 characters are allowed" })
        } else {
            setState({ ...state, [name]: value })
            setError('')
            setErrors({ ...errors, [name]: false })
            setErrorMessage({ ...errorMessage, [name]: "" })
        }
    }

    const handleReset = () => {
        setState({ email: '', password: '' })
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (state.email === "") {
            setError('Please provide both email and password')
            setIsLoading(false)
        } else if (state.password === "") {
            setError('Please provide both email and password')
            setIsLoading(false)
        } else if (!emailRegex.test(state.email)) {
            setError('Invalid email or password. Try again')
            setIsLoading(false)
        } else {
            let body = JSON.stringify({
                email: state.email,
                password: Crypto.encrypt(state.password)

            })
            DataFetch(`${process.env.REACT_APP_BACK_END_API}/auth/login`, "POST", body).then(result => {
                if (result.token !== undefined) {
                    let date = new Date();
                    let minutes = 1440; // 24 hrs 
                    date.setTime(date.getTime() + (minutes * 60 * 1000));
                    Cookie.set(process.env.REACT_APP_AUTH_TOKEN, result.token, { expires: date }); //Expire time 24 hrs
                    history.push('/dashboard');
                } else {
                    setError('Invalid email or password. Try again');
                }
                setIsLoading(false)
            }).catch(err => {
                setError('Invalid email or password. Try again');
                setIsLoading(false)
            })

        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" className={classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
                    <h1 className={classes.heading}>Login</h1>
                    <form required error={error} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} component="fieldset" className={classes.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            onFocus={() => {
                                setErrors({ ...errors, "email": false });
                                setErrorMessage({ ...errorMessage, "email": "" })
                            }}
                            error={errors["email"]}
                            helperText={errorMessage["email"]}
                            autoComplete="email"
                            autoFocus
                            value={state.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onFocus={() => {
                                setErrors({ ...errors, "password": false });
                                setErrorMessage({ ...errorMessage, "password": "" })
                            }}
                            error={errors["password"]}
                            helperText={errorMessage["password"]}
                            autoComplete="current-password"
                            value={state.password}
                            onChange={handleInputChange}
                        />
                        <div style={{ textAlign: 'end' }}>
                            <a href="/sign-up" className={classes.forgotPassword}>Sign-up</a>
                        </div>
                        <div className={classes.formButtons}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                id="login"
                                className={classes.reset}
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                id="login"
                                className={classes.submit}
                            >
                                Log In {isLoading ? (<CircularProgress
                                    color="#fff"
                                    size={15}
                                    style={{ color: "#fff", marginLeft: '1rem' }}
                                />) : ' '}
                            </Button>

                        </div>
                        <FormHelperText className={classes.errorText} id='errorText'>{error}</FormHelperText>
                    </form>
                </div>
            </Container>
        </ThemeProvider>
    );
}