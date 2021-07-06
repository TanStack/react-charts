import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  const [{ min, max }, setState] = React.useState({
    min: null,
    max: null,
  });

  const { data, randomizeData } = useDemoConfig({
    series: 10,
  });

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom",
        hardMin: min,
        hardMax: max,
      },
      {
        type: "linear",
        position: "left",
      },
    ],
    [max, min]
  );

  const brush = React.useMemo(
    () => ({
      onSelect: (brushData) => {
        setState({
          min: Math.min(brushData.start, brushData.end),
          max: Math.max(brushData.start, brushData.end),
        });
      },
    }),
    []
  );

  const series = React.useMemo(() => ({
    showPoints: true,
  }));

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <button
        onClick={() =>
          setState({
            min: null,
            max: null,
          })
        }
      >
        Reset Zoom
      </button>
      <br />
      <br />
      <ResizableBox>
        <Chart
          data={data}
          axes={axes}
          primaryCursor
          tooltip
          brush={brush}
          series={series}
        />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
