export type CreateUserType = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export type EditUserType = {
  username: string;
  name: string;
};

export type EditPasswordType = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type ErrorUserType = {
  username?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
};
