import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getShoppingLists } from "../../store/ShoppingList/ShoppingList";
import type { AppDispatch, RootState } from "../../store/Store";
import Button from "../../components/Button/Button";
import style from "./ShoppingListDetails.module.css";
import Modal from "../../components/Modal/Modal";
import { Input } from "../../components/Input/Input";

export default function ShoppingListDetails() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Properly pull Redux variables into the component scope
  const { lists, isLoading, error } = useSelector(
    (state: RootState) => state.shoppingList,
  );
  const currentUserId = useSelector((state: RootState) => state.login.user?.id);

  // 2. Extract the target list ID from React Router navigation state
  const routerState = location.state;
  const targetId =
    typeof routerState === "object" && routerState !== null
      ? routerState.id
      : routerState;

  // 3. Fetch data using the CURRENT USER ID (Not the list ID!)
  useEffect(() => {
    if (currentUserId) {
      dispatch(getShoppingLists(currentUserId));
    }
  }, [dispatch, currentUserId]);

  // 4. Find the matching list using string-safe conversion
  const list = lists.find((item) => String(item.id) === String(targetId));

  // 6. Handle Async Status Screens
  if (isLoading) {
    return <div className={style.container}>Loading your shopping list...</div>;
  }

  if (error) {
    return <div className={style.container}>Error: {error}</div>;
  }

  if (!list) {
    return (
      <div className={style.container}>
        <h2>List not found</h2>
        <p>We couldn't locate a list matching ID: {String(targetId)}</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.listDetails}>
        <h1 className={style.listName}>{list.name}</h1>
        <p className={style.listNote}>{list.note}</p>

        <div>
          <Button variant="primary">Delete List</Button>
          <Button variant="primary">Share List</Button>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Add Item
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Creating Shopping list"
          >
            <form onSubmit={(e) => e.preventDefault()}>
              <label className={style.label}>Item Name</label>
              <Input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />

              <label className={style.label}>Quantity</label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                required
              />

              <label className={style.label}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={style.select}
              >
                <option value="">Select a category</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
              </select>

              <label className={style.label}>Optional Note</label>
              <Input
                type="textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button type="submit">Create List</Button>
            </form>
          </Modal>
        </div>
      </div>

      <div className={style.displayItems}></div>
    </div>
  );
}
