import { Grid, Paper, Typography, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { ConfirmModal, AlertModal, ErrorModal } from '../../../component';
import {
  MutateChangePassword,
  MutateSetPasswordByAdmin,
} from '../../../domain/mutation/user.mutation';
import { RootReducersType } from '../../../lib/redux/reducers';
import { EditPasswordType } from '../utils/UserType';
import { ValidateEditPasswordForm } from '../utils/ValidateUserForm';

interface ChangePasswordProps {
  changePasswordState: boolean;
  setChangePasswordState: (state: boolean) => void;
  userId: string;
  isEditProfile?: boolean /* Use to indicate that edit profile or edit user (in user management) */;
}

const ChangePasswordBlock: React.FC<ChangePasswordProps> = (props: ChangePasswordProps) => {
  const labelWidth = 3;
  const inputWidth = 9;

  const [updatePasswordPopup, setUpdatePasswordPopup] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);

  const [changePassword, { error: errorChangePassword }] = MutateChangePassword();
  const [setPasswordByAdmin, { error: errorSetPassword }] = MutateSetPasswordByAdmin();

  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const userId = authData ? authData.id : '';

  const formikPassword = useFormik<EditPasswordType>({
    initialValues: {
      editorPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate: ValidateEditPasswordForm,
    onSubmit: (values) => {
      if (props.isEditProfile) {
        changePassword({
          variables: {
            user: {
              id: props.userId,
              password: values.password,
              editorPassword: values.editorPassword,
            },
          },
        })
          .then(() => {
            setUpdatePasswordPopup(true);
            props.setChangePasswordState(false);
          })
          .catch(() => {
            setErrorModal(true);
          });
      } else
        setPasswordByAdmin({
          variables: {
            user: {
              id: props.userId,
              password: values.password,
              editorPassword: values.editorPassword,
              editorId: userId,
            },
          },
        })
          .then(() => {
            props.setChangePasswordState(false);
            setUpdatePasswordPopup(true);
          })
          .catch(() => {
            setErrorModal(true);
          });

      formikPassword.setValues({
        editorPassword: '',
        password: '',
        confirmPassword: '',
      });
    },
  });

  const [discardPopup, setDiscardPopup] = React.useState(false);

  const onDiscard = () => {
    props.setChangePasswordState(false);
    setDiscardPopup(false);
    formikPassword.setValues({
      editorPassword: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      {props.changePasswordState ? (
        <Grid item component="form" onSubmit={formikPassword.handleSubmit}>
          <Paper style={{ padding: '30px' }}>
            {props.isEditProfile && (
              <Grid container direction="row" spacing={3}>
                <Grid item xs={labelWidth}>
                  <Typography
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    Old password
                  </Typography>
                </Grid>
                <Grid item xs={inputWidth}>
                  <TextField
                    id="editorPassword"
                    type="password"
                    variant="outlined"
                    style={{ width: '100%' }}
                    onChange={formikPassword.handleChange}
                    value={formikPassword.values.editorPassword}
                    error={formikPassword.errors.editorPassword ? true : false}
                    helperText={formikPassword.errors.editorPassword || null}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  New password
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  id="password"
                  type="password"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formikPassword.handleChange}
                  value={formikPassword.values.password}
                  error={formikPassword.errors.password ? true : false}
                  helperText={formikPassword.errors.password || null}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={3}>
              <Grid item xs={labelWidth}>
                <Typography
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  Confirm new password
                </Typography>
              </Grid>
              <Grid item xs={inputWidth}>
                <TextField
                  id="confirmPassword"
                  type="password"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formikPassword.handleChange}
                  value={formikPassword.values.confirmPassword}
                  error={formikPassword.errors.confirmPassword ? true : false}
                  helperText={formikPassword.errors.confirmPassword || null}
                />
              </Grid>
            </Grid>
            {!props.isEditProfile && (
              <Grid container direction="row" spacing={3}>
                <Grid item xs={labelWidth}>
                  <Typography
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    Your password
                  </Typography>
                </Grid>
                <Grid item xs={inputWidth}>
                  <TextField
                    id="editorPassword"
                    type="password"
                    variant="outlined"
                    style={{ width: '100%' }}
                    onChange={formikPassword.handleChange}
                    value={formikPassword.values.editorPassword}
                    error={formikPassword.errors.editorPassword ? true : false}
                    helperText={formikPassword.errors.editorPassword || 'For security'}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item container direction="row" spacing={2} justify="flex-end">
              <Grid item>
                <Button color="primary" onClick={() => setDiscardPopup(true)}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ) : (
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
            <Button color="primary" onClick={() => props.setChangePasswordState(true)}>
              Change password
            </Button>
          </Grid>
        </Grid>
      )}
      <ConfirmModal
        onAction={onDiscard}
        onReject={() => setDiscardPopup(false)}
        onClose={() => setDiscardPopup(false)}
        dialogTitle={'Discard'}
        dialogContent={'Are you sure you want to discard?'}
        rejectText="Cancel"
        actionText="Discard"
        open={discardPopup}
      />
      <AlertModal
        open={updatePasswordPopup}
        handleClose={() => setUpdatePasswordPopup(false)}
        alertTitle="Password updated"
        alertMessage="The password have been updated"
      />
      <ErrorModal
        open={errorModal}
        handleClose={() => setErrorModal(false)}
        error={props.isEditProfile ? errorChangePassword : errorSetPassword}
      />
    </>
  );
};

export default ChangePasswordBlock;
