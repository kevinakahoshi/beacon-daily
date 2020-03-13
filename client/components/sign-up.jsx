import React from 'react';
import ModalOverlay from './modal-overlay';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import Grid from '@material-ui/core/Grid';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';

const useStyles = makeStyles(theme => ({
  mainSection: {
    display: 'flex',
    height: '100%'
  },
  contentSection: {
    margin: theme.spacing(12, 0, 0, 0),
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
    width: '100%',
    height: '56px'
  },
  backWrapper: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2)
  },
  displayNone: {
    display: 'none'
  },
  requirementsBox: {
    background: theme.palette.background.paper
  },
  textBoxes: {
    display: 'flex',
    margin: theme.spacing(1, 0)
  },
  checkboxes: {
    marginRight: theme.spacing(1)
  }
}));

const SignUp = props => {
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState('');
  const [firstNameValidation, setFirstNameValidation] = React.useState(false);
  const [lastName, setLastName] = React.useState('');
  const [lastNameValidation, setLastNameValidation] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [emailValidation, setEmailValidation] = React.useState(false);
  const [firstPassword, setFirstPassword] = React.useState('');
  const [firstPasswordValidation, setFirstPasswordValidation] = React.useState(false);
  const [secondPassword, setSecondPassword] = React.useState('');
  const [secondPasswordValidation, setSecondPasswordValidation] = React.useState(false);
  const [clickedPassword, setClickedPassword] = React.useState(false);
  const [reqClass, setReqClass] = React.useState('');
  const passwordRegEx = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
  const newAccount = { firstName, lastName, email, firstPassword, secondPassword };

  const toggleReqs = show => {
    if (show) {
      setClickedPassword(true);
      setReqClass('mounting');
    } else {
      setReqClass('unmounting');
      setTimeout(() => {
        setClickedPassword(false);
        setReqClass('');
      }, 1000);
    }
  };

  const handleChange = event => {
    const nameField = event.target.name === 'firstName'
      ? setFirstName
      : setLastName;
    const nameValidation = event.target.name === 'firstName'
      ? setFirstNameValidation
      : setLastNameValidation;
    const passwordField = event.target.name === 'firstPassword'
      ? setFirstPassword
      : setSecondPassword;
    const passwordValidation = event.target.name === 'firstPassword'
      ? setFirstPasswordValidation
      : setSecondPasswordValidation;
    if (event.target.value[0] !== ' ' || event.target.value[0] !== '-') {
      switch (event.target.name) {
        case 'firstName':
        case 'lastName':
          if (event.target.value.indexOf('  ') === -1 && event.target.value.indexOf('--') === -1) {
            if (!props.nameCheck.test(event.target.value) && event.target.value.length > 0) {
              nameValidation(true);
            } else {
              nameValidation(false);
            }
            nameField(event.target.value);
          }
          break;
        case 'email':
          if (event.target.value.indexOf(' ') === -1) {
            if (!props.emailCheck.test(event.target.value) && email.length > 0) {
              setEmailValidation(true);
            } else {
              setEmailValidation(false);
            }
            setEmail(event.target.value);
          }
          break;
        case 'firstPassword':
        case 'secondPassword':
          if (event.target.value.indexOf(' ') === -1) {
            if (!passwordRegEx.test(event.target.value) && event.target.value.length > 0) {
              passwordValidation(true);
            } else {
              passwordValidation(false);
            }
            passwordField(event.target.value);
          }
          break;
      }
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

    if (!firstPassword.length) {
      setFirstPasswordValidation(false);
    }

    if (!secondPassword.length) {
      setSecondPasswordValidation(false);
    }
  }, [firstName, lastName, email, firstPassword, secondPassword]);

  return (
    <>
      <CssBaseline />
      <Box
        height="100%"
        className={classes.mainSection}>
        <Button
          m={2}
          className={`${classes.backWrapper} ${props.componentStatus}`}
          onClick={() => props.handleFade(props.history, '/')}>
          <ChevronLeftOutlinedIcon />BACK
        </Button>
        <Container
          maxWidth='md'
          overflow="auto"
          className={`${props.componentStatus} ${classes.contentSection}`}>
          <Typography
            variant="h3">
              Create an Account
          </Typography>
          <Box
            className={classes.formBox}>
            <Grid
              container
              spacing={2}>
              <Grid
                item
                sm={8}
                xs={12}>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    if (!firstNameValidation &&
                    !lastNameValidation &&
                    !emailValidation &&
                    !firstPasswordValidation &&
                    !secondPasswordValidation) {
                      props.createAccountHandler(newAccount, props.history);
                    }
                  }}
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
                        error={!props.nameCheck.test(firstName) &&
                        firstName.length > 0}
                        className={classes.formInputs}
                        onChange={event => handleChange(event)} />
                    </FormControl>
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
                        error={!props.nameCheck.test(lastName) &&
                        lastName.length > 0}
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
                        error={!props.emailCheck.test(email) &&
                        email.length > 0}
                        className={classes.formInputs}
                        onChange={event => handleChange(event)} />
                    </FormControl>
                    <FormControl
                      className={classes.formControlBox}>
                      <TextField
                        label="Password"
                        id="first-password"
                        name="firstPassword"
                        type="password"
                        autoComplete="new-password"
                        variant="outlined"
                        value={firstPassword}
                        error={!passwordRegEx.test(firstPassword) &&
                        firstPassword.length > 0}
                        className={classes.formInputs}
                        onFocus={() => toggleReqs(true)}
                        onBlur={() => toggleReqs(false)}
                        onChange={event => handleChange(event)} />
                    </FormControl>
                    <FormControl>
                      <TextField
                        label="Re-Enter Password"
                        id="second-password"
                        name="secondPassword"
                        type="password"
                        autoComplete="new-password"
                        variant="outlined"
                        value={secondPassword}
                        error={!passwordRegEx.test(secondPassword) &&
                        secondPassword.length > 0}
                        className={classes.formInputs}
                        onChange={event => handleChange(event)} />
                    </FormControl>
                  </FormGroup>
                  <Box
                    my={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!firstName ||
                      !lastName ||
                      !email ||
                      !firstPassword ||
                      !secondPassword}
                      className={classes.buttons}>
                    Submit
                    </Button>
                  </Box>
                </form>
              </Grid>
              <Grid
                item
                className={clickedPassword
                  ? null
                  : classes.displayNone}
                sm={4}>
                <Box
                  p={2}
                  border={1}
                  borderRadius={4}
                  borderColor="grey.500"
                  className={`${classes.requirementsBox} ${reqClass}`}>
                  <Typography
                    variant="h6">
                      Requirements:
                  </Typography>
                  <Box
                    className={classes.textBoxes}>
                    {firstPassword.length >= 8
                      ? <CheckBoxOutlinedIcon
                        className={classes.checkboxes} />
                      : <CheckBoxOutlineBlankOutlinedIcon
                        className={classes.checkboxes} />}
                    <Typography>
                    8+ Characters
                    </Typography>
                  </Box>
                  <Box
                    className={classes.textBoxes}>
                    {/[A-Za-z]/.test(firstPassword)
                      ? <CheckBoxOutlinedIcon
                        className={classes.checkboxes} />
                      : <CheckBoxOutlineBlankOutlinedIcon
                        className={classes.checkboxes} />}
                    <Typography>
                    1+ Letter
                    </Typography>
                  </Box>
                  <Box
                    className={classes.textBoxes}>
                    {/[0-9]/.test(firstPassword)
                      ? <CheckBoxOutlinedIcon
                        className={classes.checkboxes} />
                      : <CheckBoxOutlineBlankOutlinedIcon
                        className={classes.checkboxes} />}
                    <Typography>
                    1+ Number
                    </Typography>
                  </Box>
                  <Box
                    className={classes.textBoxes}>
                    {/[@$!%*#?&]/.test(firstPassword)
                      ? <CheckBoxOutlinedIcon
                        className={classes.checkboxes} />
                      : <CheckBoxOutlineBlankOutlinedIcon
                        className={classes.checkboxes} />}
                    <Typography>
                    1+ Special Caracter
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
        {props.modalOpen
          ? <ModalOverlay
            modalOpen={props.modalOpen}
            handleModalClose={props.handleModalClose}
            modalMessage={props.modalMessage} />
          : null}
      </Box>
    </>
  );
};

export default SignUp;
