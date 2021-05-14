/* eslint-disable @typescript-eslint/ban-types */
import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { QueryCheckAuth } from '../../domain/query/auth.query';
import { AuthActionType } from '../../lib/redux/auth/auth.type';
import Cookies from 'universal-cookie';
import { AlertModal } from '../../component';
import { useHistory } from 'react-router-dom';

interface PrivateRouteProps {
  accessedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps & RouteProps> = ({
  children,
  accessedRoles,
  ...rest
}: PrivateRouteProps & RouteProps) => {
  const dispatch = useDispatch();
  const { data, loading } = QueryCheckAuth();
  const history = useHistory();
  if (loading) return <CircularProgress />;

  const authData = data && data.checkAuth;
  if (authData && authData.authorization && authData.authorization !== '') {
    dispatch({
      type: AuthActionType.SET_AUTH,
      authData,
    });

    const role = data && data.checkAuth.role;
    if (accessedRoles) {
      for (const accesedRole of accessedRoles)
        if (accesedRole === role) return <Route {...rest}>{children}</Route>;

      return (
        <AlertModal
          open={true}
          handleClose={() => {
            history.goBack();
          }}
          alertTitle="Unauthorized"
          alertMessage="You don't have access to this"
        />
      );
    } else return <Route {...rest}>{children}</Route>;
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
