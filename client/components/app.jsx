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
import Checklist from './checklist';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      signedIn: false,
      checklist: [],
      weather: null,
      user: null
    };

    this.getChecklistItems = this.getChecklistItems.bind(this);
    this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
  }

  loginSubmitHandler(event) {
    event.preventDefault();
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
        this.setState({ user, signedIn: true });
        this.getChecklistItems(user.userid);
      })
      .catch(error => console.error(error));
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
            <Route exact path='/'
              render={props =>
                <Home {...props} />} />
            <Route exact path='/login'
              render={ props =>
                <Login {...props}
                  loginSubmitHandler={this.loginSubmitHandler} />} />
            <Route exact path='/checklist'
              render={props =>
                <Checklist {...props}
                  checklist={this.state.checklist} />} />
          </Switch>
        </Fade>
      </>
    );
  }
}

export default App;
