import homeStyle from "../../pages/Dashboard/Home.module.css";
import Navbar from "../../components/Nav/NavBar";

import Button from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";
import { Text } from "../../ui/Text/Text";

import Modal from "../../components/Modal/Modal";
import { use, useEffect, useState } from "react";

import ShoppingListCard from "../../components/ShoppingListCard/ShoppingListCard";

import type { RootState, AppDispatch } from "../../store/Store";

import { addShoppingList } from "../../store/ShoppingList/ShoppingListThunks";

import type { ShoppingList } from "../../types/User";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/Auth/AuthThunks";

const Home = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const [sort, setSort] = useState("default");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Get logged-in user
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    // Only try to log in if you have credentials and are not already logged in
    if (user?.email && user?.password) {
      dispatch(login({ email: user.email, password: user.password }));
    }
  }, []);

  const [listName, setListName] = useState("");

  const [numberOfItems, setNumberOfItems] = useState("");

  const [note, setNote] = useState("");

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
              <Button type="submit" children={"Create List"} />
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

          <div className={homeStyle.filters}>
            <Button className={homeStyle.searchButton}>Search</Button>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className={homeStyle.sortSelect}
            >
              <option value="name">Name</option>
              <option value="items">Date</option>
            </select>
          </div>
        </section>

        {/* Shopping List  */}

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
