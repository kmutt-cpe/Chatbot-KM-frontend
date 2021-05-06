import React from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Auth } from '../interfaces/auth.interface';

export const QueryLogin = () => {
  const loginGql = gql`
    query login($username: String!, $password: String!) {
      login(login: { username: $username, password: $password }) {
        id
        username
      }
    }
  `;

  return useLazyQuery<{ login: Auth }>(loginGql, {
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });
};

export const QueryLogout = () => {
  const logoutGql = gql`
    {
      logout {
        authorization
      }
    }
  `;

  return useQuery(logoutGql, { fetchPolicy: 'no-cache' });
};

export const QueryCheckAuth = () => {
  const checkAuthGql = gql`
    query checkAuth {
      checkAuth {
        id
        username
        authorization
        role
      }
    }
  `;
  return useQuery<{ checkAuth: Auth }>(checkAuthGql, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });
};
