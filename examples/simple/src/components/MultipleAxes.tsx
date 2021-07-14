import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function MultipleAxes() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

  // @ts-ignore
  data.forEach((d, i) => (d.secondaryAxisId = i % 2 === 0 ? "2" : undefined));

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      isPrimary: true,
      scaleType: "time",
      position: "bottom",
      getValue: (datum) => datum.primary as unknown as Date,
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
        elementType: "bar",
        stacked: true,
      },
      {
        id: "2",
        scaleType: "linear",
        position: "right",
        getValue: (datum) => datum.secondary,
        elementType: "line",
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
