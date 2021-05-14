import React from 'react';
import { InputModal, ErrorModal, AlertModal } from '../../../component';
import { Button } from '@material-ui/core';
import { MutateCreateSubcategory } from '../../../domain/mutation/subcategory.mutation';
import { useSelector } from 'react-redux';
import { RootReducersType } from '../../../lib/redux/reducers';
import { ModeratorAccess } from '../../../common/role';

interface CreateSubcategoryModalProps {
  categoryId?: string;
  category?: string;
}
const CreateSubcategoryModal: React.FC<CreateSubcategoryModalProps> = (
  props: CreateSubcategoryModalProps
) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [createSubcategory, { error }] = MutateCreateSubcategory();

  const [alertModal, setAlertModal] = React.useState(false);
  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

  const onCreate = (subcategory?: string) => {
    createSubcategory({
      variables: { subcategory: { categoryId: props.categoryId, subcategory: subcategory } },
    })
      .then(() => {
        setModal(false);
        window.location.reload();
      })
      .catch(() => setErrorModal(true));
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        style={{ fontSize: '12px' }}
        onClick={() => {
          for (const userRole of ModeratorAccess)
            if (role === userRole) {
              setModal(true);
              break;
            }
          setAlertModal(true);
        }}
      >
        CREATE SUBCATEGORY
      </Button>
      <InputModal
        open={modal}
        onAction={onCreate}
        onReject={() => setModal(false)}
        onClose={() => setModal(false)}
        dialogTitle="CREATE SUBCATEGORY"
        actionText="Create"
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

export default CreateSubcategoryModal;
