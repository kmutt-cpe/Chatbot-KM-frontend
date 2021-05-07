import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { User } from '../interfaces/user.interface';

export const QueryAllUser = () => {
  const getAllUserGql = gql`
    query getAllUser {
      getAllUser {
        id
        username
        role
        name
      }
    }
  `;

  return useQuery<{ getAllUser: User[] }>(getAllUserGql, {
    fetchPolicy: 'network-only',
  });
};

export const QueryUserById = (id: string) => {
  const getUserByIdGql = gql`
    query getUserById($id: ID!) {
      getUserById(id: $id) {
        id
        username
        role
        name
      }
    }
  `;
  return useQuery<{ getUserById: User }>(getUserByIdGql, {
    fetchPolicy: 'network-only',
    variables: { id },
  });
};
