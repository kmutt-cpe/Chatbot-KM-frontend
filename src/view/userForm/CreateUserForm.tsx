import React from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal, BackButton, ErrorModal } from '../../component';
import { Color } from '../../assets/css';
import { useFormik } from 'formik';
import { CreateUserType } from './utils/UserType';
import { ValidateCreateUserForm } from './utils/ValidateUserForm';
import { useHistory } from 'react-router-dom';
import { MutateCreateUser } from '../../domain/mutation/user.mutation';

const CreateUserForm: React.FC = () => {
  const labelWidth = 3;
  const inputWidth = 9;
  const history = useHistory();

  const [discardDisplay, setDiscardDisplay] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [createUser, { error }] = MutateCreateUser();

  const onDiscard = () => {
    setDiscardDisplay(false);
    history.push('/user-management');
  };

  const formik = useFormik<CreateUserType>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
    validate: ValidateCreateUserForm,
    onSubmit: (values) => {
      createUser({
        variables: {
          user: {
            username: values.username.toLowerCase(),
            password: values.password,
            name: values.name,
            role: 'admin',
          },
        },
      })
        .then(() => {
          history.push('/user-management');
        })
        .catch(() => {
          setErrorModal(true);
        });
    },
  });

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <BackButton
            onClick={() => {
              setDiscardDisplay(true);
            }}
          />
        </Grid>
        <Grid item style={{ height: '50px' }}>
          <Typography variant="h1" color="secondary">
            CREATE USER
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: Color.secondary,
            marginBottom: '20px',
          }}
        />
        <form onSubmit={formik.handleSubmit}>
          <Grid item container direction="column" spacing={3}>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  Username
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  id="username"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  error={formik.errors.username ? true : false}
                  helperText={formik.errors.username || null}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  Password
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  id="password"
                  type="password"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.errors.password ? true : false}
                  helperText={formik.errors.password || null}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  Confirm password
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  id="confirmPassword"
                  type="password"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={formik.errors.confirmPassword ? true : false}
                  helperText={formik.errors.confirmPassword || null}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  Name
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  id="name"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name ? true : false}
                  helperText={formik.errors.name || null}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={2} justify="flex-end">
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => {
                    setDiscardDisplay(true);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <ConfirmModal
        onAction={onDiscard}
        onReject={() => {
          setDiscardDisplay(false);
        }}
        onClose={() => {
          setDiscardDisplay(false);
        }}
        dialogTitle={'Discard changes?'}
        dialogContent={'Are you sure you want to discard?'}
        rejectText="Cancel"
        actionText="Discard"
        open={discardDisplay}
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </BasicLayout>
  );
};

export default CreateUserForm;
