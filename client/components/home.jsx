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
    color: '#ffffff'
  },
  buttons: {
    margin: theme.spacing(2)
  }
}));

function Home(props) {
  const classes = useStyles();
  const [componentStatus, setComponentStatus] = React.useState('mounting');

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
        <Box
          p={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => handleClick(event, '/login')}
            className={classes.buttons}>
              Log In
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.buttons}
            onClick={() => handleClick(event, '/sign-up')}>
              Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
