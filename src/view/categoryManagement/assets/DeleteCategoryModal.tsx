import React from 'react';
import { AlertModal, ConfirmModal, ErrorModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';
import { MutateDeleteCategory } from '../../../domain/mutation/category.mutation';
import { useSelector } from 'react-redux';
import { RootReducersType } from '../../../lib/redux/reducers';
import { ModeratorAccess } from '../../../common/role';

interface DeleteCategoryModalProps {
  category?: string;
  id?: string;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = (
  props: DeleteCategoryModalProps
) => {
  const [confirmModal, setConfirmModal] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [deleteCategory, { error }] = MutateDeleteCategory();

  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

  const onDelete = () => {
    setAlertModal(false);
    deleteCategory({ variables: { id: props.id } })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setErrorModal(true);
      });
  };

  return (
    <>
      <IconButton
        onClick={() => {
          for (const userRole of ModeratorAccess)
            if (role === userRole) {
              setConfirmModal(true);
              return;
            }
          setAlertModal(true);
        }}
        size="small"
      >
        <DeleteRoundedIcon style={{ color: Color.red }} />
      </IconButton>
      <ConfirmModal
        open={confirmModal}
        onAction={onDelete}
        onReject={() => setConfirmModal(false)}
        onClose={() => setConfirmModal(false)}
        dialogTitle="Delete confirmation"
        dialogContent={`Are you sure you want to delete ${props.category}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
      <AlertModal
        open={alertModal}
        handleClose={() => {
          setAlertModal(false);
        }}
        alertTitle="Unauthorized"
        alertMessage="You don't have access to this"
      />
    </>
  );
};

export default DeleteCategoryModal;
