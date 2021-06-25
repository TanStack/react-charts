import ResizableBox from "../src/ResizableBox";
import useDemoConfig from "../src/useDemoConfig";
import useLagRadar from "../src/useLagRadar";
//
import * as React from "react";
import { AxisLinear, AxisOptions, Chart, SeriesOptions } from "react-charts";

export default function Home() {
  useLagRadar();

  const { data, randomizeData } = useDemoConfig({
    series: 20,
  });

  const getSeriesOptions = React.useCallback(
    (): SeriesOptions => ({
      type: "area",
    }),
    []
  );

  const axes = React.useMemo<AxisOptions[]>(
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
            showVoronoi: true,
          }}
        />
      </ResizableBox>
    </>
  );
}
