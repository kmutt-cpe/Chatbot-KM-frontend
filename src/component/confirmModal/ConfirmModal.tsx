import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';

interface PopupPropsInterface {
  onAction?: () => void;
  onReject?: () => void;
  onClose?: () => void;
  dialogTitle?: string;
  dialogContent?: string;
  rejectText?: string;
  actionText?: string;
  open: boolean;
}

const confirmModal: React.FC<PopupPropsInterface> = (props: PopupPropsInterface) => {
  const dialogContent = props.dialogContent ? (
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{props.dialogContent}</DialogContentText>
    </DialogContent>
  ) : null;

  const dialogTitle = props.dialogTitle ? (
    <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
  ) : null;

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {dialogTitle}
      {dialogContent}
      <DialogActions>
        <Button onClick={props.onReject} color="secondary">
          {props.rejectText ? props.rejectText : 'No'}
        </Button>
        <Button onClick={props.onAction} color="primary" autoFocus>
          {props.actionText ? props.actionText : 'Yes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default confirmModal;
