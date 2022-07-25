import ChampionsList from "../components/ChampionsList";
import Navbar from "../components/NavBar";
import SideBarLeft from "../components/SideBarLeft";
import SideBarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import { useChampions } from "../api/useChampions";
import { AiOutlineSearch } from "react-icons/ai";

import { useState } from "react";
import TitleLine from "../components/TitleLine";

const ChampionsPage = () => {
  const { status, data } = useChampions();
  const [search, setSearch] = useState("");
  let list;
  if (status === "success") {
    list = data.data.filter((champion) => {
      if (search === "") {
        return champion;
      } else if (
        champion.championName.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return champion;
      }
    });
  } else {
    list = [];
  }
  return (
    <>
      <div className="containerBody">
        <SideBarLeft />
        <div className="content">
          <Navbar />
          <TitleLine small={"Choose your"} big={"CHAMPION"} />
          <div className="champions-searchbar-container">
            <AiOutlineSearch className="icon-search" />
            <input
              className="champions-searchBar"
              type="text"
              placeholder="SEARCH"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            {status === "loading" && <div> Loading data ... </div>}
            {status === "error" && <div> Error fetching data </div>}
            {status === "success" && (
              <ChampionsList status={status} champions={list} sorted={false} />
            )}
          </div>

          <Footer />
        </div>
        <SideBarRight />
      </div>
    </>
  );
};

export default ChampionsPage;
