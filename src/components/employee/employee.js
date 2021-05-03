import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmployeeModal from '../employee/modal/empModal';
import Modal from 'react-awesome-modal';
import DataFetch from '../../utils/dataFetch';
import CookieInfo from '../../utils/infoInCookie';
import Snack from "../common/snack";
import SwitchActive from './activate';
import Style from './style/employee';
import { TextField } from '@material-ui/core';
const moment = require('moment');

const theme = createMuiTheme({
    typography: {
        fontSize: 15,
    },
});

export default function Employees(props) {
    let { id } = CookieInfo();

    let url = window.location.href.split('/')
    let urlType = url[url.length - 1] // all/active/inactive

    const [rows, setRows] = React.useState([]);
    const classes = Style();
    const [stageLoading, setStageLoading] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = React.useState({});
    const [modalName, setModalName] = React.useState('');
    const [snack, setSnack] = React.useState({
        variant: "success",
        message: "",
    });

    const columns = [
        { id: 'emp_id', label: "Employee ID", minWidth: 120, maxWidth: 120 },
        { id: 'name', label: "Name", minWidth: 150, maxWidth: 150 },
        { id: 'email', label: "Email ID", minWidth: 150, maxWidth: 150 },
        { id: 'age', label: "Age", minWidth: 50, maxWidth: 50 },
        { id: 'address', label: "Address", minWidth: 180, maxWidth: 180 },
        { id: 'phone', label: "Phone Number", minWidth: 150, maxWidth: 150 },
        { id: 'created_on', label: "Created On", align: 'left', minWidth: 230, maxWidth: 230 },
        { id: 'status', label: 'Status', align: 'left', minWidth: 140 }
    ];

    const createdOn = (createdDate) => {
        const date = new Date(createdDate).toDateString();
        const time = new Date(createdDate).toLocaleTimeString();
        var momentObj = moment(time, ["h:mm:ss a"])
        return date + ' ' + momentObj.format("hh:mm:ss a");
    }

    const addOrUpdate = (type, data) => (event) => {
        setModalData({});
        if (type === 'edit') {
            setModalShow(true)
            setModalData(data);
            setModalName('Edit ')
        } else {
            setModalShow(true)
            setModalData({});
            setModalName('Add ')
        }
    }

    async function fetchData(type) {
        setStageLoading(true);
        if (type === "all") {
            DataFetch(`${process.env.REACT_APP_BACK_END_API}/employee/${id}`, "GET").then(result => {
                setRows(result);
                setStageLoading(false);
            });
        } else if (type === "active") {
            DataFetch(`${process.env.REACT_APP_BACK_END_API}/employee/true/${id}`, "GET").then(result => {
                setRows(result);
                setStageLoading(false);
            });
        } else if (type === "inactive") {
            DataFetch(`${process.env.REACT_APP_BACK_END_API}/employee/false/${id}`, "GET").then(result => {
                setRows(result);
                setStageLoading(false);
            });
        }

    }

    const closeModal = async (message, variant) => {
        setModalShow(false);
        setSnack({
            variant: variant,
            message: message
        })
        fetchData(urlType)
    }

    useEffect(() => {
        if (urlType === "all" || urlType === "active" || urlType === "inactive") {
            fetchData(urlType)
        } else {
            window.location = '/dashboard'
        }
    }, [])

    useEffect(() => {
        return () => {
            console.log("cleaned up");
        };
    }, []);

    const handleSearch = async (event) => {
        setStageLoading(true);
        if (event.target.value.length > 0) {
            let body = JSON.stringify({
                searchKey: event.target.value,
                userId: id,
                type: urlType
            })
            DataFetch(`${process.env.REACT_APP_BACK_END_API}/employee/search`, "POST", body).then(result => {
                setRows(result);
                setStageLoading(false);
            });
        }
        else {
            fetchData(urlType);
        }
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div className={classes.empHeader}>
                    <h2 className={classes.empTitle}>{urlType === "active" ? "Active " : urlType === "inactive" ? "Inactive" : ""} Employees (Count: {rows.length})</h2><TextField id="outlined" onChange={handleSearch} label="Search" placeholder="Employee ID/ Name/ Email ID/ Age/ Address/ Phone Number" className={classes.search} variant="outlined" />
                </div>
                {!stageLoading ?
                    <React.Fragment>
                        <Paper className={classes.root} >
                            <div className={classes.tableWrapper}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead  >
                                        <TableRow>
                                            {columns.map((column, index) => (
                                                <TableCell
                                                    className={classes.tableHead}
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            )
                                            )}
                                            <TableCell className={classes.tableHead} align="left">
                                                {"Edit"}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            rows.map(employee => {
                                                return (
                                                    <TableRow hover tabIndex={-1} className={classes.rowData} >
                                                        {columns.map(column => {
                                                            const value = employee[column.id];
                                                            return (
                                                                column.id === 'status' ?
                                                                    <TableCell className={classes.rowData}>
                                                                        <SwitchActive id={employee.id} fetchData={fetchData} type={url[url.length - 1]} name={employee.name} active={value} />
                                                                    </TableCell>
                                                                    : column.id === 'created_on' ?
                                                                        <TableCell className={classes.rowData}>
                                                                            {createdOn(value)}
                                                                        </TableCell>
                                                                        : <TableCell key={column.id} align={column.align} className={classes.rowData}>
                                                                            {value}
                                                                        </TableCell>
                                                            );
                                                        })}
                                                        <TableCell className={classes.tableRowData}>
                                                            <Tooltip title={`Edit employee (` + employee.name + `)`} placement="right">
                                                                <EditIcon className={classes.editIcon} onClick={addOrUpdate('edit', employee)} />
                                                            </Tooltip>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </div>
                        </Paper>

                        {modalShow ? (
                            <Modal visible={modalShow} width="550" height="730" effect="fadeInUp">
                                <div className={classes.modalMain} >
                                    <div className={classes.modalHead}>
                                        <h3 className={classes.modalTitle}>{modalName + "Employee"}</h3>
                                        <div className={classes.modalClose}><CloseIcon onClick={() => closeModal(false, '')} className={classes.cursor} /></div>
                                    </div>
                                    <div className={classes.modal} >
                                        <EmployeeModal data={modalData} type={modalName} closeModal={closeModal} />
                                    </div>
                                </div>
                            </Modal>
                        ) : (<></>)}
                    </React.Fragment> : <CircularProgress size={50} color="primary" className={classes.loadingIcon} />
                }
                <Snack snack={snack} setSnack={setSnack} />
            </ThemeProvider>
        </div>
    );
}