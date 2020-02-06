import React from 'react';
import {
// Link
} from 'react-router-dom';
import {
  Container,
  FormControl,
  InputLabel,
  // Input,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';

function Login(props) {
  const [name, setName] = React.useState('');

  const handleChange = event => {
    setName(event.target.value);
  };

  return (
    <Container size="md">
      <h1>Select a Profile</h1>
      <form onSubmit={event => props.loginSubmitHandler(event)}>
        <FormControl>
          <InputLabel
            htmlFor="name">
            Name
          </InputLabel>
          <Select
            id="name"
            aria-describedby="name"
            value={name}
            onChange={event => handleChange(event)}>
            <MenuItem
              value="Kevin">
              Kevin
            </MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default Login;
