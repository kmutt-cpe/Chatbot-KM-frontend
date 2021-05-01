import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

interface AlertModalProps {
  open: boolean;
  handleClose: () => void;
  alertTitle: string;
  alertMessage: string;
}

const AlertModal: React.FC<AlertModalProps> = (props: AlertModalProps) => {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle id="alert-dialog-title">{props.alertTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.alertMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertModal;
