import { useParams } from "react-router";
import ChampionsList from "../components/ChampionsList";
import Navbar from "../components/NavBar";
import SideBarLeft from "../components/SideBarLeft";
import SideBarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import { useUserChampions } from "../api/useChampions";
import { fetchUser } from "../api/users";
import { useEffect, useState } from "react";
import AddChampionBtn from "../components/AddChampionBtn";

const CollectionPage = () => {
  const { username } = useParams();
  let { status, data, refetch } = useUserChampions(username);
  const [userData, setUserdata] = useState(null);
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchUser(username);
      setUserdata(res);
    };
    fetch();
    refetch();
  }, [username, refetch]);

  useEffect(() => {
    if (status === "success") {
      let rating = 0;
      data.forEach((champion) => {
        rating += champion.championRating;
      });
      setRatings(rating);
    }
  }, [status, username, data]);
  return (
    <>
      <div className="containerBody">
        <SideBarLeft />
        <div className="content">
          <Navbar />
          <div className="profile-container">
            <div className="profile-totals">
              <p>Champions</p>
              {status === "loading" && (
                <div data-cy="col-champion">calculating...</div>
              )}
              {status === "error" && (
                <div data-cy="col-champion">error calculating... </div>
              )}
              {status === "success" && (
                <p data-cy="col-champion">{data.length}</p>
              )}
            </div>
            <div className="profile-pic">
              <div className="profile-pic-circle"></div>
              <p data-cy="col-user">{userData?.userName}</p>
              <p data-cy="col-email">{userData?.email}</p>
            </div>
            <div className="profile-totals">
              <p>Ratings</p>
              {status === "loading" && <div>calculating...</div>}
              {status === "error" && <div>error calculating... </div>}
              {status === "success" && <p>{ratings}</p>}
            </div>
          </div>
          <div className="profile-championtitle">
            Champions <AddChampionBtn />
          </div>
          {status === "loading" && (
            <div className="loading"> Loading data ... </div>
          )}
          {status === "error" && <div> Error fetching data </div>}
          {status === "success" && (
            <ChampionsList status={status} champions={data} sorted={true} />
          )}
          <Footer />
        </div>
        <SideBarRight />
      </div>
    </>
  );
};

export default CollectionPage;
