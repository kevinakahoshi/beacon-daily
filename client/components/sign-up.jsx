import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
  formControlBox: {
    margin: theme.spacing(0, 0, 2, 0)
  },
  formBox: {
    margin: theme.spacing(2, 0)
  },
  formInputs: {
    background: theme.palette.background.paper
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
  const [firstNameValidation, setFirstNameValidation] = React.useState(false);
  const [lastName, setLastName] = React.useState('');
  const [lastNameValidation, setLastNameValidation] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailValidation, setEmailValidation] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const newAccount = { firstName, lastName, email, password };

  const handleChange = event => {
    const nameRegEx = new RegExp(/^[a-zA-Z ]+$/);
    const emailRegEx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    switch (event.target.name) {
      case 'firstName':
        if (event.target.value.indexOf('  ') === -1) {
          setFirstName(event.target.value);
          if (!nameRegEx.test(event.target.value) && firstName.length > 0) {
            setFirstNameValidation(true);
          } else {
            setFirstNameValidation(false);
          }
        }
        break;
      case 'lastName':
        if (event.target.value.indexOf('  ') === -1) {
          setLastName(event.target.value);
          if (!nameRegEx.test(event.target.value) && lastName.length > 0) {
            setLastNameValidation(true);
          } else {
            setLastNameValidation(false);
          }
        }
        break;
      case 'email':
        if (event.target.value.indexOf(' ') === -1) {
          setEmail(event.target.value);
          if (!emailRegEx.test(event.target.value) && email.length > 0) {
            setEmailValidation(true);
          } else {
            setEmailValidation(false);
          }
        }
        break;
      case 'password':
        if (event.target.value.indexOf(' ') === -1) {
          setPassword(event.target.value);
        }
        break;
    }
  };

  React.useEffect(() => {
    if (!firstName.length) {
      setFirstNameValidation(false);
    }

    if (!lastName.length) {
      setLastNameValidation(false);
    }

    if (!email.length) {
      setEmailValidation(false);
    }
  }, [firstName, lastName, email]);

  return (
    <>
      <CssBaseline />
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
          <Box
            p={2}
            borderColor="grey.500">
            <Typography
              variant="h6">
                Create an Account
            </Typography>
            <Box
              className={classes.formBox}>
              <form
                onSubmit={event => props.createAccountHandler(event, newAccount, props.history)}
                className={props.componentStatus}>
                <FormGroup>
                  <FormControl
                    className={classes.formControlBox}>
                    <TextField
                      label="First Name"
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="off"
                      variant="outlined"
                      value={firstName}
                      error={firstNameValidation}
                      className={classes.formInputs}
                      onChange={event => handleChange(event)} />
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormControl
                    className={classes.formControlBox}>
                    <TextField
                      label="Last Name"
                      id="last-name"
                      name="lastName"
                      type="text"
                      autoComplete="new-password"
                      variant="outlined"
                      value={lastName}
                      error={lastNameValidation}
                      className={classes.formInputs}
                      onChange={event => handleChange(event)} />
                  </FormControl>
                  <FormControl
                    className={classes.formControlBox}>
                    <TextField
                      label="Email"
                      id="email"
                      name="email"
                      autoComplete="new-password"
                      variant="outlined"
                      value={email}
                      error={emailValidation}
                      className={classes.formInputs}
                      onChange={event => handleChange(event)} />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="Password"
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      variant="outlined"
                      value={password}
                      className={classes.formInputs}
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
        </Box>
      </Box>
    </>
  );
}

export default SignUp;
