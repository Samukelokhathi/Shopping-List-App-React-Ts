import homeStyle from "../../pages/Dashboard/Home.module.css"
import Navbar from "../../components/nav/NavBar";

import Button from "../../components/Button/Button";
import { Text } from "../../components/Text/Text";

const Home = () => {
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


            </main>



        </div>
    );
};

export default Home
