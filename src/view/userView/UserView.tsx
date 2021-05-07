import React from 'react';
import { Typography, Grid, Button, CircularProgress, hslToRgb } from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal, BackButton } from '../../component';
import { Color } from '../../assets/css';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { QueryUserById } from '../../domain/query/user.query';

const UserView: React.FC = () => {
  const labelWidth = 6;
  const inputWidth = 6;

  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();

  const { data, loading, error } = QueryUserById(userId);
  const user = data ? data.getUserById : { id: '', username: '', name: '', role: '' };
  const [deletePopup, setDeletePopup] = React.useState(false);

  const onDiscard = () => {
    setDeletePopup(false);
    history.push('/user-management');
  };
  if (loading) return <CircularProgress />;
  if (error || !data || !data.getUserById) return null;

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <BackButton path="/user-management" />
        </Grid>
        <Grid item style={{ height: '50px' }}>
          <Typography variant="h1" color="secondary">
            USER
          </Typography>
        </Grid>
        <Grid
          item
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: Color.secondary,
            marginBottom: '40px',
          }}
        />

        <Grid item container direction="column" spacing={3}>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                Role
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {user?.role}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                Username
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {user?.username}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={5}>
            <Grid item xs={labelWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '100%',
                }}
                color="secondary"
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs={inputWidth}>
              <Typography
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                {user?.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            spacing={2}
            justify="center"
            alignItems="center"
            style={{ marginTop: '20px' }}
          >
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                style={{ width: '100px' }}
                onClick={() => history.push(`/edit-user/${user?.id}`)}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setDeletePopup(true);
                }}
                style={{ color: Color.red }}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModal
        onAction={onDiscard}
        onReject={() => {
          setDeletePopup(false);
        }}
        onClose={() => {
          setDeletePopup(false);
        }}
        dialogTitle={'Delete user?'}
        dialogContent={`Are you sure you want to delete ${user?.username}?`}
        rejectText="Cancel"
        actionText="Delete"
        open={deletePopup}
      />
    </BasicLayout>
  );
};

export default UserView;
