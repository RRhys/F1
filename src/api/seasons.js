const url = "https://ergast.com/api/f1/seasons.json?limit=1000";

function fetchSeasons() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.MRData.SeasonTable.Seasons);
}

export { fetchSeasons };
