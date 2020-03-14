import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IndividualTodo from './individual-todo';

function ChecklistItems(props) {
  let checklistItems =
    <Box
      my={2}>
      <Typography
        variant="h6"
        className={props.mounting}>
        Nothing new here.
      </Typography>
    </Box>;

  if (props.checklist.length) {
    checklistItems = props.checklist.map((checklistItem, index) => {
      return (
        <IndividualTodo
          key={checklistItem.checklistitemid}
          id={checklistItem.checklistitemid}
          completed={props.view}
          classes={props.classes}
          handleModalOpen={props.handleModalOpen}
          setModalMessage={props.setModalMessage}
          updateChecklistItem={props.updateChecklistItem}
          toggleComplete={props.toggleComplete}
          deleteChecklistItem={props.deleteChecklistItem}
          checklistItem={checklistItem}
          handleDeleteClick={props.handleDeleteClick}
          mounting={props.mounting} />
      );
    });
  }

  return (
    <>
      <Typography
        variant="h3"
        className={props.mounting}>
        {props.view === 'completed'
          ? 'Completed'
          : 'Incomplete'} Items
      </Typography>
      {checklistItems}
    </>
  );
}

export default ChecklistItems;
