enum UserRole {
  ADMIN = 'admin',
}

export const users = [
  {
    id: 'User-0',
    username: 'username1',
    password: 'password1',
    name: 'name1',
    role: UserRole.ADMIN,
  },
  {
    id: 'User-1',
    username: 'username2',
    password: 'password2',
    name: 'name2',
    role: UserRole.ADMIN,
  },
];
