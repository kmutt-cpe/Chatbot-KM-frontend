/* eslint-disable @typescript-eslint/ban-types */
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { QueryCheckAuth } from '../../domain/query/auth.query';
import { AuthActionType } from '../../lib/redux/auth/auth.type';
import Cookies from 'universal-cookie';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const dispatch = useDispatch();
  const { data, loading } = QueryCheckAuth();
  if (loading) return <CircularProgress />;

  const authData = data && data.checkAuth;
  if (authData && authData?.authorization && authData?.authorization !== '') {
    dispatch({
      type: AuthActionType.SET_AUTH,
      authData,
    });
    return <Route {...rest}>{children}</Route>;
  }

  dispatch({
    type: AuthActionType.REMOVE_AUTH,
  });
  const cookies = new Cookies();
  cookies.remove('user');
  cookies.remove('authorization');
  return <Redirect to="/sign-in" />;
};

export default PrivateRoute;
