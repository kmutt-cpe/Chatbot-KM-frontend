import _ from 'lodash';

export const UserRole = {
  ROOT: 'root',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  READER: 'reader',
};

export const AdminAccess = [UserRole.ROOT, UserRole.ADMIN];
export const ModeratorAccess = [UserRole.ROOT, UserRole.ADMIN, UserRole.MODERATOR];
export const UserRoleList = _.values(UserRole).filter((role) => role != UserRole.ROOT && role);
