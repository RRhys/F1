import { useParams } from "react-router-dom";
import { getLapTimes, getRaceResults } from "../api/race";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import LapChart from "../components/LapChart";
dayjs.extend(advancedFormat);

const getChevron = ({ position, grid, status }) => {
  if (status !== "Finished") return null;
  const change = Math.abs(position - grid);
  if (parseInt(position) < parseInt(grid))
    return (
      <>
        <span className="text-success pl-3 pr-1">
          <i className="fas fa-caret-up" />
        </span>
        {change}
      </>
    );
  if (parseInt(position) > parseInt(grid))
    return (
      <>
        <span className="text-danger pl-3 pr-1">
          <i className="fas fa-caret-down" />
        </span>
        {change}
      </>
    );
  if (position === grid) return null;
};

function Season() {
  const { season, race } = useParams();

  const { data } = useQuery(
    ["race", season, race],
    () => getRaceResults(season, race),
    { staleTime: 60 * 1000 }
  );

  const { data: lapTimes } = useQuery(
    ["laps", season, race],
    () => getLapTimes(season, race),
    { staleTime: 60 * 1000 }
  );

  return (
    <div className="container">
      <h2>
        {season} {data ? data.raceName : ""} - Race {race}
      </h2>
      <h3 className="text-muted">
        {data && dayjs(data.date).format("Do MMMM YYYY")}
      </h3>
      <LapChart data={lapTimes} />
      <table className="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Time</th>
            <th>Starting Grid</th>
            <th>Status</th>
            <th>Points</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data &&
            data.Results.map((result) => (
              <tr
                key={result.position}
                className={
                  result.status === "Finished" ? "" : "bg-light text-muted"
                }
              >
                <td>
                  {result.position} {getChevron(result)} {}
                </td>
                <td>
                  {result.Driver.givenName} {result.Driver.familyName}
                  <span className="pl-1 font-italic font-weight-light">
                    {result.number}
                  </span>
                </td>
                <td>{result.Constructor.name}</td>
                <td>{result.Time ? result.Time.time : ""}</td>
                <td>{result.grid}</td>
                <td>{result.status}</td>
                <td>{result.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Season;
