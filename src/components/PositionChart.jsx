import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import * as colors from "../styles/colors";

const getColours = (series) => {
  if (series.length === 0) return ["white"];
  return series.map((timings) => {
    return colors[timings.constructor] ? colors[timings.constructor] : "purple";
  });
};

function PositionChart({ data }) {
  const [series, setSeries] = useState([]);
  const [currentLap, setCurrentLap] = useState(1);
  const [totalLaps, setTotalLaps] = useState(1);
  const [playing, setPlaying] = useState(false);

  const constructorColours = getColours(series);

  const options = {
    chart: {
      id: "lap-times",
      animations: {
        enabled: true,
      },
      background: "#fff",
    },
    colors: constructorColours,
    yaxis: {
      reversed: true,
      min: 1,
      max: 20,
    },
    xaxis: {
      min: 1,
      max: totalLaps,
    },
  };

  useEffect(() => {
    if (!data) return;

    const newSeries = [...series];
    newSeries.map((series) => (series.data = []));
    data
      .filter((lap) => parseInt(lap.number) <= parseInt(currentLap))
      .map((lap) =>
        lap.Timings.map((time) => {
          const dataPoint = { y: time.position, x: lap.number };
          const index = newSeries.findIndex(
            (driver) => driver.name === time.Driver.code
          );
          if (index === -1)
            return newSeries.push({
              name: time.Driver.code,
              constructor: time.Constructor.constructorId,
              data: [dataPoint],
            });
          return newSeries[index].data.push(dataPoint);
        })
      );
    setSeries(newSeries);
    setTotalLaps(data.length);
  }, [data, currentLap]);

  useEffect(() => {
    if (!playing) return;

    const playLoop = setInterval(() => {
      if (currentLap === totalLaps) return setPlaying(false);
      setCurrentLap(currentLap + 1);
    }, 250);

    return () => clearInterval(playLoop);
  }, [currentLap, totalLaps, playing]);

  const handleLapChange = (change) => {
    if (currentLap === 1 && change === -1) return;
    if (currentLap >= totalLaps && change === 1) return;
    setCurrentLap(currentLap + change);
  };

  if (series.length === 0) return null;
  return (
    <>
      <Chart options={options} series={series} type="line" height={600} />
      <div className="d-flex flex-row justify-content-center mb-3">
        <button
          className="btn btn-sm btn-dark mr-1"
          onClick={() => setCurrentLap(1)}
        >
          <i className="fas fa-fast-backward"></i>
        </button>
        <button
          className="btn btn-sm btn-dark mr-1"
          onClick={() => handleLapChange(-1)}
        >
          <i className="fas fa-backward"></i>
        </button>
        <button
          className="btn btn-dark btn-sm mr-1"
          onClick={() => setPlaying(!playing)}
        >
          {playing ? (
            <i className="fas fa-pause" />
          ) : (
            <i className="fas fa-play" />
          )}
        </button>
        <button
          className="btn btn-sm btn-dark mr-1"
          onClick={() => handleLapChange(1)}
        >
          <i className="fas fa-forward"></i>
        </button>
        <button
          className="btn btn-sm btn-dark mr-1"
          onClick={() => setCurrentLap(totalLaps)}
        >
          <i className="fas fa-fast-forward"></i>
        </button>
      </div>
    </>
  );
}

export default PositionChart;
