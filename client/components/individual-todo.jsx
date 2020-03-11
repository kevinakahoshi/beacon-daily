import React from 'react';
import Grid from '@material-ui/core/Grid';
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
    width: '100%'
  },
  selectInput: {
    height: '61px',
    textAlign: 'center'
  },
  inputBox: {
    lineHeight: 1.5
  },
  buttonGroupStyling: {
    width: '100%',
    height: '61px'
  },
  editSaveDelete: {
    width: '50%'
  },
  hideButtons: {
    display: 'none'
  },
  dropdownText: {
    display: 'flex'
  },
  dropdownTextSpan: {
    margin: 'auto'
  }
}));

const IndividualTodo = props => {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(props.completed);
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
      setCompleted(event.target.value);
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
      <Grid
        container
        spacing={2}>
        <Grid
          item
          md={7}
          xs={12}>
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
        </Grid>
        <Grid
          item
          md
          sm={6}
          xs={12}>
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
        </Grid>
        <Grid
          item
          md
          sm={6}
          xs={12}>
          <FormControl
            variant="outlined"
            className={classes.selectBox}>
            <Select
              value={completed}
              onChange={event => handleSelectChange(event)}
              className={classes.selectInput}
              inputProps={{
                name: 'isComplete',
                id: 'is-complete-select'
              }}>
              <MenuItem
                className={classes.dropdownText}
                value="incomplete">
                <span
                  className={classes.dropdownTextSpan}>
                  Incomplete
                </span>
              </MenuItem>
              <MenuItem
                className={classes.dropdownText}
                value="completed">
                <span
                  className={classes.dropdownTextSpan}>
                  Complete
                </span>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndividualTodo;
