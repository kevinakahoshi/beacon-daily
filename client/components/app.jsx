import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from 'react-router-dom';
import Header from './header';
import Login from './login';
import Checklist from './checklist';

class App extends React.Component {

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact link='/login' render={ props =>
            <Login {...props} />} />
          <Route exact link='/checklist' render={props =>
            <Checklist {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
