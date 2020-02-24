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
    margin: theme.spacing(2, 0)
  }
}));

function CreateChecklistItem(props) {
  const classes = useStyles();
  const [description, setDescription] = React.useState('');

  const handleChange = event => {
    setDescription(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.newItem(description, props.toggleView);
  };

  return (
    <Box
      className={props.mounting}>
      <Typography
        variant="h3">
            Create a New Checklist Item
      </Typography>
      <Box
        p={2}
        my={2}
        border={1}
        className={classes.createBox}
        borderColor="grey.500">
        <form
          onSubmit={event => handleSubmit(event)}>
          <FormGroup>
            <Typography
              variant="h6">
                Description:
            </Typography>
            <FormControl>
              <TextField
                id="description"
                name="description"
                type="text"
                autoComplete="off"
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
}

export default CreateChecklistItem;
