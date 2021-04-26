import React from 'react';
import { Fab } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { InputModal } from '../../../component';

interface EditCategoryPopupProps {
  category?: string;
  id?: string;
}

const EditCategoryPopup: React.FC<EditCategoryPopupProps> = (props: EditCategoryPopupProps) => {
  const { category, id } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEditCategory = (category?: string) => {
    console.log(category);
    setOpen(false);
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="edit"
        size="small"
        style={{ width: '36px', height: '36px' }}
        onClick={handleOpen}
      >
        <EditRoundedIcon style={{ height: '18px' }} />
      </Fab>
      <InputModal
        open={open}
        onAction={onEditCategory}
        onClose={handleClose}
        onReject={handleClose}
        actionText="Save"
        rejectText="Cancel"
        dialogTitle="EDIT CATEGORY"
        value={category}
      />
    </div>
  );
};

export default EditCategoryPopup;
