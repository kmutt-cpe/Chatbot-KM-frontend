import React, { ReactElement } from 'react';
import { Box, Button, Toolbar, AppBar } from '@material-ui/core';
import { LogoImg } from '../../assets/img';
import { Color } from '../../assets/css';

const NavBar = (): ReactElement => {
  return (
    <AppBar
      position="static"
      style={{
        background: 'transparent',
        boxShadow: 'none',
        height: '70px',
        minHeight: '10vh',
      }}
    >
      <Toolbar style={{ paddingTop: '5px' }}>
        <Box display="flex" width="100%" alignItems="center" bgcolor="transparent">
          <Box display="flex">
            <img src={LogoImg} alt="Logo" style={{ height: '45px' }} />
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box mr={2.5} my={0.5}>
              <div style={{ color: Color.secondary }}>HOME</div>
            </Box>
            <Box mr={2.5} my={0.5}>
              <div style={{ color: Color.secondary }}>CONTACT</div>
            </Box>
            <Box mr={2.5} my={0.5}>
              <Button variant="contained" color="primary">
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
