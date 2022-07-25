import React from "react";
import ChampionCard from "./ChampionCard";

const ChampionsList = ({ status, champions, sorted }) => {
  let champList;
  if (status === "success") {
    if (sorted === true) {
      champList = champions.sort(function (a, b) {
        return a.championRating - b.championRating;
      });
    } else {
      champList = champions;
    }
  }
  return (
    <div>
      {status === "loading" && (
        <div className="loading"> Loading data ... </div>
      )}
      {status === "error" && <div> Error while loading... </div>}
      {status === "success" && (
        <div className="championlist-container">
          {champList.reverse().map((champion) => (
            <div>
              <ChampionCard champion={champion} key={champion.championName} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChampionsList;
