import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    textAlign: 'center',
    outline: 0
  },
  buttons: {
    width: '100%',
    height: '56px'
  }
}));

const ModalOverlay = props => {
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
      }}>
      <Fade in={props.modalOpen}>
        <Container
          maxWidth="sm"
          className={classes.paper}>
          <Box
            mb={2}>
            <Typography
              variant="h3">
              {props.modalMessage.heading}
            </Typography>
          </Box>
          <Typography
            mb={2}>
            {props.modalMessage.messageBody}
          </Typography>
          <Box
            mt={2}>
            <Grid
              container
              spacing={2}>
              { props.deleting
                ? <>
                  <Hidden
                    xsDown>
                    <Grid
                      item
                      sm={2} />
                  </Hidden>
                  <Grid
                    item
                    sm={4}
                    xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttons}
                      onClick={() => props.deleteChecklistItem(props.deleteId)}>
                        Delete
                    </Button>
                  </Grid>
                </>
                : <Hidden
                  xsDown>
                  <Grid
                    item
                    sm={props.deleting
                      ? false
                      : 4} />
                </Hidden> }
              <Grid
                item
                sm={4}
                xs={props.deleting
                  ? 6
                  : 12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={props.handleModalClose}>
                    Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
};

export default ModalOverlay;
