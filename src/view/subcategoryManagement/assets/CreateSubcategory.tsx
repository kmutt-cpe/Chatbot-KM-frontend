import React from 'react';
import { InputModal } from '../../../component';
import { Button } from '@material-ui/core';

const CreateSubcategory: React.FC = (props) => {
  const [modal, setModal] = React.useState(false);
  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const onCreate = (desc?: string) => {
    // todo: Add on confirm create
    setModal(false);
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        style={{ fontSize: '12px' }}
        onClick={onOpenModal}
      >
        CREATE SUBCATEGORY
      </Button>
      <InputModal
        open={modal}
        onAction={onCreate}
        onReject={onCloseModal}
        onClose={onCloseModal}
        dialogTitle="CREATE SUBCATEGORY"
        actionText="Create"
        rejectText="Cancel"
      />
    </>
  );
};

export default CreateSubcategory;
