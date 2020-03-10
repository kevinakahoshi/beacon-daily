import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  createBox: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px'
  },
  buttons: {
    width: '100%',
    height: '56px'
  },
  focusColor: {
    color: '#fff!important'
  }
}));

const CreateChecklistItem = props => {
  const classes = useStyles();
  const [editing, setEditing] = React.useState(false);
  const [description, setDescription] = React.useState('');

  const handleChange = event => {
    if (event.target.value[0] !== ' ' && event.target.value.indexOf('  ') === -1) {
      setDescription(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.newItem(description, props.toggleView);
  };

  return (
    <Box>
      <Typography
        variant="h3"
        className={props.mounting}>
          Create a New Checklist Item
      </Typography>
      <Box
        p={2}
        my={2}
        border={1}
        className={`${classes.createBox} ${props.mounting}`}
        borderColor="grey.500">

        <form
          onSubmit={event => handleSubmit(event)}>
          <Grid
            container
            spacing={2}>
            <Grid
              item
              sm={9}
              xs={12}>
              <FormGroup>
                <FormControl>
                  <TextField
                    label={`Description${editing ? ` - ${description.length}/50 Characters` : ''}`}
                    id="description"
                    name="description"
                    type="text"
                    autoComplete="off"
                    variant="outlined"
                    inputProps={{
                      maxLength: 50,
                      color: classes.focusColor
                    }}
                    value={description}
                    onClick={() => setEditing(true)}
                    onBlur={() => setEditing(false)}
                    onChange={event => handleChange(event)} />
                </FormControl>
              </FormGroup>
            </Grid>
            <Grid
              item
              sm={3}
              xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.buttons}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default CreateChecklistItem;
