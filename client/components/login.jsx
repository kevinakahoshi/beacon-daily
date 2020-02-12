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
      height="100%"
      className={classes.mainSection}>
      <Button
        className={`${classes.backWrapper} ${props.componentStatus}`}
        onClick={() => props.handleFade(props.history, '/')}>
        <ChevronLeftOutlinedIcon />BACK
      </Button>
      <Box className={`${props.componentStatus} ${classes.contentSection}`}>
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
          <form
            onSubmit={event => props.loginSubmitHandler(event, user, props.history)}
            className={props.componentStatus}>
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
              type="submit"
              className={classes.buttons}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>
      {props.modalOpen
        ? <ModalOverlay
          modalOpen={props.modalOpen}
          handleModalClose={props.handleModalClose}
          modalMessage={props.modalMessage} />
        : null}
    </Box>
  );
}

export default Login;
