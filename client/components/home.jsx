import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
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
    margin: theme.spacing(2)
  }
}));

function Home(props) {
  const classes = useStyles();

  const buttonSwitch = user => {
    if (user) {
      return (
        <Box
          p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.handleFade(props.history, '/checklist')}
            className={`${classes.buttons} ${props.componentStatus}`}>
              View Planner
          </Button>
        </Box>
      );
    } else {
      return (
        <Box
          p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.handleFade(props.history, '/login')}
            className={`${classes.buttons} ${props.componentStatus}`}>
              Log In
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.handleFade(props.history, '/sign-up')}
            className={`${classes.buttons} ${props.componentStatus}`}>
              Sign Up
          </Button>
        </Box>
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <Box
        className={classes.mainSection}>
        <Box
          className={`${props.componentStatus} ${classes.contentSection}`}>
          <Typography variant="h1">
            Beacon Daily
          </Typography>
          <Typography variant="h2">
            Your daily planner.
          </Typography>
          {buttonSwitch(props.user)}
        </Box>
      </Box>
    </>
  );
}

export default Home;
