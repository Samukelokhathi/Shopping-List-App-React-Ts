import homeStyle from "../../pages/Dashboard/Home.module.css";

import Navbar from "../../components/Nav/NavBar";

import Button from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Text } from "../../ui/Text/Text";

import Modal from "../../components/Modal/Modal";

import ShoppingListCard from "../../components/ShoppingListCard/ShoppingListCard";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../../store/Store";

import { addShoppingList } from "../../store/ShoppingList/ShoppingListThunks";

import type { ShoppingList } from "../../types/User";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // Get logged-in user
  const user = useSelector((state: RootState) => state.auth.user);

  // Search
  const [search, setSearch] = useState("");

  // Sort
  const [sort, setSort] = useState("default");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // List name
  const [listName, setListName] = useState("");

  // Number of items
  const [numberOfItems, setNumberOfItems] = useState("");

  // Note
  const [note, setNote] = useState("");

  // Create list
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check user
    if (!user) {
      console.log("No user is logged in");

      return;
    }

    // Create new list
    const newList: ShoppingList = {
      id: Date.now().toString(),

      name: listName,

      numberOfItems: Number(numberOfItems),

      note: note,
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

      setNumberOfItems("");

      setNote("");

      // Close modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create list:", error);
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

  return (
    <div className={homeStyle.container}>
      <Navbar />

      <main className={homeStyle.main}>
        {/* HERO */}
        <section className={homeStyle.hero}>
          <Text variant="p" className={homeStyle.greeting}>
            Hi {user?.name || "User"}
          </Text>

          <Text variant="h1">Your shopping lists</Text>

          <Text variant="p" className={homeStyle.description}>
            Group items by category, track quantities and share a list with
            whoever is doing the shop.
          </Text>

          {/* NEW LIST BUTTON */}
          <Button
            className={homeStyle.newListButton}
            onClick={() => setIsModalOpen(true)}
          >
            + New list
          </Button>

          {/* MODAL */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Creating Shopping list"
          >
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <label className={homeStyle.listItemName}>List Name</label>

              <Input
                type="text"
                value={listName}
                onChange={(event) => setListName(event.target.value)}
                required
              />

              {/* NUMBER OF ITEMS */}
              <label className={homeStyle.listItemName}>Number of Items</label>

              <Input
                type="number"
                value={numberOfItems}
                onChange={(event) => setNumberOfItems(event.target.value)}
                required
              />

              {/* NOTE */}
              <label className={homeStyle.listItemName}>Optional Note</label>

              <Input
                type="textarea"
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />

              <Button type="submit">Create List</Button>
            </form>
          </Modal>
        </section>

        {/* SEARCH */}
        <section className={homeStyle.controls}>
          <Input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className={homeStyle.searchInput}
          />

          <div className={homeStyle.filters}>
            <Button className={homeStyle.searchButton}>Search</Button>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className={homeStyle.sortSelect}
            >
              <option value="default">Sort by</option>

              <option value="name">Name</option>

              <option value="items">Items</option>
            </select>
          </div>
        </section>

        {/* SHOPPING LISTS */}
        <section className={homeStyle.lists}>
          {sortedLists.length > 0 ? (
            sortedLists.map((list) => (
              <ShoppingListCard
                key={list.id}
                list={list}
                onEdit={(list) => {
                  console.log("Edit:", list);
                }}
                onDelete={(id) => {
                  console.log("Delete:", id);
                }}
                onClick={(id) => {
                  navigate(`/shopping-list/${id}`);
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
