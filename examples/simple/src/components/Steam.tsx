import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import { stackOffsetWiggle } from "d3-shape";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Steam() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "area",
        // or
        // stacked: true,
        stackOffset: stackOffsetWiggle,
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

            getSeriesStyle: () => ({
              line: { opacity: 0 },
              area: { opacity: 1 },
            }),
          }}
        />
      </ResizableBox>
    </>
  );
}
