import React from 'react';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
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
    borderRadius: '4px',
    backgroundColor: theme.palette.background.paper
  },
  dropdown: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 0, 0, 2),
      display: 'flex'
    }
  },
  selectBox: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2)
    },
    width: '100%'
  },
  selectInput: {
    height: '61px'
  },
  inputBox: {
    lineHeight: 1.5
  },
  buttonGroupStyling: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 0, 0, 0)
    },
    width: '100%',
    height: '61px'
  },
  editSaveDelete: {
    [theme.breakpoints.down('sm')]: {
      width: '50%'
    }
  },
  hideButtons: {
    display: 'none'
  }
}));

const IndividualTodo = props => {
  const classes = useStyles();
  const completed = props.completed;
  const [unmounting, setUnmounting] = React.useState('mounting');
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
      setUnmounting('unmounting');
      setTimeout(() => {
        props.toggleComplete(props.checklistItem.checklistitemid);
      }, 1000);
    }
  };

  return (
    <Box
      p={2}
      my={2}
      border={1}
      borderColor="grey.500"
      className={`${props.mounting} ${unmounting} ${classes.toDoBox}`}>
      <Box
        width="100%"
        className={classes.toDoBox}>
        <FormControl
          fullWidth>
          <TextField
            name="description"
            type="text"
            autoComplete="off"
            multiline
            inputProps={{
              maxLength: 50,
              readOnly: !editing,
              className: classes.inputBox
            }}
            label={`Description${editing && descriptionValue.length >= 0
              ? ' - ' + descriptionValue.length + '/50 Characters'
              : ''}`}
            value={descriptionValue}
            error={descriptionValue.length === 0}
            variant="outlined"
            onChange={event => handleDescriptionChange(event)} />
        </FormControl>
      </Box>
      <Box
        className={classes.dropdown}>
        <Box
          // className={`${completed === 'completed'
          // ? classes.hideButtons
          // : classes.toDoBox}`}
        >
          <ButtonGroup
            variant="outlined"
            className={classes.buttonGroupStyling}
            size="large">
            {editing
              ? <Button
                className={classes.editSaveDelete}
                onClick={() => handleSave()} >
                <DoneIcon />
              </Button>
              : <Button
                className={classes.editSaveDelete}
                onClick={() => handleEditing()} >
                <EditIcon />
              </Button>
            }
            <Button
              className={classes.editSaveDelete}
              onClick={() => props.handleDeleteClick(props.id)} >
              <DeleteForeverIcon />
            </Button>
          </ButtonGroup>
        </Box>
        <FormControl
          variant="outlined"
          className={classes.selectBox}>
          <Select
            defaultValue={completed}
            onChange={event => handleSelectChange(event)}
            className={classes.selectInput}
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
};

export default IndividualTodo;
