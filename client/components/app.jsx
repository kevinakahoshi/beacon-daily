import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Header from './header';
import Home from './home';
import Login from './login';
import Checklist from './checklist';

class App extends React.Component {

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path='/' render={props =>
            <Home {...props} />} />
          <Route exact path='/login' render={ props =>
            <Login {...props} />} />
          <Route exact path='/checklist' render={props =>
            <Checklist {...props} />} />
        </Switch>
      </>
    );
  }
}

export default App;
