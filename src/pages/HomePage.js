import ChampionsList from "../components/ChampionsList";
import Navbar from "../components/NavBar";
import SideBarLeft from "../components/SideBarLeft";
import SideBarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import { useChampions } from "../api/useChampions";

const HomePage = () => {
  const { status, data } = useChampions();
  return (
    <>
      <div className="containerBody">
        <SideBarLeft />
        <div className="content">
          <Navbar />
          <div className="home-champions-title">
            <p>TOP</p>
            <p>RATED</p>
            <p>CHAMPIONS</p>
          </div>
          {status === "loading" && <div> Loading data ... </div>}
          {status === "error" && <div> Error fetching data </div>}
          {status === "success" && (
            <ChampionsList status={status} champions={data.data} sorted={true} />
          )}
          <Footer />
        </div>
        <SideBarRight />
      </div>
    </>
  );
};

export default HomePage;
