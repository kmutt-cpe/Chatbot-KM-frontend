import { CreateUserType, EditPasswordType, EditUserType, ErrorUserType } from './UserType';
import { FormikConfig } from 'formik';

export const ValidateCreateUserForm: FormikConfig<CreateUserType>['validate'] = (values) => {
  const errors: ErrorUserType = {};
  if (!values.username) errors.username = 'Required';
  else if (!/^[a-z0-9_-]+$/gi.test(values.username))
    errors.username = 'Username must contain only alphabet or number';
  else if (values.username.length > 20) errors.username = 'Username is too long';
  else if (values.username.length < 5) errors.username = 'Username is too short';

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less';
  } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/u.test(values.password))
    errors.password =
      'Password must contain at least 8 character, one lower case, one upper case, and one digit';
  else if (values.password.length > 50) errors.password = 'Password is too long';

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm password must same with password';
  }

  if (!values.name) {
    errors.name = 'Required';
  } else if (!/(([\u0E00-\u0E7Fa-zA-Z]+)( |)([\u0E00-\u0E7Fa-zA-Z]+))/u.test(values.name)) {
    errors.name = 'Invalid name';
  } else if (values.name.length > 50) errors.name = 'Name is too long';

  if (!values.role) errors.role = 'Required';

  return errors;
};

export const ValidateEditUserForm: FormikConfig<EditUserType>['validate'] = (values) => {
  const errors: ErrorUserType = {};
  if (!values.username) errors.username = 'Required';
  else if (!/([A-Za-z0-9]+)/i.test(values.username))
    errors.username = 'Username must contain only alphabet or number';
  else if (values.username.length > 20) errors.username = 'Username is too long';
  else if (values.username.length < 3) errors.username = 'Username is too short';

  if (!values.name) {
    errors.name = 'Required';
  } else if (!/(([\u0E00-\u0E7Fa-zA-Z]+)( |)([\u0E00-\u0E7Fa-zA-Z]+))/u.test(values.name)) {
    errors.name = 'Invalid name';
  } else if (values.name.length > 50) errors.name = 'Name is too long';

  if (!values.role) errors.role = 'Required';

  return errors;
};

export const ValidateEditPasswordForm: FormikConfig<EditPasswordType>['validate'] = (values) => {
  const errors: ErrorUserType = {};
  if (!values.editorPassword) {
    errors.editorPassword = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 20) {
    errors.password = 'Must be 20 characters or less';
  } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/u.test(values.password))
    errors.password =
      'Password must contain at least 8 character, one lower case, one upper case, and one digit';
  else if (values.password.length > 50) errors.password = 'Password is too long';

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Confirm password must same with password';
  }

  return errors;
};
