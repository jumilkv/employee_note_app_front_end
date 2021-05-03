import React, { useEffect } from 'react';
import Style from './style/dashboard'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from 'react-awesome-modal';
import CloseIcon from '@material-ui/icons/Close';
import EmpModal from '../employee/modal/empModal'
import DataFetch from '../../utils/dataFetch';
import Snack from "../common/snack";
import CookieInfo from '../../utils/infoInCookie';


export default function Dashboard() {
    let { id } = CookieInfo();
    const classes = Style();
    const [modalShow, setModalShow] = React.useState(false);
    const [modalData, setModalData] = React.useState({});
    const [modalName, setModalName] = React.useState('');
    const [count, setCount] = React.useState({ total: 0, active: 0, inactive: 0 });
    const [snack, setSnack] = React.useState({
        variant: "success",
        message: "",
    });

    const openModal = () => {
        setModalShow(true)
        setModalData({});
        setModalName('Add ')
    }

    const fetchCount = () => {
        DataFetch(`${process.env.REACT_APP_BACK_END_API}/dashboard/${id}`, "GET").then(result => {
            setCount(result)
        });
    }

    const closeModal = async (message, variant) => {
        if (variant !== "error") {
            setModalShow(false);
        }
        setSnack({
            variant: variant,
            message: message
        })
        fetchCount()
    }

    const handleEmployeeURL = (type) => {
        window.location = "/employees/" + type
    }

    useEffect(() => {
        fetchCount()
    }, [])

    return (
        <div>
            <div className={classes.mainBox}>
                <div className={classes.boxTotal} onClick={() => handleEmployeeURL("all")}><span>All Employees</span><span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', color: '#11a9a2' }}><PeopleAltIcon style={{ fontSize: '1.9rem', marginRight: '.5rem', marginBottom: '.20rem' }} />{count.total}</span></div>
                <div className={classes.boxActive} onClick={() => handleEmployeeURL("active")}><span>Active Employees</span><span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', color: 'green' }}><CheckCircleIcon style={{ fontSize: '1.9rem', marginRight: '.5rem', marginBottom: '.20rem' }} />{count.active}</span></div>
                <div className={classes.boxInactive} onClick={() => handleEmployeeURL("inactive")}><span>Inactive Employees</span><span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', color: 'red' }}><CancelIcon style={{ fontSize: '1.9rem', marginRight: '.5rem', marginBottom: '.20rem' }} />{count.inactive}</span></div>
                <div className={classes.boxAdd} onClick={openModal}><span>Add Employee</span><span style={{ display: 'flex', alignItems: 'center', color: '#114ea9' }}><GroupAddIcon style={{ fontSize: '2.4rem', marginBottom: '.20rem' }} /></span></div>
            </div>
            <Modal visible={modalShow} width="550" height="730" effect="fadeInUp">
                <div className={classes.modalMain} >
                    <div className={classes.modalHead}>
                        <h3 className={classes.modalTitle}>{modalName + "Employee"}</h3>
                        <div className={classes.modalClose}><CloseIcon onClick={() => closeModal(false, '')} className={classes.cursor} /></div>
                    </div>
                    <div className={classes.modal} >
                        <EmpModal data={modalData} type={modalName} closeModal={closeModal} />
                    </div>
                </div>
            </Modal>
            <Snack snack={snack} setSnack={setSnack} />

        </div>
    );
}
