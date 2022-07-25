import React from "react";
import TypesCard from "./TypeCard";

const TypesList = ({ status, types }) => {
  return (
    <div>
      {status === "loading" && <div> Loading data ... </div>}
      {status === "error" && <div> Error fetching data </div>}
      {status === "success" && (
        <div className="championlist-container">
          {types.map((type) => (
            <div>
              <TypesCard type={type} key={type.typeID} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypesList;
