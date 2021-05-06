import React from 'react';
import { Typography, Grid, TextField, Button, CircularProgress } from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal, BackButton, ErrorModal } from '../../component';
import { Color } from '../../assets/css';
import { useFormik } from 'formik';
import { EditUserType } from './utils/UserType';
import { ValidateEditUserForm } from './utils/ValidateUserForm';
import ChangePasswordBlock from './assets/ChangePasswordBlock';
import { useHistory, useParams } from 'react-router-dom';
import { QueryUserById } from '../../domain/query/user.query';
import { MutateUpdateUser } from '../../domain/mutation/user.mutation';

const EditUserForm: React.FC = () => {
  const [discardDisplay, setDiscardDisplay] = React.useState(false);
  const [changePasswordState, setChangePasswordState] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const labelWidth = 3;
  const inputWidth = 9;
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();

  const { data, loading, error: queryError } = QueryUserById(userId);
  const [updateUser, { error }] = MutateUpdateUser();

  const onDiscard = () => {
    setDiscardDisplay(false);
    history.goBack();
  };

  const user = data?.getUserById ? data.getUserById : { id: '', username: '', name: '', role: '' };

  const formikUser = useFormik<EditUserType>({
    initialValues: {
      username: user.username || '',
      name: user.name || '',
    },
    validate: ValidateEditUserForm,
    onSubmit: (values) => {
      updateUser({
        variables: {
          user: {
            id: userId,
            name: values.name,
            role: user.role,
          },
        },
      })
        .then(() => {
          history.goBack();
        })
        .catch(() => {
          setErrorModal(true);
        });
    },
    enableReinitialize: true,
  });

  if (loading) return <CircularProgress />;
  if (queryError) return null;

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
                  disabled
                />
              </Grid>
            </Grid>
            <ChangePasswordBlock
              changePasswordState={changePasswordState}
              setChangePasswordState={setChangePasswordState}
              userId={userId}
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

export default EditUserForm;
