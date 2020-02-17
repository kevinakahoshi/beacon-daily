import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './sign-up';
import Checklist from './checklist';
import { createMuiTheme } from '@material-ui/core/styles';

function App() {
  const [user, setUser] = React.useState(null);
  const [signedIn, setSignedIn] = React.useState(false);
  const [checklist, setChecklist] = React.useState([]);
  const [modalMessage, setModalMessage] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);
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
        body: JSON.stringify({
          firstName: newAccount.firstName,
          lastName: newAccount.lastName,
          email: newAccount.email,
          password: newAccount.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/api/create-an-account', init)
        .then(response => response.json())
        .then(user => {
          setUser(user);
          setSignedIn(true);
          setComponentStatus('unmounting');
          getChecklistItems(user.userid);
          setTimeout(() => {
            historyProps.push('/checklist');
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
        body: JSON.stringify({
          email: user.email,
          password: user.password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
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

  const getUser = () => {
    fetch('/api/get-user')
      .then(res => res.json())
      .then(user => {
        setFetchedUser(true);
        setUser(user);
        if (user) {
          getChecklistItems(user.userid);
        }
      })
      .catch(err => console.error(err));
  };

  const getChecklistItems = id => {
    fetch(`/api/get-checklist/${id}`)
      .then(res => res.json())
      .then(checklist => setChecklist(checklist))
      .catch(err => console.error(err));
  };

  const createChecklistItem = (checklistItem, toggleView) => {
    const init = {
      method: 'POST',
      body: JSON.stringify({
        checklistItem: checklistItem,
        userId: user.userid
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch('/api/create-checklist-item', init)
      .then(res => res.json())
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
      .catch(err => console.error(err));
  };

  const toggleComplete = checklistItemId => {
    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checklistItemId })
    };

    fetch('/api/toggle-complete', init)
      .then(res => res.json())
      .then(data => getChecklistItems())
      .catch(err => console.error(err));
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
                getChecklistItems={getChecklistItems}
                componentStatus={componentStatus}
                createChecklistItem={createChecklistItem}
                toggleComplete={toggleComplete}
                checklist={checklist} />} />
        </Switch>
      </>
    );
  } else {
    return null;
  }
}

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       signedIn: false,
//       checklist: [],
//       weather: null,
//       user: null,
//       componentStatus: 'mounting',
//       lightMode: true
//     };

//     this.getChecklistItems = this.getChecklistItems.bind(this);
//     this.createAccountHandler = this.createAccountHandler.bind(this);
//     this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
//   }

//   createAccountHandler(event, newAccount, historyProps) {
//     event.preventDefault();
//     if (newAccount.firstName && newAccount.lastName && newAccount.email && newAccount.password) {
//       const init = {
//         method: 'POST',
//         body: JSON.stringify({
//           firstName: newAccount.firstName,
//           lastName: newAccount.lastName,
//           email: newAccount.email,
//           password: newAccount.password
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       };

//       fetch('/api/create-an-account', init)
//         .then(response => response.json())
//         .then(user => {
//           this.setState({
//             user,
//             signedIn: true,
//             componentStatus: 'unmounting'
//           });
//           this.getChecklistItems(user.userid);
//           setTimeout(() => {
//             historyProps.push('/checklist');
//             this.setState({ componentStatus: 'mounting' });
//           }, 1000);
//         })
//         .catch(error => console.error(error));
//     }
//   }

//   loginSubmitHandler(event, user, historyProps) {
//     event.preventDefault();
//     if (user.email && user.password) {
//       const init = {
//         method: 'POST',
//         body: JSON.stringify({
//           email: 'kevin@beacondaily.com',
//           password: 'test'
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       };

//       fetch('/api/login', init)
//         .then(response => response.json())
//         .then(user => {
//           this.setState({
//             user,
//             signedIn: true,
//             componentStatus: 'unmounting'
//           });
//           this.getChecklistItems(user.userid);
//           setTimeout(() => {
//             historyProps.push('/checklist');
//             this.setState({
//               componentStatus: 'mounting'
//             });
//           }, 1000);
//         })
//         .catch(error => console.error(error));
//     }
//   }

//   getChecklistItems(id) {
//     fetch(`/api/get-checklist/${id}`)
//       .then(res => res.json())
//       .then(checklist => this.setState({ checklist }))
//       .catch(err => console.error(err));
//   }

//   toggleMode() {
//     this.setState({ lightMode: true });
//   }

//   componentDidMount() {
//     // fetch('https://api.openweathermap.org/data/2.5/weather?zip=92618,us&APPID=898a2a99485d6f874e33752a52837aa7')
//     //   .then(res => res.json())
//     //   .then(data => this.setState({ weather: data }))
//     //   .catch(err => console.error(err));
//   }

//   render() {
//     return (
//       <>
//         <Switch>
//           <ThemeProvider>
//             <Route
//               exact path='/'
//               render={props =>
//                 <Home {...props}
//                   componentStatus={this.state.componentStatus}
//                   toggleMode={this.toggleMode}
//                   lightMode={this.state.lightMode} />} />
//             <Route
//               exact path='/login'
//               render={ props =>
//                 <Login {...props}
//                   loginSubmitHandler={this.loginSubmitHandler}
//                   componentStatus={this.state.componentStatus} />} />
//             <Route
//               exact path='/sign-up'
//               render={ props =>
//                 <SignUp {...props}
//                   createAccountHandler={this.createAccountHandler}
//                   componentStatus={this.state.componentStatus} />} />
//             {/* <Route
//             exact path='/checklist'
//             render={props =>
//               <Checklist {...props}
//                 checklist={this.state.checklist}
//                 componentStatus={this.state.componentStatus} />} /> */}
//             <Route
//               exact path='/checklist'
//               render={props =>
//                 <Checklist {...props}
//                   componentStatus={this.state.componentStatus}
//                   checklist={this.state.checklist} />} />
//           </ThemeProvider>
//         </Switch>
//       </>
//     );
//   }
// }

export default App;
