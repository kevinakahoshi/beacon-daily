import React from 'react';
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
    margin: theme.spacing(2, 0, 0, 0)
  }
}));

const CreateChecklistItem = props => {
  const classes = useStyles();
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
          <FormGroup>
            <FormControl>
              <TextField
                label="Description"
                id="description"
                name="description"
                type="text"
                autoComplete="off"
                variant="outlined"
                inputProps={{
                  maxLength: 50
                }}
                value={description}
                onChange={event => handleChange(event)} />
            </FormControl>
            <Typography>
              {description.length}/50 Characters
            </Typography>
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
};

export default CreateChecklistItem;
