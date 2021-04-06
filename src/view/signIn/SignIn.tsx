import { Grid, Typography, TextField, Button } from '@material-ui/core';
import React, { Component, ReactElement } from 'react';
import { LandingNavbar, Footer, BasicLayout } from '../../component';
import { BackgroundImg, LogoImg } from '../../assets/img';
import { Color } from '../../assets/css';

class Login extends Component {
  render(): ReactElement {
    return (
      <BasicLayout
        navbar={<LandingNavbar />}
        footer={<Footer />}
        style={{ backgroundImage: `url(${BackgroundImg})`, width: '100%' }}
      >
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs></Grid>
          <Grid container direction="column" justify="center" alignItems="center" xs={7}>
            <Grid item style={{ margin: '30px' }}>
              <img
                src={LogoImg}
                alt="Logo"
                style={{
                  width: '50%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <Typography variant="h2" align="center" color="secondary">
                CPE@KMUTT
              </Typography>
              <Typography variant="h5" align="center" style={{ color: 'gray' }}>
                KNOWLEDGE MANAGEMENT
              </Typography>
            </Grid>
            <Grid container direction="column" style={{ width: '380px' }}>
              <form style={{ width: '100%' }} noValidate>
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="filled"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: Color.orange, color: Color.white }}
                >
                  Sign In
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </BasicLayout>
    );
  }
}

export default Login;
