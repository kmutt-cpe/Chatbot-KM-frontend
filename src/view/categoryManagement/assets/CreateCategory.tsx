import React from 'react';
import { InputModal } from '../../../component';
import { Button } from '@material-ui/core';

const CreateCategory: React.FC = (props) => {
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
    <div>
      <Button
        color="primary"
        variant="contained"
        style={{ fontSize: '12px' }}
        onClick={onOpenModal}
      >
        CREATE CATEGORY
      </Button>
      <InputModal
        open={modal}
        onAction={onCreate}
        onReject={onCloseModal}
        onClose={onCloseModal}
        dialogTitle="CREATE CATEGORY"
        actionText="Create"
        rejectText="Cancel"
      />
    </div>
  );
};

export default CreateCategory;
