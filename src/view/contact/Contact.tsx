import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Footer, LandingNavbar, BasicLayout } from '../../component';
import {
  BackgroundImg,
  NathaphopImg,
  NatkanokImg,
  NatthawatImg,
  SantithamImg,
} from '../../assets/img';

const Contact: React.FC = () => {
  return (
    <BasicLayout
      footer={<Footer />}
      navbar={<LandingNavbar />}
      style={{ backgroundImage: `url(${BackgroundImg})`, width: '100%' }}
    >
      <Box display="flex" height="70vh" alignItems="center">
        <Box m={5}>
          <Box style={{ height: '30px' }} />
          <Box>
            <img
              src={NathaphopImg}
              alt="nathaphop"
              style={{
                width: '100%',
              }}
            />
          </Box>
          <Box>
            <Typography color="secondary" align="center">
              Nathaphop Sundarabhogin
            </Typography>
          </Box>
        </Box>
        <Box m={5}>
          <Box style={{ height: '30px' }} />
          <Box>
            <img
              src={NatthawatImg}
              alt="natthawat"
              style={{
                width: '100%',
              }}
            />
          </Box>
          <Box>
            <Typography color="secondary" align="center">
              Natthawat Tungruethaipak
            </Typography>
          </Box>
        </Box>
        <Box m={5}>
          <Box style={{ height: '30px' }} />
          <Box>
            <img
              src={NatkanokImg}
              alt="natkanok"
              style={{
                width: '100%',
              }}
            />
          </Box>
          <Box>
            <Typography color="secondary" align="center">
              Natkanok Poksappaiboon
            </Typography>
          </Box>
        </Box>
        <Box m={5} justifyContent="center">
          <Box style={{ height: '30px' }}>
            <Typography color="primary" align="center">
              Advisor
            </Typography>
          </Box>
          <Box>
            <img
              src={SantithamImg}
              alt="santitham"
              style={{
                width: '100%',
              }}
            />
          </Box>
          <Box>
            <Typography color="secondary" align="center">
              Asst. Prof. Santitham Prom-on
            </Typography>
          </Box>
        </Box>
      </Box>
    </BasicLayout>
  );
};

export default Contact;
