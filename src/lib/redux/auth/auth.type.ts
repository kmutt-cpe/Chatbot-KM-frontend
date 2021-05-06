import { Auth } from '../../../domain/interfaces/auth.interface';

export enum AuthActionType {
  SET_AUTH = 'SET_AUTH',
  REMOVE_AUTH = 'REMOVE_AUTH',
}

export type AuthAction = {
  type: AuthActionType;
  authData?: Auth;
};

export type AuthState = {
  isAuth: boolean;
  authData?: Auth;
};
