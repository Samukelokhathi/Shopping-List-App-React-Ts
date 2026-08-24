import homeStyle from "../../pages/Dashboard/Home.module.css"
import Navbar from "../../components/nav/NavBar";

const Home = () => {
    return (
        <div className={homeStyle.container}>
            <Navbar />

        </div>
    );
};

export default Home