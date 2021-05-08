import React from 'react';
import { ConfirmModal, ErrorModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';
import { MutateDeleteCategory } from '../../../domain/mutation/category.mutation';

interface DeleteCategoryModalProps {
  category?: string;
  id?: string;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = (
  props: DeleteCategoryModalProps
) => {
  const [alertModal, setAlertModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [deleteCategory, { error }] = MutateDeleteCategory();

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
      <IconButton onClick={() => setAlertModal(true)} size="small">
        <DeleteRoundedIcon style={{ color: Color.red }} />
      </IconButton>
      <ConfirmModal
        open={alertModal}
        onAction={onDelete}
        onReject={() => setAlertModal(false)}
        onClose={() => setAlertModal(false)}
        dialogTitle="Delete confirmation"
        dialogContent={`Are you sure you want to delete ${props.category}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </>
  );
};

export default DeleteCategoryModal;
