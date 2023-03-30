import React from "react";
import "./statSection.css";
import { useNavigate } from "react-router-dom";

const StatSection = ({ name, statArray, stat, section }) => {
  const navigate = useNavigate();

  return (
    <div className="stat__section">
      <div className="header">
        <p>
          {name}
          <i className="fa-solid fa-basketball"></i>
        </p>
      </div>

      <>
        {statArray !== undefined && (
          <div className="statCard">
            <ol>
              {statArray.length > 1 &&
                statArray.slice(0, 5).map((item) => (
                  <li key={item.statistics.id}>
                    <p
                      onClick={() =>
                        navigate(
                          section === "team"
                            ? `/teams/${item.team.id}`
                            : `/players/${item.player.id}`
                        )
                      }
                    >
                      {section === "team" ? item.team.name : item.player.name}
                    </p>

                    <p>{Math.round(item.statistics[stat])}</p>
                  </li>
                ))}
            </ol>
          </div>
        )}
      </>
    </div>
  );
};

export default StatSection;
