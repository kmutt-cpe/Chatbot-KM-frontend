export type UserType = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export type ErrorUserType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
};
