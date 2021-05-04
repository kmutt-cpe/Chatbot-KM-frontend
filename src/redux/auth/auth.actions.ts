import { AuthActionType, AuthData, AuthAction } from './auth.type';

export const setAuth = (authData: AuthData): AuthAction => ({
  type: AuthActionType.SET_AUTH,
  authData,
});

export const removeAuth = (): AuthAction => ({
  type: AuthActionType.REMOVE_AUTH,
});
