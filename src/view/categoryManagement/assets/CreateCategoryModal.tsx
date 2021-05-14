import React from 'react';
import { InputModal, ErrorModal, AlertModal } from '../../../component';
import { Button } from '@material-ui/core';
import { MutateCreateCategory } from '../../../domain/mutation/category.mutation';
import { useSelector } from 'react-redux';
import { RootReducersType } from '../../../lib/redux/reducers';
import { ModeratorAccess } from '../../../common/role';

const CreateCategoryModal: React.FC = () => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [alertModal, setAlertModal] = React.useState(false);
  const [createCategory, { error }] = MutateCreateCategory();

  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

  const onCreate = (category?: string) => {
    setModal(false);
    createCategory({ variables: { category: { category } } })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        setErrorModal(true);
      });
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        style={{ fontSize: '12px' }}
        onClick={() => {
          for (const userRole of ModeratorAccess) {
            if (role === userRole) return setModal(true);
          }
          setAlertModal(true);
        }}
      >
        CREATE CATEGORY
      </Button>
      <InputModal
        open={modal}
        onAction={onCreate}
        onReject={() => setModal(false)}
        onClose={() => setModal(false)}
        dialogTitle="CREATE CATEGORY"
        actionText="Create"
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

export default CreateCategoryModal;
