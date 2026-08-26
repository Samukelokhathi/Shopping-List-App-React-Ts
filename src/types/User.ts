export interface ShoppingList {
  id: string;
  name: string;
  numberOfItems: number;
  note?: string;
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
