import React from 'react';
import { ConfirmModal, ErrorModal, AlertModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';
import { MutateDeleteFAQ } from '../../../domain/mutation/faq.mutation';
import { RootReducersType } from '../../../lib/redux/reducers';
import { useSelector } from 'react-redux';
import { ModeratorAccess } from '../../../common/role';

interface DeleteQuestionProps {
  question?: string;
  id?: string;
}

const DeleteQuestion: React.FC<DeleteQuestionProps> = (props: DeleteQuestionProps) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);
  const [deleteFAQ, { error }] = MutateDeleteFAQ();

  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

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

  return (
    <>
      <IconButton
        onClick={() => {
          for (const userRole of ModeratorAccess)
            if (role === userRole) {
              setModal(true);
              break;
            }
          setAlertModal(true);
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
        dialogTitle="Delete confirmation"
        dialogContent={`Are you sure you want to delete ${props.question}?`}
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

export default DeleteQuestion;
