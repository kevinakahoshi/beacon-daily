import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
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
  const [componentStatus, setComponentStatus] = React.useState('mounting');

  const buttonSwitch = user => {
    if (user) {
      return (
        <Box
          p={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClick(event, '/checklist')}
            className={classes.buttons}>
              View Checklist
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
            onClick={() => handleClick(event, '/login')}
            className={classes.buttons}>
              Log In
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttons}
            onClick={() => handleClick(event, '/sign-up')}>
              Sign Up
          </Button>
        </Box>
      );
    }
  };

  const handleClick = (event, path) => {
    setComponentStatus('unmounting');
    setTimeout(() => {
      props.history.push(path);
    }, 1000);
  };

  return (
    <Box
      className={classes.mainSection}>
      <Box
        className={`${componentStatus} ${classes.contentSection}`}>
        <Typography variant="h1">
            Beacon Daily
        </Typography>
        <Typography variant="h2">
            Your daily planner.
        </Typography>
        {buttonSwitch(props.user)}
      </Box>
    </Box>
  );
}

export default Home;
