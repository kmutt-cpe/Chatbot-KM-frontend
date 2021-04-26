import React from 'react';
import { Button } from '@material-ui/core';
import { InputModal } from '../../../component';

const CreateCategoryPopup: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCreateCategory = (category?: string) => {
    console.log(category);
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" style={{ fontSize: '12px' }} onClick={handleOpen}>
        CREATE CATEGORY
      </Button>
      <InputModal
        open={open}
        onAction={onCreateCategory}
        onClose={handleClose}
        onReject={handleClose}
        actionText="Create"
        rejectText="Cancel"
        dialogTitle="CREATE CATEGORY"
      />
    </div>
  );
};

export default CreateCategoryPopup;
