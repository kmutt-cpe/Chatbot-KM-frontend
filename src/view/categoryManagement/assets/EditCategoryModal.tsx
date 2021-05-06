import React from 'react';
import { InputModal, ErrorModal } from '../../../component';
import { Color } from '../../../assets/css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import { MutateUpdateCategory } from '../../../domain/mutation/category.mutation';

interface EditCategoryModalProps {
  category?: string;
  id?: string;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = (props: EditCategoryModalProps) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [updateCategory, { error }] = MutateUpdateCategory();

  const onEdit = (category?: string) => {
    setModal(false);
    updateCategory({ variables: { category: { category, id: props.id } } })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setErrorModal(true);
      });
  };

  return (
    <div>
      <IconButton onClick={() => setModal(true)} size="small">
        <EditRoundedIcon style={{ color: Color.secondary }} onClick={() => setModal(true)} />
      </IconButton>
      <InputModal
        open={modal}
        onAction={onEdit}
        onReject={() => setModal(false)}
        onClose={() => setModal(false)}
        value={props.category}
        dialogTitle="EDIT CATEGORY"
        actionText="Save"
        rejectText="Cancel"
        required
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </div>
  );
};

export default EditCategoryModal;
