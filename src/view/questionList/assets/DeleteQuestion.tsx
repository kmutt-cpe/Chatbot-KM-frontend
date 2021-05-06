import React from 'react';
import { ConfirmModal, ErrorModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';
import { MutateDeleteFAQ } from '../../../domain/mutation/faq.mutation';

interface DeleteQuestionProps {
  question?: string;
  id?: string;
}

const DeleteQuestion: React.FC<DeleteQuestionProps> = (props: DeleteQuestionProps) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [deleteFAQ, { error }] = MutateDeleteFAQ();

  const onDelete = () => {
    deleteFAQ({
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

  if (error) return null;

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
        dialogContent={`Are you sure you want to delete ${props.question}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </>
  );
};

export default DeleteQuestion;
