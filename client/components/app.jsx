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
      weather: null
    };

    this.fetchedUser = this.fetchedUser.bind(this);
  }

  fetchedUser() {
    this.setState({ signedIn: true });
  }

  componentDidMount() {
    fetch('/api/get-checklist')
      .then(res => res.json())
      .then(data => this.setState({ checklist: data }))
      .catch(err => console.error(err));

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
                  fetchedUser={this.fetchUser} />} />
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
