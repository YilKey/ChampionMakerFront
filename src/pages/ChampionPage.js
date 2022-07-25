import Navbar from "../components/NavBar";
import SideBarLeft from "../components/SideBarLeft";
import SideBarRight from "../components/SideBarRight";
import Footer from "../components/Footer";
import { deleteChampion, upvoteChamp, useChampion } from "../api/useChampions";
import { useParams } from "react-router";
import { CgComponents } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../authContext/AuthProvider";
import UpdateChampionBtn from "../components/UpdateChampionBtn";
import { useQueryClient } from "react-query";

const ChampionPage = () => {
  const { name } = useParams();
  const { status, data } = useChampion(name);
  const { user, isAuthed } = useSession();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleDelete() {
    const res = await deleteChampion(user.userName, name);
    console.log(res);
    if (res.rows === 1) {
      navigate(`/collection/${user.userName}/champions`);
    }
  }

  async function handleUpvote() {
    const res = await upvoteChamp(data.championName);
    if (res.rows === 1) {
      queryClient.invalidateQueries("champion");
    }
  }

  return (
    <>
      <div className="containerBody">
        <SideBarLeft />
        <div className="content-champion">
          <Navbar />
          {status === "loading" && <div> Loading data ... </div>}
          {status === "error" && <div> Error fetching data </div>}
          {status === "success" && (
            <div className="champion-info-container">
              {data.user.userName === user?.userName ? (
                <button
                  data-cy="champ-delete"
                  className="deleteBtn"
                  onClick={handleDelete}
                >
                  DELETE CHAMPION
                </button>
              ) : (
                ""
              )}
              {data.user.userName === user?.userName ? (
                <button data-cy="champ-edit" className="updateBtn">
                  <UpdateChampionBtn
                    className="updateBtn"
                    champion={data.championName}
                  />
                </button>
              ) : (
                ""
              )}
              <div className="champion-info-title">
                <p>
                  Made by:{" "}
                  <Link
                    className="link-link"
                    to={`/collection/${data.user.userName}/champions`}
                  >
                    <span style={{ color: "#cdec24" }} data-cy="champ-user">
                      {data.user.userName}
                    </span>
                  </Link>
                </p>
                <div className="champion-info-title-container">
                  <span></span>
                  <span data-cy="champ-name">{data.championName}</span>
                  <span></span>
                </div>
              </div>
              <div className="champion-info-data-container">
                <div className="champion-info-left">
                  <CgComponents style={{ color: "white", fontSize: "5rem" }} />
                  <p>TYPE</p>
                  <p data-cy="champ-type">{data.type.typeName}</p>
                </div>
                <div className="champion-info-center-left">
                  <p data-cy="champ-rating">{data.championRating}</p>
                  <p>RATING</p>
                  {isAuthed ? (
                    <button
                      data-cy="champ-upvote"
                      onClick={handleUpvote}
                      className="upvote"
                    >
                      {" "}
                      upvote
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="champion-info-right">
                  <p>LORE:</p>
                  <textarea
                    spellCheck="false"
                    readOnly
                    unselectable="none"
                    data-cy="champ-lore"
                    value={data.championDiscription}
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          <Footer />
        </div>
        <SideBarRight />
      </div>
    </>
  );
};

export default ChampionPage;
