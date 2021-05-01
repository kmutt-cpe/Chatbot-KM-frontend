import React from 'react';
import { Typography, Grid, TextField, Link, Button, Divider } from '@material-ui/core';
import { StaffNavbar, BasicLayout, ConfirmModal } from '../../component';
import { Color } from '../../assets/css';

interface UserViewProps {
  user: { id: string; username: string; name: string; role: string };
}

const UserView: React.FC<UserViewProps> = (props: UserViewProps) => {
  const labelWidth = 6;
  const inputWidth = 6;

  const [deletePopup, setDeletePopup] = React.useState(false);

  const openDiscardModal = () => {
    setDeletePopup(true);
  };

  const closeDiscardModal = () => {
    setDeletePopup(false);
  };

  const onDiscard = () => {
    // todo: Implement discard create user
    setDeletePopup(false);
  };

  return (
    <BasicLayout navbar={<StaffNavbar />} style={{ width: '100%' }}>
      <Grid container direction="column" justify="flex-start">
        <Grid item style={{ marginBottom: '20px' }}>
          <Typography color="secondary">
            <Link href="#" onClick={openDiscardModal}>
              back
            </Link>
          </Typography>
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
                {props.user.role}
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
                {props.user.username}
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
                {props.user.name}
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
              <Button color="primary" variant="contained" type="submit" style={{ width: '100px' }}>
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={openDiscardModal} style={{ color: Color.red }}>
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ConfirmModal
        onAction={onDiscard}
        onReject={closeDiscardModal}
        onClose={closeDiscardModal}
        dialogTitle={'Delete user?'}
        dialogContent={`Are you sure you want to delete ${props.user.username}?`}
        rejectText="Cancel"
        actionText="Delete"
        open={deletePopup}
      />
    </BasicLayout>
  );
};

export default UserView;
