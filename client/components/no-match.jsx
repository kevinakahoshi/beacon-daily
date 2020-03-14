import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

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
    width: '100%',
    height: '56px'
  }
}));

const NoMatch = props => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="md"
        className={classes.mainSection}>
        <Box
          className={`${props.componentStatus} ${classes.contentSection} mounting`}>
          <Box
            my={2}>
            <Box
              mb={2}>
              <Typography
                variant="h1">
              404
              </Typography>
            </Box>
            <Box
              mb={2}>
              <Typography
                variant="h2">
              Something went wrong.
              </Typography>
            </Box>
            <Box
              mb={2}>
              <Typography>
              How did you end up here?!  Click the button below to go back to the home page.
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}>
              <Hidden
                xsDown>
                <Grid
                  item
                  xs={4} />
              </Hidden>
              <Grid
                item
                sm={4}
                xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={event => {
                    event.preventDefault();
                    props.handleFade(props.history, '/');
                  }}>
                  Home
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default NoMatch;
