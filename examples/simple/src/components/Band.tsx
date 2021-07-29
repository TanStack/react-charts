import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import { stackOffsetWiggle } from "d3-shape";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Band() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "ordinal",
  });

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      position: "left",
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        position: "top",
        show: false,
        getValue: (datum) => datum.secondary,
        stackOffset: stackOffsetWiggle,
        stacked: true,
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
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}
