export interface User {
  id: string;
  name: string;
  surname: string;
  number: string;
  email: string;
  password: string;
  lists: ShoppingList[];
}
export interface ShoppingList {
  id: string;
  name: string;
  numberOfItems: number;
  note?: string;
  items?: ListItem[];
  createdAt?: string;
}

export interface ListItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
  category?: string;
  note?: string;
  createdAt?: string;
}
