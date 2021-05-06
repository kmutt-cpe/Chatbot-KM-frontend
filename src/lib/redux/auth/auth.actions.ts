import { Auth } from '../../../domain/interfaces/auth.interface';
import { AuthActionType, AuthAction } from './auth.type';

export const setAuth = (authData: Auth): AuthAction => ({
  type: AuthActionType.SET_AUTH,
  authData,
});

export const removeAuth = (): AuthAction => ({
  type: AuthActionType.REMOVE_AUTH,
});
