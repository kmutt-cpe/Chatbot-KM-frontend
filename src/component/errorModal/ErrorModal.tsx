import { ApolloError } from '@apollo/client';
import React from 'react';
import AlertModal from '../alertModal/AlertModal';

interface ErrorModalProps {
  open: boolean;
  handleClose: () => void;
  error?: ApolloError;
  alertTitle?: string;
  errorMessage?: string;
}

const ErrorModal: React.FC<ErrorModalProps> = (props: ErrorModalProps) => {
  const { error, open, handleClose, alertTitle, errorMessage } = props;
  let message = '';
  if (error && error.graphQLErrors.length > 0) {
    message = errorMessage || error.graphQLErrors[0].message;
  }

  return (
    <AlertModal
      open={open}
      handleClose={handleClose}
      alertTitle={alertTitle || 'Error'}
      alertMessage={message}
    />
  );
};

export default ErrorModal;
