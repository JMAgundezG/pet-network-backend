export interface UsersListItem {
  name: string;
  image?: string;
  id?: number;
}

export interface UserData {
  name: string;
  description: string;
  image?: string;
}

export interface UserListData {
  users: UsersListItem[];
  currentPage: number;
  numberOfPages: number;
}
