import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";

function LapChart({ data }) {
  const [series, setSeries] = useState([]);

  const options = {
    chart: {
      id: "lap-times",
    },
    yaxis: {
      reversed: true,
      min: 1,
      max: 20,
    },
  };

  useEffect(() => {
    if (!data) return;

    const newSeries = [];
    data.map((lap) =>
      lap.Timings.map((time) => {
        const dataPoint = { y: time.position, x: lap.number };
        const index = newSeries.findIndex(
          (driver) => driver.name === time.driverId
        );
        if (index === -1)
          return newSeries.push({ name: time.driverId, data: [dataPoint] });
        return newSeries[index].data.push(dataPoint);
      })
    );
    setSeries(newSeries);
  }, [data]);

  if (series.length === 0) return null;
  return <Chart options={options} series={series} />;
}

export default LapChart;
