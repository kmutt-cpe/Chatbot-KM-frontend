import React from 'react';
import { InputModal, ErrorModal } from '../../../component';
import { Button } from '@material-ui/core';
import { MutateCreateSubcategory } from '../../../domain/mutation/subcategory.mutation';

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
        onClick={() => setModal(true)}
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
    </>
  );
};

export default CreateSubcategoryModal;
