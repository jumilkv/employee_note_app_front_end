import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Style from './style/Modal';
import DataFetch from '../../../utils/dataFetch';
import CookieInfo from '../../../utils/infoInCookie';

const theme = createMuiTheme({
    palette: {
        common: {
            black: "#000",
            white: "#fff",
            indigo: "#2c387e"
        },
        type: "light",
        primary: {
            light: "#7986cb",
            main: "#357a38",
            dark: "#303f9f",
            contrastText: "#fff"
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
        fontSize: 15,
    },
})

export default function BranchModal(props) {
    let { id } = CookieInfo();
    const classes = Style();
    const [state, setState] = useState({ empId: '', name: '', email: '', age: '', phone: '', address: '' });
    const [stageLoading, setStageLoading] = useState(false);
    const [errors, setErrors] = useState({ name: false });
    const [errorMessage, setErrorMessage] = useState({ name: '' });
    const type = props.type === 'Edit ' ? 'Update' : 'Add'
    const [error, setError] = useState("")
    const [resError, setResError] = useState({ status: false, message: "" })

    React.useEffect(() => {
        async function fetchData() {
            if (props.data.id !== undefined) {
                setState({ empId: props.data.emp_id, name: props.data.name, email: props.data.email, age: props.data.age, phone: props.data.phone, address: props.data.address })
            } else {
                setState({ empId: '', name: '', email: '', age: '', phone: '', address: '' })
            }
        }
        fetchData();
    }, [props.data])

    React.useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);


    const handleInputChange = async (event) => {
        const { value, name } = event.target;
        let specilCharReg = /^[#\\@\\$%\\^\\&*\\|\\\\//.\]\\)\\(;:,+"'_\\=!><?\-\\[`~{}]|`~.\\\/_\]]+$/g;
        let result = specilCharReg.test(event.target.value[event.target.value.length - 1])
        if (name === "email") {
            if (event.target.value.length > 30) {
                setErrors({ ...errors, [name]: true })
                setErrorMessage({ ...errorMessage, [name]: "Maximum 30 characters are allowed" })
            } else {
                setState({ ...state, [name]: value });
                setErrors({ ...errors, [name]: false })
                setErrorMessage({ ...errorMessage, [name]: '' })
            }
        } else if (name === "age" || name === "phone") {
            if (isNaN(value)) {
                setErrors({ ...errors, [name]: true })
                setErrorMessage({ ...errorMessage, [name]: "Only allowed numeric characters" })
            } else {
                setState({ ...state, [name]: value });
                setErrors({ ...errors, [name]: false })
                setErrorMessage({ ...errorMessage, [name]: '' })
            }
        } else if (result === false) {
            if (event.target.value.length > 30) {
                setErrors({ ...errors, [name]: true })
                setErrorMessage({ ...errorMessage, [name]: "Maximum 30 characters are allowed" })
            } else {
                setState({ ...state, [name]: value });
                setErrors({ ...errors, [name]: false })
                setErrorMessage({ ...errorMessage, [name]: '' })
            }
        } else {
            setErrors({ ...errors, [name]: true })
            setErrorMessage({ ...errorMessage, [name]: "Special characters are not allowed" })
        }
    }

    const reset = () => {
        setError('');
        if (props.data.id !== undefined) {
            setState({ empId: props.data.emp_id, name: props.data.name, email: props.data.email, age: props.data.age, phone: props.data.phone, address: props.data.address })
        } else {
            setState({ empId: '', name: '', email: '', age: '', phone: '', address: '' })
        }
    }

    const handleSubmit = async () => {
        setError('');
        setResError({ status: false, message: "" })
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (state.empId === '' || state.empId === undefined) {
            setErrors({ ...errors, "empId": true })
            setErrorMessage({ ...errorMessage, "empId": "Required" })
        } else if (state.name === '' || state.name === undefined) {
            setErrors({ ...errors, "name": true })
            setErrorMessage({ ...errorMessage, "name": "Required" })
        } else if (state.email === '' || state.email === undefined) {
            setErrors({ ...errors, "email": true })
            setErrorMessage({ ...errorMessage, "email": "Required" })
        } else if (!emailRegex.test(state.email)) {
            setErrors({ ...errors, "email": true })
            setErrorMessage({ ...errorMessage, "email": "Enter a valid email" })
        } else if (state.age === '' || state.age === undefined) {
            setErrors({ ...errors, "age": true })
            setErrorMessage({ ...errorMessage, "age": "Required" })
        } else if (state.address === '' || state.address === undefined) {
            setErrors({ ...errors, "address": true })
            setErrorMessage({ ...errorMessage, "address": "Required" })
        } else if (state.phone === '' || state.phone === undefined) {
            setErrors({ ...errors, "phone": true })
            setErrorMessage({ ...errorMessage, "phone": "Required" })
        } else if (state.phone.length !== 10) {
            setErrors({ ...errors, "phone": true })
            setErrorMessage({ ...errorMessage, "phone": "Enter a valid phone number" })
        } else {
            setStageLoading(true);
            if (props.data.id !== undefined) {
                let body = JSON.stringify({
                    empId: state.empId,
                    name: state.name,
                    email: state.email,
                    age: state.age,
                    address: state.address,
                    phone: state.phone,
                    userId: id,
                    id: props.data.id
                })
                DataFetch(`${process.env.REACT_APP_BACK_END_API}/employee/update`, "PUT", body).then(result => {
                    setStageLoading(false);
                    if (result.status === "error") {
                        setResError({ status: true, message: result.message })
                    } else {
                        props.closeModal(result.message, result.status)
                    }
                }).catch(err => {
                    console.log("errr : ", err)
                })
            } else {
                let body = JSON.stringify({
                    empId: state.empId,
                    name: state.name,
                    email: state.email,
                    age: state.age,
                    address: state.address,
                    phone: state.phone,
                    userId: id
                })
                DataFetch(`${process.env.REACT_APP_BACK_END_API}/employee`, "POST", body).then(result => {
                    setStageLoading(false);
                    if (result.status === "error") {
                        setResError({ status: true, message: result.message })
                    } else {
                        props.closeModal(result.message, result.status)
                    }
                }).catch(err => {
                    console.log("errr : ", err)
                })
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                <div className={classes.paper}>
                    <form required error={error} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} component="fieldset" className={classes.form} >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="standard-required"
                            label="Employee ID"
                            name="empId"
                            autoComplete="off"
                            onFocus={() => {
                                setErrors({ ...errors, "empId": false });
                                setErrorMessage({ ...errorMessage, "empId": "" })
                            }}
                            error={errors["empId"]}
                            helperText={errorMessage["empId"]}
                            autoFocus
                            value={state.empId}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="standard-required"
                            label="Name"
                            name="name"
                            autoComplete="off"
                            onFocus={() => {
                                setErrors({ ...errors, "name": false });
                                setErrorMessage({ ...errorMessage, "name": "" })
                            }}
                            error={errors["name"]}
                            helperText={errorMessage["name"]}
                            value={state.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="standard-required"
                            label="Email ID"
                            name="email"
                            autoComplete="off"
                            onFocus={() => {
                                setErrors({ ...errors, "email": false });
                                setErrorMessage({ ...errorMessage, "email": "" })
                            }}
                            error={errors["email"]}
                            helperText={errorMessage["email"]}
                            value={state.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="standard-required"
                            label="age"
                            name="age"
                            autoComplete="off"
                            onFocus={() => {
                                setErrors({ ...errors, "age": false });
                                setErrorMessage({ ...errorMessage, "age": "" })
                            }}
                            error={errors["age"]}
                            helperText={errorMessage["age"]}
                            value={state.age}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="standard-required"
                            label="Address"
                            name="address"
                            autoComplete="off"
                            onFocus={() => {
                                setErrors({ ...errors, "address": false });
                                setErrorMessage({ ...errorMessage, "address": "" })
                            }}
                            error={errors["address"]}
                            helperText={errorMessage["address"]}
                            value={state.address}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="standard-required"
                            label="Phone Number"
                            name="phone"
                            autoComplete="off"
                            onFocus={() => {
                                setErrors({ ...errors, "phone": false });
                                setErrorMessage({ ...errorMessage, "phone": "" })
                            }}
                            error={errors["phone"]}
                            helperText={errorMessage["phone"]}
                            value={state.phone}
                            onChange={handleInputChange}
                        />

                        {resError.status === true ? (<p style={{ color: "red" }}>*{resError.message}</p>) : ""}

                        <div className={classes.formButton}>
                            <Button variant="contained" fullWidth className={classes.reset} onClick={reset} disabled={stageLoading}>
                                {type === 'Add' ? 'Clear' : 'Reset'}
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="red"
                                disabled={stageLoading}
                                fullWidth
                                id='submit'
                                className={classes.submit}
                            >
                                {type} {stageLoading ? <CircularProgress size={15} color="primary" className={classes.submitLoadingIcon} /> : ''}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </ThemeProvider>
    );
}