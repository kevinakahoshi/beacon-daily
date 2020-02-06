import React from 'react';
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
        <AppBar position="sticky">
          <Toolbar>
            <Typography color="inherit">
                Beacon Daily
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

export default Header;
