import React from 'react';
import {
  Container,
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
    <Container
      maxWidth="md"
      className={componentStatus}>
      <Box justifyContent="center">
        <h1>Home Screen</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick(event, '/login')}>
            Log In
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick(event, '/checklist')}>
            Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
