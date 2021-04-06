import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { Footer, LandingBackground, LandingNavBar } from '../../component';
import { LogoImg } from '../../assets/img';

const home: React.FC = () => {
  return (
    <LandingBackground>
      <LandingNavBar />
      <Container>
        <Box
          py={3}
          px={3}
          display="flex"
          flexDirection="row"
          minHeight="85vh"
          height="400px"
          alignItems="center"
        >
          <Box flexGrow={1} width="50%" justifyContent="center">
            <img src={LogoImg} alt="Logo" style={{ width: '90%', padding: '5%' }} />
          </Box>
          <Box flexGrow={1} width="50%" padding="15px">
            <Typography variant="h2" color="secondary">
              CPE @ KMUTT
            </Typography>
            <Typography variant="h4" color="secondary">
              Knowledge Management
            </Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </LandingBackground>
  );
};

export default home;
