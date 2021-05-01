import React from 'react';
import { Typography, Grid, TextField, Link, Button } from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal } from '../../component';
import { Color } from '../../assets/css';
import { useFormik } from 'formik';
import { EditUserType } from './utils/UserType';
import { ValidateEditUserForm } from './utils/ValidateUserForm';
import ChangePassword from './assets/ChangePassword';

interface EditUserProps {
  user: { id: string; username: string; name: string };
}

const EditUser: React.FC<EditUserProps> = (props: EditUserProps) => {
  const [discardDisplay, setDiscardDisplay] = React.useState(false);
  const [changePasswordState, setChangePasswordState] = React.useState(false);
  const labelWidth = 3;
  const inputWidth = 9;

  const onDiscard = () => {
    // todo: Implement discard create user
    if (changePasswordState === true) setChangePasswordState(false);
    setDiscardDisplay(false);
  };

  const formikUser = useFormik<EditUserType>({
    initialValues: {
      username: props.user.username,
      name: props.user.name,
    },
    validate: ValidateEditUserForm,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <Typography color="secondary">
            <Link href="#" onClick={() => setDiscardDisplay(true)}>
              back
            </Link>
          </Typography>
        </Grid>
        <Grid item style={{ height: '50px' }}>
          <Typography variant="h1" color="secondary">
            EDIT USER
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
        <form onSubmit={formikUser.handleSubmit}>
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
                  onChange={formikUser.handleChange}
                  value={formikUser.values.username}
                  error={formikUser.errors.username ? true : false}
                  helperText={formikUser.errors.username || null}
                  disabled={changePasswordState}
                />
              </Grid>
            </Grid>
            <ChangePassword
              changePasswordState={changePasswordState}
              setChangePasswordState={setChangePasswordState}
            />
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
                  onChange={formikUser.handleChange}
                  value={formikUser.values.name}
                  error={formikUser.errors.name ? true : false}
                  helperText={formikUser.errors.name || null}
                  disabled={changePasswordState}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row" spacing={2} justify="flex-end">
              <Grid item>
                <Button
                  color="primary"
                  onClick={() => setDiscardDisplay(true)}
                  disabled={changePasswordState}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={changePasswordState}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <ConfirmModal
        onAction={onDiscard}
        onReject={() => setDiscardDisplay(false)}
        onClose={() => setDiscardDisplay(false)}
        dialogTitle={'Discard'}
        dialogContent={'Are you sure you want to discard?'}
        rejectText="Cancel"
        actionText="Discard"
        open={discardDisplay}
      />
    </BasicLayout>
  );
};

export default EditUser;
