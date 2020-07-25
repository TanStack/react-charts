import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import "./styles.css";

export default function App() {
  useLagRadar();

  const { data, randomizeData } = useDemoConfig({
    series: 10
  });

  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  return (
    <>
      <p>
        This example demos a chart's ability to position itself responsively in
        elements while respecting the box-model (margin, padding, and borders)
      </p>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          border: "2px solid black",
          height: "400px"
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            padding: "10px",
            border: "1px solid red"
          }}
        >
          Header
        </div>
        <div
          style={{
            flex: 2,
            border: "5px solid blue",
            maxHeight: "400px",
            margin: "10px"
          }}
        >
          <Chart data={data} series={series} axes={axes} tooltip />
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
