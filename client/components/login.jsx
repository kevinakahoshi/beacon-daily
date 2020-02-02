import React from 'react';

function Login(props) {

  const handleClick = event => {
    props.history.push('/checklist');
  };

  return (
    <>
      <h1>This is the login page.</h1>
      <button onClick={handleClick}>Click me.</button>
    </>
  );
}

export default Login;
