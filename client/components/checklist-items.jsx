import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function ChecklistItems(props) {
  let checklistItems =
    <Box
      p={2}
      my={2}
      border={1}
      borderColor="grey.500"
      className={props.mounting}>
      <Typography
        className={props.classes.noWrap}>
        You have no to-do items!
      </Typography>
    </Box>;

  if (props.checklist.length) {
    if (props.view === 'completed') {
      checklistItems = props.checklist.map((checklistItem, index) => {
        if (checklistItem.iscompleted) {
          return (
            <Box
              p={2}
              my={2}
              border={1}
              borderColor="grey.500"
              key={index}
              className={props.mounting}>
              <Typography
                className={props.classes.noWrap}>
                {checklistItem.checklistitem}
              </Typography>
            </Box>
          );
        }
      });
    } else {
      checklistItems = props.checklist.map((checklistItem, index) => {
        if (!checklistItem.iscompleted) {
          return (
            <Box
              p={2}
              my={2}
              border={1}
              borderColor="grey.500"
              key={index}
              className={props.mounting}>
              <Typography
                className={props.classes.noWrap}>
                {checklistItem.checklistitem}
              </Typography>
            </Box>
          );
        }
      });
    }
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
