import { Grid, Typography, TextField, Button } from '@material-ui/core';
import React from 'react';
import { LandingNavbar, Footer, BasicLayout, AlertModal } from '../../component';
import { BackgroundImg, LogoImg } from '../../assets/img';
import { Color } from '../../assets/css';
import { useFormik } from 'formik';
import { SignInType } from './utils/SignInType';
import { ValidateSignInForm } from './utils/ValidateSignInForm';
import { useDispatch } from 'react-redux';
import { AuthActionType } from '../../lib/redux/auth/auth.type';
import { Redirect, useHistory } from 'react-router-dom';
import { QueryLogin } from '../../domain/query/auth.query';
import Cookies from 'universal-cookie';

const SignIn = (): React.ReactElement => {
  const [wrongPasswordPopup, setWrongPasswordPopup] = React.useState(false);
  const formik = useFormik<SignInType>({
    initialValues: {
      username: '',
      password: '',
    },

    validate: ValidateSignInForm,
    onSubmit: async (values, action) => {
      getLogin({
        variables: { username: formik.values.username, password: formik.values.password },
      });

      /** If it is not GraphQL Error */
      if (error && error?.graphQLErrors.length === 0) {
        alert(error);
        return;
      }

      const graphQlError =
        error &&
        error.graphQLErrors.filter(
          (graphQlError) => graphQlError?.message === 'Incorrect username or password'
        );

      /** If it is not incorrect username and password error, */
      if (error && error?.graphQLErrors.length > 0 && !graphQlError) {
        alert(error);
        return;
      }
      /** If it is incorrect username and password error, */
      if (graphQlError || !data || data.login.authorization === '') {
        setWrongPasswordPopup(true);
        action.setFieldValue('password', '');
      } else {
        /** Otherwise, working correctly */
        const auth = data?.login;
        dispatch({ type: AuthActionType.SET_AUTH, authData: { ...auth } });
        history.push('/question-management');
      }
    },
  });

  const [getLogin, { error, data }] = QueryLogin();
  const history = useHistory();
  const dispatch = useDispatch();

  /* Check login state from cookie */
  const cookies = new Cookies();
  const userCookie = cookies.get('user');
  const authCookie = cookies.get('authorization');
  if (userCookie && authCookie) {
    return <Redirect to="/question-management" />;
  } else {
    cookies.remove('user');
    cookies.remove('authorization');
  }

  return (
    <>
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
      <AlertModal
        open={wrongPasswordPopup}
        handleClose={() => setWrongPasswordPopup(false)}
        alertTitle="Alert"
        alertMessage="Incorrect username or password"
      />
    </>
  );
};

export default SignIn;
