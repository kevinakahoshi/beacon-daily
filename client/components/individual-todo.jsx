import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function IndividualTodo(props) {
  return (
    <Box
      p={2}
      my={2}
      border={1}
      borderColor="grey.500"
      className={props.mounting}>
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
  );
}

export default IndividualTodo;
