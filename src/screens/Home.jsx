import * as React from "react";
import { useQuery } from "react-query";
import { getSchedule } from "../api/schedule";
import { lastRace } from "../api/race";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);

function Home() {
  const season = dayjs().year();
  const { data: seasonSchedule } = useQuery(["season", season], () =>
    getSchedule(season)
  );

  const upcomingRaces = seasonSchedule
    ? seasonSchedule.filter((race) => dayjs().isBefore(race.date)).slice(0, 3)
    : [];

  return (
    <div className="container">
      <h2>Homepage</h2>
      <p className="lead">
        Welcome to the unofficial F1 Lap Tracker App. Here you can find Race
        charts from years past and see how the positions developed throughout
        the race!
      </p>
      <div className="d-flex flex-column align-items-center">
        <h2>Lights Out in</h2>
        <Countdown endDate={seasonSchedule ? seasonSchedule[0].date : null} />
      </div>
      <h3>Upcoming Races</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Race Number</th>
            <th>Race</th>
            <th>Circuit</th>
            <th>Country</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {upcomingRaces.map((race) => (
            <tr>
              <td>{race.round}</td>
              <td>{race.raceName}</td>
              <td>{race.Circuit.circuitName}</td>
              <td>{race.Circuit.Location.country}</td>
              <td>{`${dayjs(race.date).format("DD MMM YYYY")} - ${dayjs().to(
                race.date
              )}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Most Recent Race</h3>
      <LastRaceCard />
    </div>
  );
}

const Countdown = ({ endDate }) => {
  if (!endDate) return null;

  const dayDifference = dayjs().diff(endDate, "day");
  return <h2 className="display-4">{Math.abs(dayDifference)} Days</h2>;
};

const LastRaceCard = () => {
  const { isLoading, error, data } = useQuery("last-race", lastRace);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Link to={`/season/${data.season}/${data.round}`} className="text-white">
      <div className="card shadow bg-danger">
        <div className="card-body pl-0 pb-1 pt-5 d-flex flex-column align-items-end">
          <span className="display-4">{`${data.raceName} ${data.season}`}</span>
          <span className="lead">{dayjs(data.date).format("Do MMM YYYY")}</span>
        </div>
      </div>
    </Link>
  );
};

export default Home;
