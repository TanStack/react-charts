import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function SyncedCursors() {
  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "time",
  });

  const [primaryCursorValue, setPrimaryCursorValue] = React.useState();
  const [secondaryCursorValue, setSecondaryCursorValue] = React.useState();

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as unknown as Date,
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <pre>
        {JSON.stringify(
          {
            primaryCursorValue: primaryCursorValue ?? "undefined",
            secondaryCursorValue: secondaryCursorValue ?? "undefined",
          },
          null,
          2
        )}
      </pre>
      <ResizableBox height={100} width={200}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            primaryCursor: {
              value: primaryCursorValue,
              onChange: (value) => {
                setPrimaryCursorValue(value);
              },
            },
            secondaryCursor: {
              value: secondaryCursorValue,
              onChange: (value) => {
                setSecondaryCursorValue(value);
              },
            },
          }}
        />
      </ResizableBox>
      <div style={{ height: "1rem" }} />
      <ResizableBox height={160} width={300}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            primaryCursor: {
              value: primaryCursorValue,
              onChange: (value) => {
                setPrimaryCursorValue(value);
              },
            },
            secondaryCursor: {
              value: secondaryCursorValue,
              onChange: (value) => {
                setSecondaryCursorValue(value);
              },
            },
          }}
        />
      </ResizableBox>
      <div style={{ height: "1rem" }} />
      <ResizableBox height={300} width={500}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            primaryCursor: {
              value: primaryCursorValue,
              onChange: (value) => {
                setPrimaryCursorValue(value);
              },
            },
            secondaryCursor: {
              value: secondaryCursorValue,
              onChange: (value) => {
                setSecondaryCursorValue(value);
              },
            },
          }}
        />
      </ResizableBox>
    </>
  );
}
