import React from 'react';
import {
  Grid,
  // Container,
  Box,
  Button
} from '@material-ui/core';

function Home(props) {
  const [componentStatus, setComponentStatus] = React.useState('mounting');

  const handleClick = (event, path) => {
    setComponentStatus('unmounting');
    setTimeout(() => {
      props.history.push(path);
    }, 1000);
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={componentStatus}>
      <Box
        justifyContent="center"
        height="100%">
        <h1>Beacon Daily</h1>
        <h2>Your daily planner.</h2>
        <Button
          variant="contained"
          color="primary"
          m={2}
          onClick={() => handleClick(event, '/login')}>
            Log In
        </Button>
        <Button
          variant="contained"
          color="primary"
          m={2}
          onClick={() => handleClick(event, '/sign-up')}>
            Sign Up
        </Button>
      </Box>
    </Grid>
  );
}

export default Home;
