import React, { ReactElement } from 'react';
import { Box, Button, Toolbar, AppBar, Link } from '@material-ui/core';
import { LogoImg } from '../../assets/img';
import { Color } from '../../assets/css';

const LandingNavbar = (): ReactElement => {
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
            <Link href="/">
              <img src={LogoImg} alt="Logo" style={{ height: '45px' }} />
            </Link>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box mr={2.5} my={0.5}>
              <Link href="/">
                <div style={{ color: Color.secondary }}>HOME</div>
              </Link>
            </Box>
            <Box mr={2.5} my={0.5}>
              <div style={{ color: Color.secondary }}>CONTACT</div>
            </Box>
            <Box mr={2.5} my={0.5}>
              <Link href="/sign-in">
                <Button variant="contained" color="primary">
                  Sign in
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LandingNavbar;
