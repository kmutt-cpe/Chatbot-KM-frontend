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
  editorPassword: string;
  password: string;
  confirmPassword: string;
};

export type ErrorUserType = {
  username?: string;
  editorPassword?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
};
