import { gql, useMutation } from '@apollo/client';
import { User } from '../interfaces/user.interface';

export const MutateCreateUser = () => {
  const createUserGql = gql`
    mutation createUser($user: CreateUserDto!) {
      createUser(user: $user) {
        id
        username
        name
        role
      }
    }
  `;

  return useMutation<{ createUser: User }>(createUserGql);
};

export const MutateUpdateUser = () => {
  const updateUserGql = gql`
    mutation updateUser($user: UpdateUserDto!) {
      updateUser(user: $user) {
        id
        username
        name
        role
      }
    }
  `;

  return useMutation<{ createUser: User }>(updateUserGql);
};

export const MutateSetPasswordByAdmin = () => {
  const setPasswordByAdminGql = gql`
    mutation setPasswordByAdmin($user: UpdatePasswordDto!) {
      setPasswordByAdmin(user: $user) {
        id
        username
        name
        role
      }
    }
  `;
  return useMutation<{ setPasswordByAdmin: User }>(setPasswordByAdminGql);
};

export const MutateChangePassword = () => {
  const changePasswordGql = gql`
    mutation changePassword($user: UpdatePasswordDto!) {
      changePassword(user: $user) {
        id
        username
        name
        role
      }
    }
  `;
  return useMutation<{ changePassword: User }>(changePasswordGql);
};

export const MutateDeleteUser = () => {
  const deleteUser = gql`
    mutation deleteUser($id: ID!) {
      deleteUser(id: $id) {
        id
        username
        name
        role
      }
    }
  `;
  return useMutation<{ deleteUser: User }>(deleteUser);
};
