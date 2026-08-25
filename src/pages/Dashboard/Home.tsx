import homeStyle from "../../pages/Dashboard/Home.module.css"
import Navbar from "../../components/Nav/NavBar";

import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Text } from "../../components/Text/Text";

import { useState } from "react";

const Home = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");
    return (
        <div className={homeStyle.container}>
            <Navbar />

            <main className={homeStyle.main}>
                <section className={homeStyle.hero}>
                    <Text variant="p" className={homeStyle.greeting}>Hi User</Text>

                    <Text variant="h1">Your shopping lists</Text>

                    <Text variant="p" className={homeStyle.description}>
                        Group items by category, track quantities and share a list
                        with whoever is doing the shop.
                    </Text>

                    <Button
                        className={homeStyle.newListButton}
                        onClick={() => { }}
                    >
                        + New list
                    </Button>
                </section>


                <section className={homeStyle.controls}>
                    <Input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        className={homeStyle.searchInput}
                    />

                    <div className={homeStyle.filters}>
                        <Button className={homeStyle.searchButton}>
                            Search
                        </Button>
                        <select
                            value={sort}
                            onChange={(event) =>
                                setSort(event.target.value)
                            }
                            className={homeStyle.sortSelect}
                        >
                            <option value="default">Sort by</option>
                            <option value="name">Name</option>
                            <option value="items">Items</option>
                        </select>
                    </div>
                </section>


            </main>



        </div>
    );
};

export default Home
