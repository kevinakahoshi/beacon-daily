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
  // const [weather, setWeather] = React.useState(null);
  const [componentStatus, setComponentStatus] = React.useState('mounting');

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
          email: 'kevin@beacondaily.com',
          password: 'test'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      fetch('/api/login', init)
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

  const getChecklistItems = id => {
    fetch(`/api/get-checklist/${id}`)
      .then(res => res.json())
      .then(checklist => setChecklist(checklist))
      .catch(err => console.error(err));
  };

  const handleFade = (historyProps, path) => {
    setComponentStatus('unmounting');
    setTimeout(() => {
      historyProps.push(path);
      setComponentStatus('mounting');
    }, 1000);
  };

  return (
    <>
      <Switch theme={theme}>
        <Route
          exact path='/'
          render={props =>
            <Home {...props}
              user={user}
              componentStatus={componentStatus}
              signedIn={signedIn} />} />
        <Route
          exact path='/login'
          render={props =>
            <Login {...props}
              handleFade={handleFade}
              loginSubmitHandler={loginSubmitHandler}
              componentStatus={componentStatus} />} />
        <Route
          exact path='/sign-up'
          render={props =>
            <SignUp {...props}
              createAccountHandler={createAccountHandler}
              componentStatus={componentStatus} />} />
        <Route
          exact path='/checklist'
          render={props =>
            <Checklist {...props}
              user={user}
              componentStatus={componentStatus}
              checklist={checklist} />} />
      </Switch>
    </>
  );
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
