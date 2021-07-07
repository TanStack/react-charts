import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function DarkMode() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

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
      <ResizableBox
        style={{
          background: "rgba(0, 27, 45, 0.9)",
          padding: ".5rem",
          borderRadius: "5px",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              tooltip: true,
              dark: true,
            }}
          />
        </div>
      </ResizableBox>
    </>
  );
}
