import { memo } from "react";
import { Link } from "react-router-dom";
import { useSession } from "../authContext/AuthProvider";
import ChampionIcon from "../helper/ChampionIcon";

const ChampionCard = ({ champion }) => {
  const { isAuthed, user } = useSession();
  let owner = false;
  let championType;
  let championUser;
  //Test verbinding turkije

  if (champion.hasOwnProperty("type")) {
    championType = champion.type.typeName;
    championUser = champion.user.userName;
  } else {
    championType = champion.championType;
    championUser = champion.fromUser;
  }
  if (isAuthed) {
    owner = championUser == user.userName;
  }

  return (
    <>
      <Link
        className="link-link "
        to={
          owner
            ? `/collection/${user.userName}/champions/${champion.championName}`
            : `/champions/name-${champion.championName}`
        }
      >
        <div
          className="championCard-container"
          style={{
            backgroundImage: `url(${ChampionIcon(
              champion.championID,
              championType
            )})`,
          }}
        >
          <div className="championCard-rating">
            <p data-cy="champ-rating">{champion.championRating}</p>
          </div>
          <div className="championCardName-container">
            <div className="championCard-name">
              <p className="name" data-cy="champ-name">
                {champion.championName}
              </p>
              <p className="type" data-cy="champ-type">
                {championType}
              </p>
              <div className="user">
                <p>Made by: </p>
                <p data-cy="champ-user">{championUser}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ChampionCard;
