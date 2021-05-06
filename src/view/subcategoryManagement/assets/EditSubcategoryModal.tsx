import React from 'react';
import { InputModal, ErrorModal } from '../../../component';
import { Color } from '../../../assets/css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import { MutateUpdateSubcategory } from '../../../domain/mutation/subcategory.mutation';

interface EditCategoryProps {
  subcategory?: string;
  id?: string;
}

const EditCategory: React.FC<EditCategoryProps> = (props: EditCategoryProps) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [editSubcategory, { error }] = MutateUpdateSubcategory();

  const onOpenModal = () => {
    setModal(true);
  };

  const onCloseModal = () => {
    setModal(false);
  };

  const onEdit = (subcategory?: string) => {
    editSubcategory({ variables: { subcategory: { id: props.id, subcategory } } })
      .then(() => {
        setModal(false);
        window.location.reload();
      })
      .catch(() => setErrorModal(true));
  };

  return (
    <div>
      <IconButton onClick={onOpenModal} size="small">
        <EditRoundedIcon style={{ color: Color.secondary }} />
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
      <ErrorModal open={errorModal} handleClose={() => setErrorModal(false)} error={error} />
    </div>
  );
};

export default EditCategory;
