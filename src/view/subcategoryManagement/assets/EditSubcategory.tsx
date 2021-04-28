import React from 'react';
import { InputModal } from '../../../component';
import { Color } from '../../../assets/css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';

interface EditCategoryProps {
  subcategory?: string;
  id?: string;
}

const EditCategory: React.FC<EditCategoryProps> = (props: EditCategoryProps) => {
  const [modal, setModal] = React.useState(false);
  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const onEdit = (desc?: string) => {
    // todo: Add on confirm edit
    setModal(false);
  };

  return (
    <div>
      <IconButton onClick={onOpenModal} size="small">
        <EditRoundedIcon style={{ color: Color.secondary }} onClick={onOpenModal} />
      </IconButton>
      <InputModal
        open={modal}
        onAction={onEdit}
        onReject={onCloseModal}
        onClose={onCloseModal}
        value={props.subcategory}
        dialogTitle="EDIT SUBCATEGORY"
        actionText="Save"
        rejectText="Cancel"
      />
    </div>
  );
};

export default EditCategory;
