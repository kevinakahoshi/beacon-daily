import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';

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
  },
  backWrapper: {
    display: 'flex',
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2)
  }
}));

function SignUp(props) {
  const classes = useStyles();
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
    <Box
      p={2}
      height="100%"
      className={classes.mainSection}>
      <Button
        className={`${classes.backWrapper} ${props.componentStatus}`}
        onClick={() => props.handleFade(props.history, '/')}>
        <ChevronLeftOutlinedIcon />BACK
      </Button>
      <Box
        className={`${props.componentStatus} ${classes.contentSection}`}>
        <Typography
          variant="h1">
            Beacon Daily
        </Typography>
        <Typography
          variant="h6">
            Create an Account
        </Typography>
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
            type="submit"
            className={classes.buttons}>
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default SignUp;
