import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [focus]: {
      outline: 'none'
    }
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  buttons: {
    margin: theme.spacing(2)
  }
}));

function ModalOverlay(props) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.modalOpen}
      onClose={props.handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.modalOpen}>
        <div className={classes.paper}>
          <Typography
            variant="h5">
            {props.modalMessage.heading}
          </Typography>
          <p>
            {props.modalMessage.messageBody}
          </p>
          <Box
            mt={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttons}
              onClick={props.handleModalClose}>
                Close
            </Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}

export default ModalOverlay;
