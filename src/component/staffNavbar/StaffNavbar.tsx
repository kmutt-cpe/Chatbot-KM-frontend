import React, { ReactElement } from 'react';
import { Box, Toolbar, AppBar, Button } from '@material-ui/core';
import { LogoImg } from '../../assets/img';
import UserMenu from './UserMenu';
import { useHistory } from 'react-router-dom';

const StaffNavbar = (): ReactElement => {
  const history = useHistory();
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
            <img
              src={LogoImg}
              alt="Logo"
              style={{ height: '45px', cursor: 'pointer' }}
              onClick={() => history.push('/question-management')}
            />
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box mr={2.5} my={0.5}>
              <Button color="secondary" onClick={() => history.push('/question-management')}>
                QUESTIONS
              </Button>
            </Box>
            <Box mr={2.5} my={0.5}>
              <Button color="secondary" onClick={() => history.push('/category-management')}>
                CATEGORY
              </Button>
            </Box>
            <Box mr={2.5} my={0.5}>
              <Button color="secondary" onClick={() => history.push('/user-management')}>
                USERS
              </Button>
            </Box>
            <UserMenu />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StaffNavbar;
