import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  let { data, randomizeData } = useDemoConfig({
    series: 10,
  });

  data = React.useMemo(
    () =>
      data.map((d, i) =>
        i % 2 === 0
          ? {
              ...d,
              secondaryAxisID: "First Metric",
            }
          : {
              ...d,
              data: d.data.map((f) => ({
                ...f,
                secondary: f.secondary * 5,
              })),
              secondaryAxisID: "Second Metric",
            }
      ),
    [data]
  );

  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      {
        type: "linear",
        id: "First Metric",
        min: 0,
        position: "left",
      },
      {
        type: "linear",
        id: "Second Metric",
        min: 0,
        position: "right",
        format: (d) => `$${d}`,
      },
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart data={data} series={series} axes={axes} tooltip />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
