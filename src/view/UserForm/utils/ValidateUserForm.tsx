import { UserType, ErrorUserType } from './UserType';
import { FormikConfig } from 'formik';

export const ValidateUserForm: FormikConfig<UserType>['validate'] = (values) => {
  const errors: ErrorUserType = {};
  if (!values.username) errors.username = 'Required';
  else if (!/([A-Za-z0-9]+)/i.test(values.username))
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
  } else if (values.password != values.confirmPassword) {
    errors.confirmPassword = 'Confirm password must same with password';
  }

  if (!values.name) {
    errors.name = 'Required';
  } else if (!/(([\u0E00-\u0E7Fa-zA-Z]+)( |)([\u0E00-\u0E7Fa-zA-Z]+))/u.test(values.name)) {
    errors.name = 'Invalid name';
  } else if (values.name.length > 50) errors.name = 'Name is too long';

  return errors;
};
