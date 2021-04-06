import React, { ReactElement } from 'react';
import { Toolbar, Typography } from '@material-ui/core';

const Footer = (): ReactElement => {
  return (
    <Toolbar
      style={{
        width: 'calc()',
        marginTop: 'calc()',
        bottom: 0,
        height: '70px',
        minHeight: '7vh',
        background: 'linear-gradient(90deg, rgba(125,33,232,1) 0%, rgba(38,224,250,1) 100%)',
      }}
    >
      <Typography variant="body1" color="inherit" style={{ color: 'white' }}>
        © 2020 KMUTT CPE CHATBOT SYSTEM
      </Typography>
    </Toolbar>
  );
};

export default Footer;
