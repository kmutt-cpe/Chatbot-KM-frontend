import React, { ReactElement } from 'react';
import { Box, Toolbar, AppBar } from '@material-ui/core';
import { LogoImg } from '../../assets/img';
import { Color } from '../../assets/css';
import UserMenu from './UserMenu';

const StaffNavbar = (): ReactElement => {
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
              <div style={{ color: Color.secondary }}>QUESTIONS</div>
            </Box>
            <Box mr={2.5} my={0.5}>
              <div style={{ color: Color.secondary }}>USERS</div>
            </Box>
            <UserMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StaffNavbar;
