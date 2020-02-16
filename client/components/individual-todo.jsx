import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toDoBox: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

function IndividualTodo(props) {
  const classes = useStyles();
  const completed = props.completed;

  return (
    <Box
      p={2}
      my={2}
      border={1}
      borderColor="grey.500"
      className={`${props.mounting} ${classes.toDoBox}`}>
      <Box>
        <Typography
          variant="h6"
          className={props.classes.noWrap}>
          Description:
        </Typography>
        <Typography
          variant="body1"
          className={props.classes.noWrap}>
          {props.checklistItem.checklistitem}
        </Typography>
      </Box>
      <Box>
        <FormControl variant="outlined"
          // className={classes.formControl}
        >
          <Select
            native
            defaultValue={completed}
            // value={state.age}
            // onChange={handleChange('age')}
            // labelWidth={labelWidth}
            inputProps={{
              name: 'isComplete',
              id: 'is-complete-select'
            }}>
            <option value="incomplete">Incomplete</option>
            <option value="completed">Complete</option>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default IndividualTodo;
