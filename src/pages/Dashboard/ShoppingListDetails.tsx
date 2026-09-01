import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getShoppingLists } from "../../store/ShoppingList/ShoppingList";
import type { AppDispatch } from "../../store/Store";

export default function ShoppingListDetails() {
  const location = useLocation();
  const state = location.state;
  console.log(state);

  const dispatch = useDispatch<AppDispatch>();

  dispatch(getShoppingLists(state));
  return (
    <div>
      <h1>Shopping List Details</h1>
    </div>
  );
}
