import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  toDoBox: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  dropdown: {
    marginLeft: theme.spacing(2)
  },
  select: {
    width: 'fit-content'
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
          className={classes.dropdown}>
          <Select
            defaultValue={completed}
            // value={state.age}
            onChange={() => props.toggleComplete(props.checklistItem.checklistitemid)}
            // labelWidth={labelWidth}
            inputProps={{
              name: 'isComplete',
              id: 'is-complete-select'
            }}>
            <MenuItem
              value="incomplete">
                Incomplete
            </MenuItem>
            <MenuItem
              value="completed">
                Complete
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default IndividualTodo;
