import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
// import InputLabel from '@material-ui/core/InputLabel';
// import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ModalOverlay from './modal-overlay';

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

function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [emailValidation, setEmailValidation] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const user = { email, password };

  const handleChange = event => {
    const emailRegEx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (event.target.value.indexOf(' ') === -1) {
      if (event.target.name === 'email') {
        setEmail(event.target.value);
        if (!emailRegEx.test(event.target.value) && email.length > 0) {
          setEmailValidation(true);
        } else {
          setEmailValidation(false);
        }
      } else {
        setPassword(event.target.value);
      }
    }
  };

  React.useEffect(() => {
    if (!email.length) {
      setEmailValidation(false);
    }
  }, [email]);

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
          <ChevronLeftOutlinedIcon />Back
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
              Log In to Your Acount
            </Typography>
            <Box
              className={classes.formBox}>
              <form
                onSubmit={event => props.loginSubmitHandler(event, user, props.history)}
                className={props.componentStatus}>
                <FormGroup>
                  <FormControl
                    className={classes.formControlBox}>
                    <TextField
                      label="Email"
                      id="email"
                      name="email"
                      autoComplete="off"
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
                      autoComplete="off"
                      variant="outlined"
                      value={password}
                      className={classes.formInputs}
                      onChange={event => handleChange(event)} />
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormControl>
                    {/* <InputLabel
                      htmlFor="email">
                    Password
                    </InputLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={event => handleChange(event)} /> */}
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
        {props.modalOpen
          ? <ModalOverlay
            modalOpen={props.modalOpen}
            handleModalClose={props.handleModalClose}
            modalMessage={props.modalMessage} />
          : null}
      </Box>
    </>
  );
}

export default Login;
