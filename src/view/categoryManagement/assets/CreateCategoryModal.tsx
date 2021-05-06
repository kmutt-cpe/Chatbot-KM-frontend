import React from 'react';
import { InputModal, ErrorModal } from '../../../component';
import { Button } from '@material-ui/core';
import { MutateCreateCategory } from '../../../domain/mutation/category.mutation';

const CreateCategoryModal: React.FC = () => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [createCategory, { error }] = MutateCreateCategory();

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
        onClick={() => setModal(true)}
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
    </>
  );
};

export default CreateCategoryModal;
