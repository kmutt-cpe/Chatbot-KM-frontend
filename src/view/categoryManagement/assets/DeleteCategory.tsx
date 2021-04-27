import React from 'react';
import { ConfirmModal } from '../../../component';
import { Color } from '../../../assets/css';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

interface DeleteCategoryProps {
  category?: string;
  id?: string;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = (props: DeleteCategoryProps) => {
  const [modal, setModal] = React.useState(false);
  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const onDelete = () => {
    // todo: Add on confirm delete
    setModal(false);
  };

  return (
    <div>
      <DeleteRoundedIcon style={{ color: Color.red, height: '18px' }} onClick={onOpenModal} />
      <ConfirmModal
        open={modal}
        onAction={onDelete}
        onReject={onCloseModal}
        onClose={onCloseModal}
        dialogContent={`Are you sure, you want to delete ${props.category}?`}
        actionText="Delete"
        rejectText="Cancel"
      />
    </div>
  );
};

export default DeleteCategory;
