import React from 'react';
import {
// Link
} from 'react-router-dom';
import {
  Box,
  Drawer
} from '@material-ui/core';

function Header() {
  return (
    <>
      <Drawer>

      </Drawer>
      <Box bgcolor="primary.main" color="primary.contrastText">
        <h1>Beacon Daily</h1>
      </Box>
    </>
  );
}

export default Header;
