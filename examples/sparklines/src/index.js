import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
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
      {
        primary: true,
        position: "bottom",
        type: "time",
        show: false
      },
      { position: "left", type: "linear", show: false }
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox width={500} height={100}>
        <Chart data={data} series={series} axes={axes} />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
