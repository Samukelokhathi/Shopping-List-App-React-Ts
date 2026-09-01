import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/Store";
import { addListItem, deleteListItem } from "../../store/ShoppingList/ShoppingList";
import { Text } from "../../components/Text/Text";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import styles from "./ShoppingItems.module.css";

const ShoppingItems = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) => state.login.user);
    const list = user?.lists.find((l) => l.id === id);

    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(1);

    if (!list) {
        return <Text variant="p">List not found.</Text>;
    }

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const newItem = {
            id: Date.now().toString(),
            name: itemName,
            quantity,
            completed: false,
            imageUrl: "", // Add imageUrl here if needed
        };

        try {
            await dispatch(
                addListItem({
                    userId: user.id,
                    listId: list.id,
                    item: newItem,
                })
            ).unwrap();

            setItemName("");
            setQuantity(1);
        } catch (error) {
            console.error("Failed to add item:", error);
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!user) return;

        try {
            await dispatch(
                deleteListItem({
                    userId: user.id,
                    listId: list.id,
                    itemId,
                })
            ).unwrap();
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    return (
        <div className={styles.container}>
            <Text variant="h2">{list.name} Items</Text>

            <form onSubmit={handleAddItem} className={styles.form}>
                <Input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Item name"
                    required
                />
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                />
                <Button type="submit">Add Item</Button>
            </form>

            <section className={styles.items}>
                {list.items && list.items.length > 0 ? (
                    list.items.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <Text variant="p">
                                {item.name} — {item.quantity}
                            </Text>
                            <Button onClick={() => handleDeleteItem(item.id)}>Delete</Button>
                        </div>
                    ))
                ) : (
                    <Text variant="p">No items yet. Add some above.</Text>
                )}
            </section>
        </div>
    );
};

export default memo(ShoppingItems);
