import React, { ReactElement } from 'react';
import { Box, Button, Toolbar, AppBar, Link } from '@material-ui/core';
import { LogoImg } from '../../assets/img';
import { Color } from '../../assets/css';
import { useHistory } from 'react-router-dom';

const LandingNavbar = (): ReactElement => {
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
            <Link href="/">
              <img src={LogoImg} alt="Logo" style={{ height: '45px' }} />
            </Link>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Box mr={2.5} my={0.5}>
              <Button color="primary" onClick={() => history.push('/')}>
                <div style={{ color: Color.secondary }}>HOME</div>
              </Button>
            </Box>
            <Box mr={2.5} my={0.5}>
              <Button color="primary" onClick={() => history.push('/contact')}>
                <div style={{ color: Color.secondary }}>CONTACT</div>
              </Button>
            </Box>
            <Box mr={2.5} my={0.5}>
              <Button variant="contained" color="primary" onClick={() => history.push('/sign-in')}>
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default LandingNavbar;
