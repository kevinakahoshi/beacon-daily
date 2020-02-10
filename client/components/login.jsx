import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Input,
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
    <Box
      p={2}
      height="100%">
      <Box
        p={2}
        border={1}
        borderRadius={5}
        borderColor="grey.500"
        className={props.componentStatus}>
        <h1>Log In to Your Account</h1>
        <form
          onSubmit={event => props.loginSubmitHandler(event, user, props.history)}>
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
          <Box
            my={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
