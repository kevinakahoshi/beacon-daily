import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  mainSection: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden'
  },
  contentSection: {
    margin: 'auto',
    textAlign: 'center',
    color: 'inherit'
  },
  buttons: {
    width: '100%',
    height: '56px'
    // margin: theme.spacing(2)
  }
}));

const Home = props => {
  const classes = useStyles();
  const guestUser = {
    email: 'guest.account@gmail.com',
    password: 't&ajff!330#cjJ08deRz'
  };

  const buttonSwitch = user => {
    if (user) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.handleFade(props.history, '/checklist')}
          className={`${classes.buttons} ${props.componentStatus}`}>
              View Planner
        </Button>
      );
    } else {
      return (
        <>
          <Grid
            item
            sm
            xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.handleFade(props.history, '/login')}
              className={`${classes.buttons} ${props.componentStatus}`}>
              Log In
            </Button>
          </Grid>
          <Grid
            item
            sm
            xs={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.handleFade(props.history, '/sign-up')}
              className={`${classes.buttons} ${props.componentStatus}`}>
              Sign Up
            </Button>
          </Grid>
          <Grid
            item
            sm
            xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={`${classes.buttons} ${props.componentStatus}`}
              onClick={() => {
                props.loginSubmitHandler(guestUser, props.history);
              }}>
                Try as Guest
            </Button>
          </Grid>
        </>
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        className={classes.mainSection}>
        <Box
          className={`${props.componentStatus} ${classes.contentSection}`}>
          <Box
            my={2}>
            <Typography variant="h1">
            Beacon Daily
            </Typography>
            <Typography variant="h2">
            Your daily planner.
            </Typography>
          </Box>
          <Box
            my={2}>
            <Grid
              spacing={2}
              container>
              {buttonSwitch(props.user)}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
