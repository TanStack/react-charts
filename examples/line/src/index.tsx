import ResizableBox from "./ResizableBox";
import "./styles.css";
import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import React from "react";
// import { timeDay } from "d3";
import { AxisOptions, Chart } from "react-charts";
import ReactDOM from "react-dom";

export default function App() {
  useLagRadar();

  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

  // @ts-ignore
  // data.forEach((d, i) => (d.secondaryAxisId = i % 2 === 0 ? "2" : undefined));

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      isPrimary: true,
      scaleType: "time",
      position: "bottom",
      getValue: (datum) => (datum.primary as unknown) as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        scaleType: "linear",
        position: "left",
        getValue: (datum) => datum.secondary,
        stacked: true,
        elementType: "bar",
        // invert: true,
        // stackOffset: stackOffsetWiggle,
      },
      // {
      //   id: "2",
      //   scaleType: "linear",
      //   position: "right",
      //   getValue: (datum) => datum.secondary,
      //   // stacked: true,
      //   // stackOffset: stackOffsetWiggle,
      //   elementType: "line",
      // },
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox style={{ marginLeft: 50, marginTop: 200 }}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            showVoronoi: true,
            tooltip: true,
            // onFocusDatum: (...args) => console.log(...args),
          }}
        />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
