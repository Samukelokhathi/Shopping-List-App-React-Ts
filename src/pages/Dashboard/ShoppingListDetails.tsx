import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    getShoppingLists,
    addListItem,
    deleteListItem,
    updateListItem,
    toggleListItem,
} from "../../store/ShoppingList/ShoppingList";
import type { AppDispatch, RootState } from "../../store/Store";
import Button from "../../components/Button/Button";
import style from "./ShoppingListDetails.module.css";
import Modal from "../../components/Modal/Modal";
import { Input } from "../../components/Input/Input";
import ItemCard from "../../components/ShoppingListCard/ItemCard.tsx";
import type { ListItem } from "../../types/User";

export default function ShoppingListDetails() {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("");
    const [note, setNote] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ListItem | null>(null);
    const [search, setSearch] = useState("");

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

    // 3. Fetch data using the CURRENT USER ID
    useEffect(() => {
        if (currentUserId) {
            dispatch(getShoppingLists(currentUserId));
        }
    }, [dispatch, currentUserId]);

    // 4. Find the matching list using string-safe conversion
    const list = lists.find((item) => String(item.id) === String(targetId));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!currentUserId || !targetId) {
            console.error("Missing user ID or shopping list ID");
            return;
        }

        try {
            if (editingItem) {
                const updatedItem: ListItem = {
                    ...editingItem,
                    name: itemName,
                    quantity,
                    category,
                    note,
                    imageUrl,
                };

                await dispatch(
                    updateListItem({
                        userId: currentUserId,
                        listId: String(targetId),
                        item: updatedItem,
                    }),
                ).unwrap();
            } else {
                const newItem: ListItem = {
                    id: Date.now().toString(),
                    name: itemName,
                    quantity,
                    category,
                    note,
                    completed: false,
                    createdAt: new Date().toISOString(),
                    imageUrl,
                };

                await dispatch(
                    addListItem({
                        userId: currentUserId,
                        listId: String(targetId),
                        item: newItem,
                    }),
                ).unwrap();
            }

            setItemName("");
            setQuantity(1);
            setCategory("");
            setNote("");
            setImageUrl("");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save item:", error);
        }
    };

    // Handle Edit Item
    const handleEditItem = (itemId: string) => {
        const item = list?.items.find(
            (item) => String(item.id) === String(itemId),
        );

        if (!item) {
            return;
        }

        setEditingItem(item);
        setItemName(item.name);
        setQuantity(item.quantity);
        setCategory(item.category || "");
        setNote(item.note || "");
        setImageUrl(item.imageUrl || "")
        setIsModalOpen(true);
    };

    // Handle Delete Item
    const handleDeleteItem = async (itemId: string) => {
        if (!currentUserId || !targetId) {
            console.error("Missing user ID or shopping list ID");
            return;
        }

        try {
            await dispatch(
                deleteListItem({
                    userId: currentUserId,
                    listId: String(targetId),
                    itemId,
                }),
            ).unwrap();
        } catch (error) {
            console.error("Failed to delete item:", error);
        }

    };

    // HANDLE TOGGLE COMPLETE ITEM

    const handleToggleCompleteItem = async (itemId: string) => {
        if (!currentUserId || !targetId) {
            console.error("Missing user ID or shopping list ID");
            return;
        }

        try {
            await dispatch(
                toggleListItem({
                    userId: currentUserId,
                    listId: String(targetId),
                    itemId,
                }),
            ).unwrap();
        } catch (error) {
            console.error("Failed to update item:", error);
        }
    };

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
                        title={editingItem ? "Edit Item" : "Add New Item"}
                    >
                        <form onSubmit={handleSubmit}>
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
                            <label className={style.label}>Image</label>
                            <Input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <Button type="submit">{editingItem ? "Update Item" : "Add Item"}</Button>
                        </form>
                    </Modal>

                </div>
            </div>
            <section className={style.filters}>
                <Input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className={style.searchInput}
                />
            </section>

            {/* Render the structural layout for list items safely */}
            <div className={style.displayItems}>
                {list.items && list.items.length > 0 ? (
                    list.items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onEdit={handleEditItem}
                            onDelete={handleDeleteItem}
                            onToggleComplete={handleToggleCompleteItem}
                        />
                    ))
                ) : (
                    <p className={style.noItems}>
                        No items in this list yet. Click "Add Item" to start!
                    </p>
                )}
            </div>
        </div>
    );
}
