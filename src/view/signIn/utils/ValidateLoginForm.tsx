import { LoginType, ErrorLoginType } from './LoginType';
import { FormikConfig } from 'formik';

export const ValidateLoginForm: FormikConfig<LoginType>['validate'] = (values) => {
  const errors: ErrorLoginType = {};
  if (!values.username) errors.username = 'Username cannot by empty';

  if (!values.password) {
    errors.password = 'Password cannot by empty';
  }

  return errors;
};
