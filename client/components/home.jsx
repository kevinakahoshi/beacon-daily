import React from 'react';

function Home(props) {
  const handleClick = (event, path) => {
    props.history.push(path);
  };

  return (
    <>
      <h1>Home Screen</h1>
      <button onClick={() => handleClick(event, '/login')}>Log In</button>
      <button onClick={() => handleClick(event, '/checklist')}>Sign Up</button>
    </>
  );
}

export default Home;
