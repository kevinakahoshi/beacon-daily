import React from 'react';

function Checklist(props) {
  const checklist = props.checklist.map((checklistItem, index) => {
    return <h3 key={index}>{checklistItem.checklistitem}</h3>;
  });

  return (
    <>
      <h1>This is the checklist.</h1>
      {checklist}
    </>
  );
}

export default Checklist;
