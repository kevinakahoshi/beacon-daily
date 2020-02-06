import React from 'react';
import {
  Link
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  componentDidMount() {
    this.setState({ location: window.location.pathname });
  }

  render() {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <Typography color="inherit">
                Beacon Daily
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default Header;
