function getCurrentDrivers() {
  const url = "https://ergast.com/api/f1/current/driverStandings.json";
  return fetch(url)
    .then((response) => response.json())
    .then(
      (data) => data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    );
}

function getAllDrivers() {
  const url = "https://ergast.com/api/f1/drivers.json?limit=1000";
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.MRData.DriverTable.Drivers);
}

export { getCurrentDrivers, getAllDrivers };
