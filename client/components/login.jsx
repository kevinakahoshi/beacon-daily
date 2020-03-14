import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ModalOverlay from './modal-overlay';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  mainSection: {
    display: 'flex',
    height: '100%'
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
  backgroundColor: {
    background: theme.palette.background.paper
  },
  buttons: {
    width: '100%',
    height: '56px'
  },
  backWrapper: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: theme.zIndex.appBar
  }
}));

const Login = props => {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [emailValidation, setEmailValidation] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const user = { email, password };

  const handleChange = event => {
    if (event.target.value.indexOf(' ') === -1) {
      if (event.target.name === 'email') {
        if (!props.emailCheck.test(event.target.value) && email.length > 0) {
          setEmailValidation(true);
        } else {
          setEmailValidation(false);
        }
        setEmail(event.target.value);
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
        height="100%"
        className={classes.mainSection}>
        <Button
          m={2}
          className={`${classes.backWrapper} ${props.componentStatus}`}
          onClick={() => props.handleFade(props.history, '/')}>
          <ChevronLeftOutlinedIcon />Back
        </Button>
        <Container
          maxWidth="md"
          fixed
          className={`${props.componentStatus} ${classes.contentSection}`}>
          <Typography
            variant="h3">
              Log In to Your Acount
          </Typography>
          <Box
            className={classes.formBox}>
            <Grid
              container
              spacing={2}>
              <Grid
                item
                md={8}
                xs={12}>
                <form
                  onSubmit={event => {
                    event.preventDefault();
                    if (!emailValidation && password.length) {
                      props.loginSubmitHandler(user, props.history);
                    }
                  }}
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
                        error={!props.emailCheck.test(email) && email.length > 0}
                        className={classes.backgroundColor}
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
                        className={classes.backgroundColor}
                        onChange={event => handleChange(event)} />
                    </FormControl>
                  </FormGroup>
                  <Box
                    mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!email || !password}
                      className={classes.buttons}>
                      Submit
                    </Button>
                  </Box>
                </form>
              </Grid>
              <Grid
                item
                md={4}
                xs={12}>
                <Box
                  p={2}
                  border={1}
                  borderRadius={4}
                  borderColor="grey.400"
                  className={`${classes.backgroundColor} ${props.componentStatus}`}>
                  <Typography
                    variant="h6">
                    Don&#39;t have an account?
                  </Typography>
                  <Typography>
                    <Link
                      href=""
                      variant="body1"
                      onClick={event => {
                        event.preventDefault();
                        props.handleFade(props.history, '/sign-up');
                      }}>Create an Account</Link>
                  </Typography>
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

export default Login;
