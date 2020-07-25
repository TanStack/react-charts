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
  const series = React.useMemo(() => ({ type: "area" }), []);
  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear", stacked: true }
    ],
    []
  );
  const primaryCursor = React.useMemo(
    () => ({
      render: props => (
        <span style={{ fontSize: "1rem" }}>
          <span role="img" aria-label="icon">
            🕑
          </span>{" "}
          {(props.formattedValue || "").toString()}
        </span>
      )
    }),
    []
  );
  const secondaryCursor = React.useMemo(
    () => ({
      render: props => (
        <span style={{ fontSize: "1rem" }}>
          <span role="img" aria-label="icon">
            👍
          </span>{" "}
          {(props.formattedValue || "").toString()}
        </span>
      )
    }),
    []
  );
  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart
          data={data}
          series={series}
          axes={axes}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
        />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
