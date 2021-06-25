import ResizableBox from "./ResizableBox";
import "./styles.css";
import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import React from "react";
import { Chart } from "react-charts";
import ReactDOM from "react-dom";

export default function App() {
  useLagRadar();

  const { data, randomizeData } = useDemoConfig({
    series: 20,
  });

  const getSeriesOptions = React.useCallback(
    () => ({
      type: "area" as const,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear", stacked: true },
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart
          options={{
            data,
            getSeriesOptions,
            axes,
            tooltip: true,
          }}
        />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
