import { Grid, Paper, Typography, Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { ConfirmModal, AlertModal } from '../../../component';
import { EditPasswordType } from '../utils/UserType';
import { ValidateEditPasswordForm } from '../utils/ValidateUserForm';

interface ChangePasswordProps {
  changePasswordState: boolean;
  setChangePasswordState: (state: boolean) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = (props: ChangePasswordProps) => {
  const labelWidth = 3;
  const inputWidth = 9;

  const [updatePasswordPopup, setUpdatePasswordPopup] = React.useState(false);
  const formikPassword = useFormik<EditPasswordType>({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate: ValidateEditPasswordForm,
    onSubmit: (values, actions) => {
      /* Mock up the correct password */
      if (values.oldPassword === 'tk') {
        alert(JSON.stringify(values, null, 2));
        setUpdatePasswordPopup(true);
        props.setChangePasswordState(false);
        formikPassword.setValues({
          oldPassword: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        actions.setFieldError('oldPassword', 'Password is not correct');
      }
    },
  });

  const [discardPopup, setDiscardPopup] = React.useState(false);

  const onDiscard = () => {
    props.setChangePasswordState(false);
    setDiscardPopup(false);
    formikPassword.setValues({
      oldPassword: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      {props.changePasswordState ? (
        <Grid item component="form" onSubmit={formikPassword.handleSubmit}>
          <Paper style={{ padding: '30px' }}>
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
                  id="oldPassword"
                  type="password"
                  variant="outlined"
                  style={{ width: '100%' }}
                  onChange={formikPassword.handleChange}
                  value={formikPassword.values.oldPassword}
                  error={formikPassword.errors.oldPassword ? true : false}
                  helperText={formikPassword.errors.oldPassword || null}
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
        alertTitle="Password Updated"
        alertMessage="The password have been updated"
      />
    </>
  );
};

export default ChangePassword;
