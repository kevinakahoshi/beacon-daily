import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import {
  Fade
} from '@material-ui/core';
import Header from './header';
import Home from './home';
import Login from './login';
import SignUp from './sign-up';
import Checklist from './checklist';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      checklist: [],
      weather: null,
      user: null,
      componentStatus: 'mounting'
    };

    this.getChecklistItems = this.getChecklistItems.bind(this);
    this.createAccountHandler = this.createAccountHandler.bind(this);
    this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
  }

  createAccountHandler(event, newAccount, historyProps) {
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
          this.setState({
            user,
            signedIn: true,
            componentStatus: 'unmounting'
          });
          this.getChecklistItems(user.userid);
          setTimeout(() => {
            historyProps.push('/checklist');
            this.setState({ componentStatus: 'mounting' });
          }, 1000);
        })
        .catch(error => console.error(error));
    }
  }

  loginSubmitHandler(event, user, historyProps) {
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
          this.setState({
            user,
            signedIn: true,
            componentStatus: 'unmounting'
          });
          this.getChecklistItems(user.userid);
          setTimeout(() => {
            historyProps.push('/checklist');
            this.setState({
              componentStatus: 'mounting'
            });
          }, 1000);
        })
        .catch(error => console.error(error));
    }
  }

  getChecklistItems(id) {
    fetch(`/api/get-checklist/${id}`)
      .then(res => res.json())
      .then(checklist => this.setState({ checklist }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    // fetch('https://api.openweathermap.org/data/2.5/weather?zip=92618,us&APPID=898a2a99485d6f874e33752a52837aa7')
    //   .then(res => res.json())
    //   .then(data => this.setState({ weather: data }))
    //   .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <Header
          weather={this.state.weather}/>
        <Fade in={true}>
          <Switch>
            <Route
              exact path='/'
              render={props =>
                <Home {...props}
                  componentStatus={this.state.componentStatus} />} />
            <Route
              exact path='/login'
              render={ props =>
                <Login {...props}
                  loginSubmitHandler={this.loginSubmitHandler}
                  componentStatus={this.state.componentStatus} />} />
            <Route
              exact path='/sign-up'
              render={ props =>
                <SignUp {...props}
                  createAccountHandler={this.createAccountHandler}
                  componentStatus={this.state.componentStatus} />} />
            <Route
              exact path='/checklist'
              render={props =>
                <Checklist {...props}
                  checklist={this.state.checklist}
                  componentStatus={this.state.componentStatus} />} />
          </Switch>
        </Fade>
      </>
    );
  }
}

export default App;
