import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';

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
  },
  inputBox: {
    display: 'flex'
  },
  editSaveStyling: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2)
    },
    padding: theme.spacing(1)
  },
  hideButtons: {
    display: 'none'
  }
}));

function IndividualTodo(props) {
  const [editing, setEditing] = React.useState(false);
  const [value, setValue] = React.useState(props.checklistItem.checklistitem);
  const completed = props.completed;
  const classes = useStyles();

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    if (value.length) {
      props.updateChecklistItem(value, props.checklistItem.checklistitemid);
      handleEditing();
    }
  };

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <Box
      p={2}
      my={2}
      border={1}
      borderColor="grey.500"
      className={`${props.mounting} ${classes.toDoBox}`}>
      <Box
        width="100%"
        className={classes.toDoBox}>
        <FormControl
          fullWidth>
          <TextField
            name="description"
            type="text"
            autoComplete="off"
            inputProps={{
              maxLength: 100,
              readOnly: !editing
            }}
            label={`Description${editing && value.length > 0 ? ' ' + value.length + '/100' : ''}`}
            value={value}
            variant="outlined"
            onChange={event => handleChange(event)} />
        </FormControl>
        <Box
          className={`${completed === 'completed' ? classes.hideButtons : classes.toDoBox}`}>
          {editing
            ? <Button
              variant="outlined"
              className={classes.editSaveStyling}
              onClick={() => handleSave()} >
              <DoneIcon />
            </Button>
            : <Button
              variant="outlined"
              className={classes.editSaveStyling}
              onClick={() => handleEditing()} >
              <EditIcon />
            </Button>
          }
        </Box>
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
