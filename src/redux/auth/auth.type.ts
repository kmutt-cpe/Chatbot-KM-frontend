export enum AuthActionType {
  SET_AUTH = 'SET_AUTH',
  REMOVE_AUTH = 'REMOVE_AUTH',
}

export type AuthData = {
  id: string;
  username: string;
  role: string;
  token: string;
};

export type AuthAction = {
  type: AuthActionType;
  authData?: AuthData;
};

export type AuthState = {
  isAuth: boolean;
  authData?: AuthData;
};
