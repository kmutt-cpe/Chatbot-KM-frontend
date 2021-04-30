import { SignInType, ErrorSignInType } from './SignInType';
import { FormikConfig } from 'formik';

export const ValidateSignInForm: FormikConfig<SignInType>['validate'] = (values) => {
  const errors: ErrorSignInType = {};
  if (!values.username) errors.username = 'Username cannot by empty';

  if (!values.password) {
    errors.password = 'Password cannot by empty';
  }

  return errors;
};
