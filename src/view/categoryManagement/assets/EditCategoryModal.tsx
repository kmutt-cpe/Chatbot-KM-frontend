import React from 'react';
import { InputModal, ErrorModal, AlertModal } from '../../../component';
import { Color } from '../../../assets/css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import { MutateUpdateCategory } from '../../../domain/mutation/category.mutation';
import { useSelector } from 'react-redux';
import { RootReducersType } from '../../../lib/redux/reducers';
import { ModeratorAccess } from '../../../common/role';

interface EditCategoryModalProps {
  category?: string;
  id?: string;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = (props: EditCategoryModalProps) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);
  const [updateCategory, { error }] = MutateUpdateCategory();

  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

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
    <>
      <IconButton
        onClick={() => {
          for (const userRole of ModeratorAccess)
            if (role === userRole) {
              setModal(true);
              return;
            }
          setAlertModal(true);
        }}
        size="small"
      >
        <EditRoundedIcon style={{ color: Color.secondary }} />
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

export default EditCategoryModal;
