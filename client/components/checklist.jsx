import React from 'react';

function Checklist(props) {
  let checklist = 'You have no checklist items';

  if (props.checklist.length) {
    checklist = props.checklist.map((checklistItem, index) => {
      return <h3 key={index}>{checklistItem.checklistitem}</h3>;
    });
  }

  return (
    <div className={props.componentStatus}>
      <h1>This is the checklist.</h1>
      {checklist}
    </div>
  );
}

export default Checklist;
