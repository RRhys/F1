function getSchedule(season) {
  const url = `https://ergast.com/api/f1/${season}.json`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.MRData.RaceTable.Races);
}

export { getSchedule };
