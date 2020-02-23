import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './sign-up';
import Checklist from './checklist';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

function App() {
  const [user, setUser] = React.useState(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const [checklist, setChecklist] = React.useState([]);
  const [modalMessage, setModalMessage] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [fetchedUser, setFetchedUser] = React.useState(false);
  const [componentStatus, setComponentStatus] = React.useState('mounting');
  // const [weather, setWeather] = React.useState(null);

  const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
  });

  const createAccountHandler = (event, newAccount, historyProps) => {
    event.preventDefault();
    if (newAccount.firstName && newAccount.lastName && newAccount.email && newAccount.password) {
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: newAccount.firstName,
          lastName: newAccount.lastName,
          email: newAccount.email,
          password: newAccount.password
        })
      };

      fetch('/api/create-an-account', init)
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
    }
  };

  const loginSubmitHandler = (event, user, historyProps) => {
    event.preventDefault();
    if (user.email && user.password) {
      const init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      };

      fetch('/api/login', init)
        .then(response => response.json())
        .then(user => {
          if (!user.error) {
            setUser(user);
            setModalMessage(null);
            setSignedIn(true);
            setComponentStatus('unmounting');
            getChecklistItems(user.userid);
            setTimeout(() => {
              historyProps.push('/checklist');
              setComponentStatus('mounting');
            }, 1000);
          } else {
            setModalMessage({
              heading: 'An unexpected error occurred',
              messageBody: 'Either email address or password were not correct.'
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

    fetch('/api/logout', init)
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
    fetch('/api/get-user')
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
    fetch(`/api/get-checklist/${id}`)
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

    fetch('/api/create-checklist-item', init)
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

    fetch('/api/update-checklist-item', init)
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

    fetch('/api/toggle-complete', init)
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

    fetch('/api/delete-checklist-item/', init)
      .then(response => response.json())
      .then(data => {
        handleModalClose();
        getChecklistItems(user.userid);
      })
      .catch(error => console.error(error));
  };

  const handleDeleteClick = checklistItemId => {
    setModalMessage({
      heading: 'Are you sure you want to delete this item?',
      messageBody: 'Once you delete this checklist item, you cannot restore it!'
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

  React.useEffect(() => {
    getUser();
  }, []);

  if (fetchedUser) {
    return (
      <>
        <Switch
          theme={theme}>
          <Route
            exact path='/'
            render={props =>
              <Home
                {...props}
                user={user}
                handleFade={handleFade}
                componentStatus={componentStatus}
                signedIn={signedIn} />} />
          <Route
            exact path='/login'
            render={props =>
              <Login
                {...props}
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
                handleFade={handleFade}
                createAccountHandler={createAccountHandler}
                componentStatus={componentStatus} />} />
          <Route
            exact path='/checklist'
            render={props =>
              <Checklist
                {...props}
                user={user}
                modalOpen={modalOpen}
                modalMessage={modalMessage}
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
                logoutUser={logoutUser} />} />
        </Switch>
      </>
    );
  } else {
    return null;
  }
}

export default App;

// Weather API
// https://api.openweathermap.org/data/2.5/weather?zip=92618,us&APPID=898a2a99485d6f874e33752a52837aa7
