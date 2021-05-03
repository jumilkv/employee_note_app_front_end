import React from 'react';
import clsx from 'clsx';

//material ui core
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

//material ui icons
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: 'red',
  },
  info: {
    backgroundColor: '#6b91e3',
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 1,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'monospace'
  },

}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, variant, onClose, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default function Snackbars(props) {
  const { snack, setSnack } = props;

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, message: '' });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(snack.message)}
      autoHideDuration={10000}
      onClose={handleClose}
    >
      <MySnackbarContentWrapper
        onClose={handleClose}
        variant={snack.variant}
        message={snack.message}
      />
    </Snackbar>
  );
}