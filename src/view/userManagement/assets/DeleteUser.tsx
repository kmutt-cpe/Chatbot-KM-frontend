import React from 'react';
import { ConfirmModal, AlertModal, InputModal, ErrorModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { CircularProgress, IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootReducersType } from '../../../lib/redux/reducers';
import { MutateDeleteUser } from '../../../domain/mutation/user.mutation';

interface DeleteCategoryProps {
  username?: string;
  name?: string;
  id?: string;
}

const DeleteUser: React.FC<DeleteCategoryProps> = (props: DeleteCategoryProps) => {
  const [modal, setModal] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);

  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const userId = authData ? authData.id : '';
  const [deleteUser, { error }] = MutateDeleteUser();

  const onDelete = () => {
    deleteUser({
      variables: {
        id: props.id,
      },
    })
      .then(() => {
        setModal(false);
        window.location.reload();
      })
      .catch(() => {
        setErrorModal(true);
      });
  };

  if (!authData) return <Redirect to="/logout" />;
  if (error) return <Redirect to="/page-not-found" />;

  return (
    <div>
      <IconButton
        onClick={() => {
          if (userId === props.id) setAlertModal(true);
          else setModal(true);
        }}
        size="small"
      >
        <DeleteRoundedIcon style={{ color: Color.red }} />
      </IconButton>
      <ConfirmModal
        open={modal}
        onAction={onDelete}
        onReject={() => setModal(false)}
        onClose={() => setModal(false)}
        dialogTitle={`Are you sure, you want to delete ${props.username}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
      <AlertModal
        open={alertModal}
        handleClose={() => setAlertModal(false)}
        alertTitle="Error"
        alertMessage="You can't delete your account"
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </div>
  );
};

export default DeleteUser;
