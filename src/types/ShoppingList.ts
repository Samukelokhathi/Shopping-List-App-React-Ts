export interface ShoppingItem {
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
}
