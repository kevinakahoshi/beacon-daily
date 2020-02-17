import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  toDoBox: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },
  dropdown: {
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(2, 0, 0, 0)
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0, 2)
    }
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
      <Box
        className={classes.dropdown}>
        <FormControl variant="outlined">
          <Select
            defaultValue={completed}
            onChange={() => props.toggleComplete(props.checklistItem.checklistitemid)}
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
