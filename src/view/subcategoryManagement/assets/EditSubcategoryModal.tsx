import React from 'react';
import { InputModal, ErrorModal, AlertModal } from '../../../component';
import { Color } from '../../../assets/css';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import { MutateUpdateSubcategory } from '../../../domain/mutation/subcategory.mutation';
import { RootReducersType } from '../../../lib/redux/reducers';
import { useSelector } from 'react-redux';
import { ModeratorAccess } from '../../../common/role';

interface EditCategoryProps {
  subcategory?: string;
  id?: string;
}

const EditCategory: React.FC<EditCategoryProps> = (props: EditCategoryProps) => {
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [editSubcategory, { error }] = MutateUpdateSubcategory();

  const [alertModal, setAlertModal] = React.useState(false);
  const authData = useSelector((state: RootReducersType) => state.AuthReducer.authData);
  const role = authData && authData.role ? authData.role : '';

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
      <IconButton
        onClick={() => {
          for (const userRole of ModeratorAccess)
            if (role === userRole) {
              setModal(true);
              break;
            }
          setAlertModal(true);
        }}
        size="small"
      >
        <EditRoundedIcon style={{ color: Color.secondary }} />
      </IconButton>
      <InputModal
        open={modal}
        onAction={onEdit}
        onReject={() => setModal(false)}
        onClose={() => setModal(false)}
        value={props.subcategory}
        dialogTitle="EDIT SUBCATEGORY"
        actionText="Save"
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
    </div>
  );
};

export default EditCategory;
