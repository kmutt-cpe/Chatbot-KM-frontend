import { Grid, Typography, TextField, Button } from '@material-ui/core';
import React from 'react';
import { LandingNavbar, Footer, BasicLayout } from '../../component';
import { BackgroundImg, LogoImg } from '../../assets/img';
import { Color } from '../../assets/css';
import { useFormik } from 'formik';
import { SignInType } from './utils/SignInType';
import { ValidateSignInForm } from './utils/ValidateSignInForm';
import { useDispatch } from 'react-redux';
import { AuthActionType } from '../../redux/auth/auth.type';
import { useHistory } from 'react-router-dom';

const mockUser = [
  { id: 'user-01', username: 'tkntp123', password: '123456aA', role: 'admin' },
  { id: 'user-02', username: 'admin123', password: '123456aA', role: 'admin' },
];

const SignIn = (): React.ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik<SignInType>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: ValidateSignInForm,
    onSubmit: (values) => {
      const user = mockUser.find((user) => user.username === values.username);
      if (user?.password === values.password) {
        dispatch({ type: AuthActionType.SET_AUTH, authData: { ...user, token: 'tokennaja' } });
        history.push('/question-management');
      }
    },
  });

  return (
    <BasicLayout
      navbar={<LandingNavbar />}
      footer={<Footer />}
      style={{ backgroundImage: `url(${BackgroundImg})`, width: '100%' }}
    >
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs />
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
            <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
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
                onChange={formik.handleChange}
                value={formik.values.username}
                error={formik.errors.username ? true : false}
                helperText={formik.errors.username || null}
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
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.errors.password ? true : false}
                helperText={formik.errors.password || null}
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
        <Grid item xs />
      </Grid>
    </BasicLayout>
  );
};

export default SignIn;
