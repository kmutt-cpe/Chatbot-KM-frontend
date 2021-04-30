import React from 'react';
import { ConfirmModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';

interface DeleteCategoryProps {
  username?: string;
  name?: string;
  id?: string;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = (props: DeleteCategoryProps) => {
  const [modal, setModal] = React.useState(false);
  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const onDelete = () => {
    // todo: Add on confirm delete
    setModal(false);
  };

  return (
    <div>
      <IconButton onClick={onOpenModal} size="small">
        <DeleteRoundedIcon style={{ color: Color.red }} />
      </IconButton>
      <ConfirmModal
        open={modal}
        onAction={onDelete}
        onReject={onCloseModal}
        onClose={onCloseModal}
        dialogContent={`Are you sure, you want to delete ${props.username}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
    </div>
  );
};

export default DeleteCategory;
