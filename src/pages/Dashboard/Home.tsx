import homeStyle from "../../pages/Dashboard/Home.module.css";
import Navbar from "../../components/Nav/NavBar";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Text } from "../../components/Text/Text";
import type { ShoppingList } from "../../types/User";

import Modal from "../../components/Modal/Modal";
import { useEffect, useState } from "react";

import ShoppingListCard from "../../components/ShoppingListCard/ShoppingListCard";

import type { RootState, AppDispatch } from "../../store/Store";

import {
  addShoppingList,
  deleteShoppingList,
  updateShoppingList,
  getShoppingLists,
} from "../../store/ShoppingList/ShoppingList";

// import type { ShoppingList } from "../../types/User";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../store/Auth/Login";
import { getLoggedInUser } from "../../store/Auth/Login";

const Home = () => {
  const [search, setSearch] = useState("");
  const [sort] = useState("default");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listName, setListName] = useState("");
  const [note, setNote] = useState("");

  const [editingList, setEditingList] = useState<ShoppingList | null>(null); // ✅ NEW

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Get logged-in user
  const user = useSelector((state: RootState) => state.login.user);

  // If there is a saved user ID
  // but Redux does not have the user,
  // get the user from json-server.

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId && !user) {
      dispatch(getLoggedInUser());
    }
    if (userId) {
      dispatch(getShoppingLists(userId));
    }
  }, [dispatch, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check user
    if (!user) {
      console.log("No user is logged in");

      return;
    }
    if (editingList) {
      //  UPDATE existing list
      const updatedList: ShoppingList = {
        ...editingList,
        name: listName,
        note,
      };

      try {
        await dispatch(
          updateShoppingList({
            userId: user.id,
            listId: editingList.id,
            updatedList,
          }),
        ).unwrap();

        //  update UI immediately
        setEditingList(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to update list:", error);
      }
    } else {
      // Create new list
      const newList = {
        id: Date.now().toString(),
        name: listName,
        numberOfItems: 0, // ✅ always starts at 0
        note: note,
        items: [],
      };

      try {
        // Save list under logged-in user
        await dispatch(
          addShoppingList({
            userId: user.id,
            list: newList,
          }),
        ).unwrap();

        // Clear form
        setListName("");
        setNote("");

        // Close modal
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to create list:", error);
      }
    }
  };

  // Get lists belonging to logged-in user
  const lists = user?.lists || [];

  // Search lists
  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Sort lists
  const sortedLists = [...filteredLists].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sort === "items") {
      return b.numberOfItems - a.numberOfItems;
    }

    return 0;
  });

  // Handle delete list
  const handleDelete = async (listId: string) => {
    if (!user) {
      console.log("No user is logged in");
      return;
    }

    try {
      await dispatch(
        deleteShoppingList({
          userId: user.id,
          listId: listId,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to delete list:", error);
    }
  };

  // Handle Share List ✅ NEW
  const handleShareList = async (
    list: ShoppingList,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/shared-list/${list.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: list.name,
          text: `Check out my shopping list: ${list.name}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.log("Share cancelled", error);
    }
  };

  return (
    <div className={homeStyle.container}>
      <Navbar />

      <main className={homeStyle.main}>
        <section className={homeStyle.hero}>
          <Text variant="p" className={homeStyle.greeting}>
            Hi {user?.name || "User"}
          </Text>

          <Text variant="h1">Your shopping lists</Text>

          <Text variant="p" className={homeStyle.description}>
            Group items by category, track quantities and share a list with
            whoever is doing the shop.
          </Text>

          <Button
            className={homeStyle.newListButton}
            onClick={() => setIsModalOpen(true)}
          >
            + New list
          </Button>

          {/* Modal  */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Creating Shopping list"
          >
            <form onSubmit={handleSubmit}>
              <label className={homeStyle.listItemName}>List Name</label>
              <Input
                type="text"
                value={listName}
                onChange={(event) => setListName(event.target.value)}
                required
              />
              <label className={homeStyle.listItemName}>Optional Note</label>

              <Input
                type="textarea"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
              <Button
                type="submit"
                children={editingList ? "Update List" : "Create List"}
              />
            </form>
          </Modal>
        </section>

        {/* Search */}

        <section className={homeStyle.controls}>
          <Input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className={homeStyle.searchInput}
          />
        </section>

        {/* Shopping List  */}

        <section className={homeStyle.lists}>
          {sortedLists.length > 0 ? (
            sortedLists.map((list) => (
              <ShoppingListCard
                key={list.id}
                id={`${list.id}`}
                list={list}
                onEdit={(list) => {
                  //  open modal with pre-filled values
                  setEditingList(list);
                  setListName(list.name);
                  setNote(list.note || "");
                  setIsModalOpen(true);
                }}
                onShare={(e) => handleShareList(list, e)}
                onDelete={(id) => {
                  handleDelete(id);
                  console.log("Delete:", id);
                }}
                onClick={(id) => {
                  navigate("/shoppingListItems", { state: id });
                }}
              />
            ))
          ) : (
            <Text variant="p">
              {search
                ? "No shopping lists found."
                : "You don't have any shopping lists yet."}
            </Text>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
