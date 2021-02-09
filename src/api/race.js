function getRaceResults(season, race) {
  const url = `https://ergast.com/api/f1/${season}/${race}/results.json`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.MRData.RaceTable.Races[0]);
}

function lastRace() {
  const url = `http://ergast.com/api/f1/current/last/results.json`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.MRData.RaceTable.Races[0]);
}

function getLapTimes(season, race) {
  const url = `https://ergast.com/api/f1/${season}/${race}/laps.json?limit=2000`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.MRData.RaceTable.Races[0].Laps);
}

export { getRaceResults, lastRace, getLapTimes };
