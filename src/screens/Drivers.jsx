import { useQuery } from "react-query";
import { getCurrentDrivers, getAllDrivers } from "../api/drivers";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

function Drivers() {
  const { data: currentDrivers } = useQuery(
    "currentDrivers",
    getCurrentDrivers
  );
  const { data } = useQuery("allDrivers", getAllDrivers);

  return (
    <div className="container">
      <h2>Current Drivers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Constructor</th>
            <th>Points</th>
            <th>Wins</th>
            <th>DOB</th>
          </tr>
        </thead>
        {currentDrivers &&
          currentDrivers.map((driver) => (
            <tr key={driver.Driver.driverId}>
              <td>
                {driver.Driver.givenName} {driver.Driver.familyName}
              </td>
              <td>{driver.Constructors[0].name}</td>
              <td>{driver.points}</td>
              <td>{driver.wins}</td>
              <td>
                {dayjs(driver.Driver.dateOfBirth).format("Do MMMM YYYY")}
                <span className="text-muted ml-2">
                  {dayjs().diff(driver.Driver.dateOfBirth, "years")} years old
                </span>
              </td>
            </tr>
          ))}
      </table>
      <h2>All Drivers</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
          </tr>
        </thead>
        {data &&
          data.map((driver) => (
            <tr key={driver.driverId}>
              <td>
                {driver.givenName} {driver.familyName}
              </td>
              <td>{dayjs(driver.dateOfBirth).format("ddd Do MMMM YYYY")}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default Drivers;
