import React from 'react';
import { ConfirmModal, ErrorModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';
import { MutateDeleteSubcategory } from '../../../domain/mutation/subcategory.mutation';

interface DeleteCategoryModalProps {
  subcategory?: string;
  id?: string;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = (
  props: DeleteCategoryModalProps
) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [deleteSubcategory, { error }] = MutateDeleteSubcategory();

  const onDelete = () => {
    setModal(false);
    deleteSubcategory({ variables: { id: props.id } })
      .then(() => {
        window.location.reload();
      })
      .catch(() => setErrorModal(true));
  };

  return (
    <>
      <IconButton onClick={() => setModal(true)} size="small">
        <DeleteRoundedIcon style={{ color: Color.red }} />
      </IconButton>
      <ConfirmModal
        open={modal}
        onAction={onDelete}
        onReject={() => setModal(false)}
        onClose={() => setModal(false)}
        dialogTitle="Delete confirmation"
        dialogContent={`Are you sure you want to delete ${props.subcategory}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </>
  );
};

export default DeleteCategoryModal;
