import { type ShoppingList } from "./ShoppingList";

export interface User {
    // id: number;
    name: string;
    surname: string;
    number: string;
    email: string;
    password: string;
    lists: ShoppingList[]
}