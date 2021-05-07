import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { QueryLogout } from '../../domain/query/auth.query';
import { AuthActionType } from '../../lib/redux/auth/auth.type';
import { CircularProgress } from '@material-ui/core';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  dispatch({ type: AuthActionType.REMOVE_AUTH });
  const { loading } = QueryLogout();

  if (loading) {
    return <CircularProgress />;
  }
  return <Redirect to={'/sign-in'} />;
};

export default Logout;
