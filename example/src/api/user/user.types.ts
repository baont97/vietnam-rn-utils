export interface UserDetail {
  createdAt: string;
  name: string;
  avatar: string;
  color: string;
  id: string;
}

export type GetUserListResult = UserDetail[] | Error | any;
