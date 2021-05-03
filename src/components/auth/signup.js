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
import Snack from "../common/snack";
import DataFetch from '../../utils/dataFetch';
const Crypto = new SimpleCrypto(process.env.REACT_APP_CRYPTO_KEY)
const theme = createMuiTheme({
    typography: {
        fontSize: 14,
    },
})

export default function SignUp() {
    let history = useHistory();
    const classes = Style();
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({ name: false });
    const [errorMessage, setErrorMessage] = useState({ name: '' });
    const [snack, setSnack] = React.useState({
        variant: "success",
        message: "",
    });

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
        setState({ name: '', email: '', password: '' })
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/;
        if (state.name === "") {
            setErrors({ ...errors, "name": true })
            setErrorMessage({ ...errorMessage, "name": "Required" })
            setIsLoading(false)
        } else if (state.email === "") {
            setErrors({ ...errors, "email": true })
            setErrorMessage({ ...errorMessage, "email": "Required" })
            setIsLoading(false)
        } else if (state.password === "") {
            setErrors({ ...errors, "password": true })
            setErrorMessage({ ...errorMessage, "password": "Required" })
            setIsLoading(false)
        } else if (!emailRegex.test(state.email)) {
            setErrors({ ...errors, "email": true })
            setErrorMessage({ ...errorMessage, "email": "Enter Valid Email" })
            setIsLoading(false)
        } else if (state.password.length < 7) {
            setErrors({ ...errors, "password": true })
            setErrorMessage({ ...errorMessage, "password": "Minimum 7 Characters Required" })
            setIsLoading(false)
        } else if (state.password.length > 20) {
            setErrors({ ...errors, "password": true })
            setErrorMessage({ ...errorMessage, "password": "Maximum 20 Characters Allowed" })
            setIsLoading(false)
        } else if (!passwordRegex.test(state.password)) {
            setErrors({ ...errors, "password": true })
            setErrorMessage({ ...errorMessage, "password": "Must contain atleast one numeric digit and special character" })
            setIsLoading(false)
        } else {
            let body = JSON.stringify({
                email: state.email,
                name: state.name,
                password: Crypto.encrypt(state.password)
            })
            DataFetch(`${process.env.REACT_APP_BACK_END_API}/auth/register`, "POST", body).then(result => {
                setIsLoading(false)
                setSnack({
                    variant: "success",
                    message: "Successfully registered"
                })
                setTimeout(() => {
                    history.push('/');
                }, 2000)
            }).catch(err => {
                if (err.message === 409) {
                    setError('Email already exists');
                } else {
                    setError('Something went wrong. Please try again later');
                }
                setIsLoading(false)
            })

        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" className={classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
                    <h1 className={classes.heading}>Sign Up</h1>
                    <form required error={error} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} component="fieldset" className={classes.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            onFocus={() => {
                                setErrors({ ...errors, "name": false });
                                setErrorMessage({ ...errorMessage, "name": "" })
                            }}
                            error={errors["name"]}
                            helperText={errorMessage["name"]}
                            autoComplete="name"
                            autoFocus
                            value={state.name}
                            onChange={handleInputChange}
                        />
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
                            value={state.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            placeholder="Must contain atleast one numeric digit and special character"
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
                            <a href="/" className={classes.forgotPassword}>Login</a>
                        </div>
                        <div className={classes.formButtons}>
                            <Button
                                onClick={handleReset}
                                fullWidth
                                variant="contained"
                                color="primary"
                                id="login"
                                className={classes.reset}
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
                                Sign Up {isLoading ? (<CircularProgress
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
            <Snack snack={snack} setSnack={setSnack} />
        </ThemeProvider>
    );
}