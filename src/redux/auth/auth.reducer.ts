import { AuthAction, AuthActionType, AuthState } from './auth.type';

const AuthReducer = (state: AuthState = { isAuth: false }, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.SET_AUTH:
      return {
        isAuth: true,
        authData: action.authData,
      };
    case AuthActionType.REMOVE_AUTH:
      return { isAuth: false };
    default:
      return state;
  }
};

export default AuthReducer;
