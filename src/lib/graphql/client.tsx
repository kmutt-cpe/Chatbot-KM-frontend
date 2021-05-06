import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ServerError } from '@apollo/client/link/utils';
import { useHistory } from 'react-router-dom';
import { AuthActionType } from '../redux/auth/auth.type';
import { useDispatch } from 'react-redux';
import HttpStatusCode from '../../common/httpStatusCode';

export const END_POINT = process.env.REACT_APP_BACKEND_API || 'http://localhost:3000/api/graphql';
const httpLink = new HttpLink({ uri: END_POINT, credentials: 'include' });

// const useLogout = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   dispatch({ type: AuthActionType.REMOVE_AUTH });
//   return {
//     goBack: () => {
//       history.push('/sign-in');
//     },
//   };
// };

const logoutLink = onError(({ networkError }) => {
  if ((networkError as ServerError)?.statusCode === HttpStatusCode.UNAUTHORIZED) {
    window.location.replace('/logout');
    // const { goBack } = useLogout();
    // goBack();
  } else if ((networkError as ServerError)?.statusCode === HttpStatusCode.NOT_IMPLEMENTED) {
    alert(networkError?.message);
    window.location.replace('/');
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});
