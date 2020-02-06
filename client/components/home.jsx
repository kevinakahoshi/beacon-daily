import React from 'react';
import {
  Container,
  Button
} from '@material-ui/core';

function Home(props) {
  const handleClick = (event, path) => {
    props.history.push(path);
  };

  return (
    <Container maxWidth="md"
      height="100%">
      <h1>Home Screen</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick(event, '/login')}>Log In</Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClick(event, '/checklist')}>Sign Up</Button>
    </Container>
  );
}

export default Home;
