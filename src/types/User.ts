export interface ListItem {
  id: string;
  name: string;
  quantity: number;
  completed: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  numberOfItems: number;
  note?: string;
  items: ListItem[];
}

export interface User {
  id: number;
  name: string;
  surname: string;
  number: string;
  email: string;
  password: string;
  lists: ShoppingList[];
}
