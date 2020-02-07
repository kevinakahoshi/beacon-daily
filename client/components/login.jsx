import React from 'react';
import {
// Link
} from 'react-router-dom';
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  // Select,
  // MenuItem,
  Button,
  FormGroup
} from '@material-ui/core';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const user = { email, password };

  const handleChange = event => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  return (
    <Container size="md"
      className={props.componentStatus}>
      <h1>Select a Profile</h1>
      <form onSubmit={event => props.loginSubmitHandler(event, user, props.history)}>
        <FormGroup>
          <FormControl>
            <InputLabel
              htmlFor="email">
            Email
            </InputLabel>
            <Input
              id="email"
              name="email"
              value={email}
              onChange={event => handleChange(event)} />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <InputLabel
              htmlFor="email">
            Password
            </InputLabel>
            <Input
              id="password"
              name="password"
              value={password}
              onChange={event => handleChange(event)} />
          </FormControl>
        </FormGroup>
        <Button
          variant="contained"
          color="primary"
          type="submit">
            Submit
        </Button>
      </form>
    </Container>
  );
}

export default Login;
