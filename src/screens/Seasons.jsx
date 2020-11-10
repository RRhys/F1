import { Link } from "react-router-dom";
import { fetchSeasons } from "../api/seasons";
import { useQuery } from "react-query";

function Seasons() {
  const { data } = useQuery("seasons", fetchSeasons, { staleTime: 60 * 1000 });

  const seasons = data ? [...data].reverse() : [];

  return (
    <div className="container">
      <h2>Seasons</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Year</th>
          </tr>
        </thead>
        {data
          ? seasons.map((season) => (
              <tr key={season.season}>
                <td>
                  <Link to={`/season/${season.season}`}>{season.season}</Link>
                </td>
              </tr>
            ))
          : null}
      </table>
    </div>
  );
}

export default Seasons;
