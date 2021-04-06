import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Footer, LandingNavbar, BasicLayout } from '../../component';
import { BackgroundImg, LogoImg } from '../../assets/img';

const home: React.FC = () => {
  return (
    <BasicLayout
      footer={<Footer />}
      navbar={<LandingNavbar />}
      style={{ backgroundImage: `url(${BackgroundImg})`, width: '100%' }}
    >
      <Box display="flex" height="80vh" alignItems="center">
        <Box flexGrow={1} width="50%" padding="10px" alignContent="end">
          <img
            src={LogoImg}
            alt="Logo"
            style={{
              width: '100%',
            }}
          />
        </Box>
        <Box flexGrow={1} width="50%" padding="10px">
          <Typography variant="h2" color="secondary" align="center">
            CPE @ KMUTT
          </Typography>
          <Typography variant="h4" color="secondary" align="center">
            Knowledge Management
          </Typography>
        </Box>
      </Box>
    </BasicLayout>
  );
};

export default home;
