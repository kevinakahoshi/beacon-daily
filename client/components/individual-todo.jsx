import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({
  toDoBox: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    borderRadius: '4px'
  },
  dropdown: {
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(2, 0, 0, 0)
    },
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0, 2)
    },
    display: 'flex'
  },
  select: {
    width: 'fit-content'
  },
  inputBox: {
    display: 'flex'
  },
  editSaveStyling: {
    marginRight: theme.spacing(2),
    height: '100%'
  },
  hideButtons: {
    display: 'none'
  }
}));

function IndividualTodo(props) {
  const classes = useStyles();
  const completed = props.completed;
  const [editing, setEditing] = React.useState(false);
  const [descriptionValue, setDescriptionValue] = React.useState(props.checklistItem.checklistitem);

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleSave = () => {
    if (descriptionValue.length) {
      props.updateChecklistItem(descriptionValue, props.checklistItem.checklistitemid);
      handleEditing();
    }
  };

  const handleDescriptionChange = event => {
    setDescriptionValue(event.target.value);
  };

  const handleSelectChange = event => {
    if (event.target.value !== completed) {
      props.toggleComplete(props.checklistItem.checklistitemid);
    }
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
              maxLength: 50,
              readOnly: !editing
            }}
            label={`Description${editing && descriptionValue.length > 0 ? ' - ' + descriptionValue.length + '/50 Characters' : ''}`}
            value={descriptionValue}
            variant="outlined"
            onChange={event => handleDescriptionChange(event)} />
        </FormControl>
      </Box>
      <Box
        className={classes.dropdown}>
        <Box
          className={`${completed === 'completed' ? classes.hideButtons : classes.toDoBox}`}>
          <ButtonGroup
            variant="outlined"
            className={classes.editSaveStyling}
            size="large">
            {editing
              ? <Button
                onClick={() => handleSave()} >
                <DoneIcon />
              </Button>
              : <Button
                onClick={() => handleEditing()} >
                <EditIcon />
              </Button>
            }
            <Button
              onClick={() => props.handleDeleteClick(props.id)} >
              <DeleteForeverIcon />
            </Button>
          </ButtonGroup>
        </Box>
        <FormControl variant="outlined">
          <Select
            defaultValue={completed}
            onChange={event => handleSelectChange(event)}
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
