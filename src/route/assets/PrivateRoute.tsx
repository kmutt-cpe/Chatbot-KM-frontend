/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { RootReducersType } from '../../redux/reducers';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }: RouteProps) => {
  const isAuth = useSelector((state: RootReducersType) => state.AuthReducer.isAuth);
  if (!isAuth) return <Redirect to="/sign-in" />;
  else return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
