import React from 'react';
import {
  Container,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button
} from '@material-ui/core';

function SignUp(props) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const newAccount = { firstName, lastName, email, password };

  const handleChange = event => {
    switch (event.target.name) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
    }
  };

  return (
    <Container
      size="md">
      <form
        onSubmit={event => props.createAccountHandler(event, newAccount, props.history)}
        className={props.componentStatus}>
        <FormGroup>
          <FormControl>
            <InputLabel>
            First Name
            </InputLabel>
            <Input
              name="firstName"
              value={firstName}
              onChange={event => handleChange(event)} />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <InputLabel>
              Last Name
            </InputLabel>
            <Input
              name="lastName"
              value={lastName}
              onChange={event => handleChange(event)} />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <InputLabel>
              Email
            </InputLabel>
            <Input
              name="email"
              value={email}
              onChange={event => handleChange(event)} />
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <InputLabel>
              Password
            </InputLabel>
            <Input
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

export default SignUp;
