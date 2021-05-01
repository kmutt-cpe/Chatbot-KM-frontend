import React from 'react';
import { ConfirmModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';

interface DeleteQuestionProps {
  question?: string;
  id?: string;
}

const DeleteQuestion: React.FC<DeleteQuestionProps> = (props: DeleteQuestionProps) => {
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
        dialogTitle="Delete confirmation"
        dialogContent={`Are you sure you want to delete ${props.question}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
    </div>
  );
};

export default DeleteQuestion;
