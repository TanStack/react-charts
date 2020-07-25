import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  const { data, elementType, randomizeData, Options } = useDemoConfig({
    series: 10,
    useR: true,
    show: ["elementType"]
  });

  const series = React.useMemo(
    () => ({
      type: elementType,
      showPoints: false
    }),
    [elementType]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left", stacked: true }
    ],
    []
  );

  const getSeriesStyle = React.useCallback(
    () => ({
      transition: "all .5s ease"
    }),
    []
  );

  const getDatumStyle = React.useCallback(
    () => ({
      transition: "all .5s ease"
    }),
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      {Options}
      <br />
      <ResizableBox>
        <Chart
          data={data}
          series={series}
          axes={axes}
          getSeriesStyle={getSeriesStyle}
          getDatumStyle={getDatumStyle}
          tooltip
        />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
