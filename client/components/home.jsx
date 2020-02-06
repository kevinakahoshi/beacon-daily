import React from 'react';
import {
  Container,
  Box,
  Button
} from '@material-ui/core';

function Home(props) {
  const handleClick = (event, path) => {
    props.history.push(path);
  };

  return (
    <Container
      maxWidth="md">
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
