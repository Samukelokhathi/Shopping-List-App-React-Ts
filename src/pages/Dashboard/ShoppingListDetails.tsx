import detailsStyle from "./ShoppingListDetails.module.css";
import Navbar from "../../components/Nav/NavBar";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Text } from "../../components/Text/Text";

import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";

import type { RootState, AppDispatch } from "../../store/Store";

import {
    deleteShoppingList,
    getShoppingLists,
    addShoppingList,
    editItemInList,
    deleteItemFromList,
} from "../../store/ShoppingList/ShoppingList";

import type { ListItem } from "../../types/User";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser } from "../../store/Auth/Login";

// Simple palette to color each item's avatar, based on the item's name
const avatarColors = ["#f0a63d", "#5b8dee", "#e06666", "#4caf82", "#9575cd"];

const getAvatarColor = (name: string) => {
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
};

const formatDate = (iso?: string) => {
    if (!iso) return null;

    const date = new Date(iso);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}/${month}/${day}`;
};

const ShoppingListDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Edit list modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editNote, setEditNote] = useState("");

    // Add/Edit item modal state (shared, editingItemId tells them apart)
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [itemName, setItemName] = useState("");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemNote, setItemNote] = useState("");

    // Search + sort for items
    const [itemSearch, setItemSearch] = useState("");
    const [itemSort, setItemSort] = useState("date");

    // Get logged-in user
    const user = useSelector((state: RootState) => state.login.user);

    // Same refresh-restore pattern as Home.tsx,
    // so this page also survives a page refresh.
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (userId && !user) {
            dispatch(getLoggedInUser());
        }
    }, [dispatch, user]);

    const list = user?.lists.find((list) => list.id === id);

    const items = list?.items || [];

    // Search items
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(itemSearch.toLowerCase()),
    );

    // Sort items
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (itemSort === "name") {
            return a.name.localeCompare(b.name);
        }

        if (itemSort === "date" && a.createdAt && b.createdAt) {
            return b.createdAt.localeCompare(a.createdAt);
        }

        return 0;
    });

    const completedCount = items.filter((item) => item.completed).length;

    const openEditModal = () => {
        if (!list) return;

        setEditName(list.name);
        setEditNote(list.note || "");
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!user || !list) {
            console.log("No user or list found");
            return;
        }

        try {
            await dispatch(
                editShoppingList({
                    userId: user.id,
                    listId: list.id,
                    name: editName,
                    note: editNote,
                }),
            ).unwrap();

            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Failed to edit shopping list:", error);
        }
    };

    const handleDelete = async () => {
        if (!user || !list) {
            console.log("No user or list found");
            return;
        }

        try {
            await dispatch(
                deleteShoppingList({
                    userId: user.id,
                    listId: list.id,
                }),
            ).unwrap();

            navigate("/home");
        } catch (error) {
            console.error("Failed to delete shopping list:", error);
        }
    };

    const openAddItemModal = () => {
        setItemName("");
        setItemQuantity("");
        setItemCategory("");
        setItemNote("");
        setEditingItemId(null);
        setIsItemModalOpen(true);
    };

    const openEditItemModal = (item: ListItem) => {
        setItemName(item.name);
        setItemQuantity(String(item.quantity));
        setItemCategory(item.category || "");
        setItemNote(item.note || "");
        setEditingItemId(item.id);
        setIsItemModalOpen(true);
    };

    const handleItemSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!user || !list) {
            console.log("No user or list found");
            return;
        }

        try {
            if (editingItemId) {
                await dispatch(
                    editItemInList({
                        userId: user.id,
                        listId: list.id,
                        itemId: editingItemId,
                        updates: {
                            name: itemName,
                            quantity: Number(itemQuantity),
                            category: itemCategory,
                            note: itemNote,
                        },
                    }),
                ).unwrap();
            } else {
                const newItem: ListItem = {
                    id: Date.now().toString(),
                    name: itemName,
                    quantity: Number(itemQuantity),
                    completed: false,
                    category: itemCategory,
                    note: itemNote,
                    createdAt: new Date().toISOString(),
                };

                await dispatch(
                    addItemToList({
                        userId: user.id,
                        listId: list.id,
                        item: newItem,
                    }),
                ).unwrap();
            }

            setIsItemModalOpen(false);
        } catch (error) {
            console.error("Failed to save item:", error);
        }
    };

    const handleToggleItem = async (item: ListItem) => {
        if (!user || !list) return;

        try {
            await dispatch(
                editItemInList({
                    userId: user.id,
                    listId: list.id,
                    itemId: item.id,
                    updates: { completed: !item.completed },
                }),
            ).unwrap();
        } catch (error) {
            console.error("Failed to update item:", error);
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!user || !list) return;

        try {
            await dispatch(
                deleteItemFromList({
                    userId: user.id,
                    listId: list.id,
                    itemId,
                }),
            ).unwrap();
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: list?.name,
                    url: shareUrl,
                });
            } catch (error) {
                console.error("Share cancelled or failed:", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard");
            } catch (error) {
                console.error("Failed to copy link:", error);
            }
        }
    };

    if (!list) {
        return (
            <div className={detailsStyle.container}>
                <Navbar />

                <main className={detailsStyle.main}>
                    <Text variant="p">Shopping list not found.</Text>
                </main>
            </div>
        );
    }

    return (
        <div className={detailsStyle.container}>
            <Navbar />

            <main className={detailsStyle.main}>
                <button
                    className={detailsStyle.backLink}
                    onClick={() => navigate("/home")}
                >
                    ← All lists
                </button>

                <section className={detailsStyle.card}>
                    <div className={detailsStyle.cardHeader}>
                        <div>
                            <Text variant="h1">{list.name}</Text>

                            <Text variant="p" className={detailsStyle.subInfo}>
                                {completedCount}/{items.length} collected
                                {list.createdAt ? ` · created ${formatDate(list.createdAt)}` : ""}
                            </Text>
                        </div>

                        <div className={detailsStyle.actions}>
                            <Button
                                className={detailsStyle.shareButton}
                                onClick={handleShare}
                            >
                                Share
                            </Button>

                            <Button
                                className={detailsStyle.addButton}
                                onClick={openAddItemModal}
                            >
                                + Add item
                            </Button>

                            <Button
                                className={detailsStyle.editButton}
                                onClick={openEditModal}
                            >
                                Edit
                            </Button>

                            <Button
                                className={detailsStyle.deleteButton}
                                onClick={handleDelete}
                            >
                                Delete list
                            </Button>
                        </div>
                    </div>
                </section>

                <section className={detailsStyle.controls}>
                    <Input
                        type="text"
                        value={itemSearch}
                        onChange={(event) => setItemSearch(event.target.value)}
                        className={detailsStyle.searchInput}
                    />

                    <select
                        value={itemSort}
                        onChange={(event) => setItemSort(event.target.value)}
                        className={detailsStyle.sortSelect}
                    >
                        <option value="date">Date added</option>
                        <option value="name">Name</option>
                    </select>
                </section>

                <section className={detailsStyle.items}>
                    {sortedItems.length > 0 ? (
                        sortedItems.map((item) => (
                            <div key={item.id} className={detailsStyle.itemCard}>
                                <div className={detailsStyle.itemTop}>
                                    <div
                                        className={detailsStyle.avatar}
                                        style={{ backgroundColor: getAvatarColor(item.name) }}
                                    >
                                        {item.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className={detailsStyle.itemInfo}>
                                        <Text variant="h2">{item.name}</Text>
                                        {item.category && <Text variant="p">{item.category}</Text>}
                                        {item.note && <Text variant="p">{item.note}</Text>}
                                    </div>

                                    <span className={detailsStyle.quantityBadge}>
                                        x{item.quantity}
                                    </span>
                                </div>

                                <div className={detailsStyle.itemActions}>
                                    <Button
                                        className={detailsStyle.tickButton}
                                        onClick={() => handleToggleItem(item)}
                                    >
                                        {item.completed ? "Ticked off" : "Tick off"}
                                    </Button>

                                    <Button
                                        className={detailsStyle.itemEditButton}
                                        onClick={() => openEditItemModal(item)}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        className={detailsStyle.itemDeleteButton}
                                        onClick={() => handleDeleteItem(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Text variant="p">
                            {itemSearch ? "No items found." : "No items in this list yet."}
                        </Text>
                    )}
                </section>

                {/* Edit List Modal */}
                <Modal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    title="Edit shopping list"
                >
                    <form onSubmit={handleEditSubmit}>
                        <label className={detailsStyle.listItemName}>List Name</label>
                        <Input
                            type="text"
                            value={editName}
                            onChange={(event) => setEditName(event.target.value)}
                            required
                        />

                        <label className={detailsStyle.listItemName}>Optional Note</label>
                        <Input
                            type="textarea"
                            value={editNote}
                            onChange={(event) => setEditNote(event.target.value)}
                        />

                        <Button type="submit" children={"Save Changes"} />
                    </form>
                </Modal>

                {/* Add / Edit Item Modal */}
                <Modal
                    isOpen={isItemModalOpen}
                    onClose={() => setIsItemModalOpen(false)}
                    title={editingItemId ? "Edit item" : "Add item"}
                >
                    <form onSubmit={handleItemSubmit}>
                        <label className={detailsStyle.listItemName}>Item Name</label>
                        <Input
                            type="text"
                            value={itemName}
                            onChange={(event) => setItemName(event.target.value)}
                            required
                        />

                        <label className={detailsStyle.listItemName}>Quantity</label>
                        <Input
                            type="number"
                            value={itemQuantity}
                            onChange={(event) => setItemQuantity(event.target.value)}
                            required
                        />

                        <label className={detailsStyle.listItemName}>Category</label>
                        <Input
                            type="text"
                            value={itemCategory}
                            onChange={(event) => setItemCategory(event.target.value)}
                        />

                        <label className={detailsStyle.listItemName}>Note</label>
                        <Input
                            type="text"
                            value={itemNote}
                            onChange={(event) => setItemNote(event.target.value)}
                        />

                        <Button
                            type="submit"
                            children={editingItemId ? "Save Changes" : "Add Item"}
                        />
                    </form>
                </Modal>
            </main>
        </div>
    );
};

export default ShoppingListDetails;