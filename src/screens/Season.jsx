import { Link, useParams } from "react-router-dom";
import { getSchedule } from "../api/schedule";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);
dayjs.extend(advancedFormat);

function Season() {
  const { season } = useParams();

  const { data } = useQuery(["season", season], () => getSchedule(season));

  return (
    <div className="container">
      <h2>{season} Season</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Race</th>
            <th>Circuit</th>
            <th>Country</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((race) => (
              <tr key={race.round}>
                <td>{race.raceName}</td>
                <td>{race.Circuit.circuitName}</td>
                <td>{race.Circuit.Location.country}</td>
                <td>
                  {dayjs(race.date).isAfter(dayjs())
                    ? dayjs(race.date).calendar(null, {
                        sameDay: "[Today]", // The same day ( Today at 2:30 AM )
                        nextDay: "[Tomorrow]", // The next day ( Tomorrow at 2:30 AM )
                        nextWeek: "[This] dddd", // The next week ( Sunday at 2:30 AM )
                        sameElse: "Do MMMM YYYY", // Everything else ( 17/10/2011 )
                      })
                    : dayjs(race.date).format("Do MMMM YYYY")}
                </td>
                <td>
                  {dayjs(race.date).isAfter(dayjs()) ? (
                    ""
                  ) : (
                    <Link to={`/season/${season}/${race.round}`}>
                      View Results
                    </Link>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Season;
