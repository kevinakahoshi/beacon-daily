import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';

function CreateChecklistItem(props) {
  const [description, setDescription] = React.useState('');

  const handleChange = event => {
    setDescription(event.target.value);
  };

  return (
    <Box
      className={props.mounting}>
      <Typography
        variant="h3">
            Create a New Checklist Item
      </Typography>
      <Box
        p={2}>
        <form>
          <FormGroup>
            <FormControl>
              <TextField
                id="description"
                name="description"
                type="text"
                inputProps={{
                  maxLength: 200
                }}
                value={description}
                onChange={() => handleChange(event)} />
            </FormControl>
          </FormGroup>
        </form>
        <Typography>
          {description.length}/200
        </Typography>
      </Box>
    </Box>
  );
}

export default CreateChecklistItem;
