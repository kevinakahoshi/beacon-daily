import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './sign-up';
import Checklist from './checklist';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const App = () => {
  const [user, setUser] = React.useState(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const [checklist, setChecklist] = React.useState([]);
  const [modalMessage, setModalMessage] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [fetchedUser, setFetchedUser] = React.useState(false);
  const [colorMode, setColorMode] = React.useState('light');
  const [componentStatus, setComponentStatus] = React.useState('mounting');
  const nameRegEx = new RegExp(/^[a-zA-Z -]+$/);
  const emailRegEx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light'
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundImage: "linear-gradient(#fffffff1, #fffffff1), url('./images/light-mode-background.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }
        }
      }
    }
  });

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark'
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundImage: "linear-gradient(#000000CC, #000000CC), url('./images/dark-mode-background.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }
        }
      },
      MuiFormLabel: {
        root: {
          '&$focused': {
            color: '#ffffff'
          }
        }
      },
      MuiTextField: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff'
            },
            '&.Mui-error.Mui-focused fieldset': {
              borderColor: '#f44336'
            }
          }
        }
      }
    }
  });

  const createAccountHandler = (newAccount, historyProps) => {
    if (newAccount.firstName &&
      newAccount.lastName &&
      newAccount.email &&
      newAccount.firstPassword &&
      newAccount.secondPassword &&
      newAccount.firstPassword === newAccount.secondPassword) {
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: newAccount.firstName.trim(),
          lastName: newAccount.lastName.trim(),
          email: newAccount.email.toLowerCase(),
          password: newAccount.firstPassword.trim()
        })
      };

      fetch('/api/user/create-an-account', init)
        .then(response => response.json())
        .then(user => {
          setUser(user);
          setSignedIn(true);
          setComponentStatus('unmounting');
          setTimeout(() => {
            historyProps.push('/login');
            setComponentStatus('mounting');
          }, 1000);
        })
        .catch(error => console.error(error));
    } else {
      setModalMessage({
        heading: 'Whoops',
        messageBody: 'Your passwords did not match.  Re-enter your passwords and try again.'
      });
      handleModalOpen();
    }
  };

  const loginSubmitHandler = (user, historyProps) => {
    if (user.email && user.password) {
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email.toLowerCase(),
          password: user.password
        })
      };

      fetch('/api/user/login', init)
        .then(response => response.json())
        .then(user => {
          if (!user.error) {
            setComponentStatus('unmounting');
            setModalMessage(null);
            setTimeout(() => {
              historyProps.push('/checklist');
              setUser(user);
              getChecklistItems(user.userid);
              setComponentStatus('mounting');
              setSignedIn(true);
            }, 1000);
          } else {
            setModalMessage({
              heading: 'Invalid Email or Password',
              messageBody: 'Either your email address or password were not correct.  Please update those fields and try again.'
            });
            handleModalOpen();
          }
        })
        .catch(error => console.error(error));
    }
  };

  const logoutUser = historyProps => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('/api/user/logout', init)
      .then(response => response.json())
      .then(user => {
        setSignedIn(false);
        setUser(null);
        setComponentStatus('unmounting');
        setTimeout(() => {
          historyProps.push('/');
          setComponentStatus('mounting');
        }, 1000);
      })
      .catch(error => console.error(error));
  };

  const getUser = () => {
    fetch('/api/user/get-user')
      .then(response => response.json())
      .then(user => {
        setFetchedUser(true);
        setUser(user);
        if (user) {
          getChecklistItems(user.userid);
        }
      })
      .catch(error => console.error(error));
  };

  const getChecklistItems = id => {
    fetch(`/api/checklist/get-checklist/${id}`)
      .then(response => response.json())
      .then(checklist => setChecklist(checklist))
      .catch(error => console.error(error));
  };

  const createChecklistItem = (checklistItem, toggleView) => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        checklistItem: checklistItem,
        userId: user.userid
      })
    };

    fetch('/api/checklist/create-checklist-item', init)
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          toggleView('incomplete');
        } else {
          setModalMessage({
            heading: 'An unexpected error occurred',
            messageBody: 'Invalid characters in your checklist item'
          });
          handleModalOpen();
        }
      })
      .catch(error => console.error(error));
  };

  const updateChecklistItem = (updatedChecklistItem, checklistItemId) => {
    const init = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updatedChecklistItem, checklistItemId })
    };

    fetch('/api/checklist/update-checklist-item', init)
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error));
  };

  const toggleComplete = checklistItemId => {
    const init = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checklistItemId })
    };

    fetch('/api/checklist/toggle-complete', init)
      .then(response => response.json())
      .then(data => getChecklistItems(user.userid))
      .catch(error => console.error(error));
  };

  const deleteChecklistItem = checklistItemId => {
    const init = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checklistItemId })
    };

    fetch('/api/checklist/delete-checklist-item/', init)
      .then(response => response.json())
      .then(data => {
        handleModalClose();
        getChecklistItems(user.userid);
      })
      .catch(error => console.error(error));
  };

  const handleDeleteClick = checklistItemId => {
    setModalMessage({
      heading: 'Are you sure?',
      messageBody: 'Once you delete this item, you cannot restore it!'
    });
    setDeleteId(checklistItemId);
    setDeleting(true);
    handleModalOpen();
  };

  const handleFade = (historyProps, path) => {
    setComponentStatus('unmounting');
    setTimeout(() => {
      historyProps.push(path);
      setComponentStatus('mounting');
    }, 1000);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalMessage(null);
    if (deleting) {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleColorMode = () => {
    if (colorMode === 'light') {
      setColorMode('dark');
    } else {
      setColorMode('light');
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  if (fetchedUser) {
    return (
      <MuiThemeProvider
        theme={colorMode === 'light'
          ? lightTheme
          : darkTheme}>
        <Switch>
          <Route
            exact path='/'
            render={props =>
              <Home
                {...props}
                user={user}
                handleFade={handleFade}
                componentStatus={componentStatus}
                signedIn={signedIn}
                loginSubmitHandler={loginSubmitHandler} />} />
          <Route
            exact path='/login'
            render={props =>
              <Login
                {...props}
                emailCheck={emailRegEx}
                handleFade={handleFade}
                modalOpen={modalOpen}
                modalMessage={modalMessage}
                handleModalClose={handleModalClose}
                loginSubmitHandler={loginSubmitHandler}
                componentStatus={componentStatus} />} />
          <Route
            exact path='/sign-up'
            render={props =>
              <SignUp
                {...props}
                nameCheck={nameRegEx}
                emailCheck={emailRegEx}
                handleFade={handleFade}
                modalOpen={modalOpen}
                modalMessage={modalMessage}
                handleModalClose={handleModalClose}
                createAccountHandler={createAccountHandler}
                componentStatus={componentStatus} />} />
          <Route
            exact path='/checklist'
            render={props =>
              <Checklist
                {...props}
                user={user}
                modalOpen={modalOpen}
                setModalMessage={setModalMessage}
                modalMessage={modalMessage}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                handleDeleteClick={handleDeleteClick}
                getChecklistItems={getChecklistItems}
                componentStatus={componentStatus}
                createChecklistItem={createChecklistItem}
                updateChecklistItem={updateChecklistItem}
                toggleComplete={toggleComplete}
                deleting={deleting}
                deleteId={deleteId}
                deleteChecklistItem={deleteChecklistItem}
                checklist={checklist}
                logoutUser={logoutUser}
                colorMode={colorMode}
                toggleColorMode={toggleColorMode} />} />
        </Switch>
      </MuiThemeProvider>
    );
  } else {
    return null;
  }
};

export default App;
