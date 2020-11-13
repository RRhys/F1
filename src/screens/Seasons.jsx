import { Link } from "react-router-dom";
import { fetchSeasons } from "../api/seasons";
import { useQuery } from "react-query";

function Seasons() {
  const { data } = useQuery("seasons", fetchSeasons, { staleTime: 60 * 1000 });

  const seasons = data ? [...data].reverse() : [];

  return (
    <div className="container">
      <h2>Seasons</h2>
      <div className="d-flex flex-row flex-wrap">
        {data
          ? seasons.map((season) => (
              <div
                key={season.season}
                className="p-3 col-lg-3 col-md-6 col-sm-12"
              >
                <div className="card shadow-sm">
                  <div className="card-body pl-0 pb-1 pt-5 text-right">
                    <span className="display-4">
                      <Link to={`/season/${season.season}`}>
                        {season.season}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Seasons;
