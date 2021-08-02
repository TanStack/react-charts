import ResizableBox from "../ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function StressTest() {
  const [
    {
      chartCount,
      seriesCount,
      datumCount,
      activeSeriesIndex,
      liveData,
      liveDataInterval,
      showPoints,
      memoizeSeries,
    },
    setState,
  ] = React.useState({
    activeSeriesIndex: -1,
    chartCount: 10,
    seriesCount: 10,
    datumCount: 20,
    liveData: false,
    liveDataInterval: 1000,
    showPoints: true,
    memoizeSeries: false,
  });

  const { data, randomizeData } = useDemoConfig({
    series: seriesCount,
    datums: datumCount,
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
        showDatumElements: showPoints,
      },
    ],
    [showPoints]
  );

  React.useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (liveData) {
      interval = setInterval(() => {
        randomizeData();
      }, liveDataInterval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [liveData, liveDataInterval, randomizeData]);

  return (
    <>
      <h3>
        {chartCount} Charts * 10 Series * 20 Datums (
        {chartCount * seriesCount * datumCount} data elements) w/ Synced Cursors
        & Series Highlighting
      </h3>
      <br />

      <p>
        NOTE: This example is best viewed in production for maximum performance.
      </p>

      <br />
      <br />
      <label>
        Chart Count:{" "}
        <input
          type="number"
          min="1"
          value={chartCount}
          onChange={(e) => {
            e.persist();
            setState((old) => ({
              ...old,
              chartCount: parseInt(e.target.value),
            }));
          }}
        />
      </label>
      <br />
      <label>
        Series Count:{" "}
        <input
          type="number"
          min="1"
          value={seriesCount}
          onChange={(e) => {
            e.persist();
            setState((old) => ({
              ...old,
              seriesCount: parseInt(e.target.value),
            }));
          }}
        />
      </label>
      <br />
      <label>
        DatumCount Count:{" "}
        <input
          type="number"
          min="1"
          value={datumCount}
          onChange={(e) => {
            e.persist();
            setState((old) => ({
              ...old,
              datumCount: parseInt(e.target.value),
            }));
          }}
        />
      </label>
      <br />
      <label>
        Show Points:{" "}
        <input
          type="checkbox"
          checked={showPoints}
          onChange={(e) => {
            e.persist();
            setState((old) => ({ ...old, showPoints: !!e.target.checked }));
          }}
        />
      </label>
      <br />
      <label>
        Memoize Series:{" "}
        <input
          type="checkbox"
          checked={memoizeSeries}
          onChange={(e) => {
            e.persist();
            setState((old) => ({ ...old, memoizeSeries: !!e.target.checked }));
          }}
        />
      </label>
      <br />
      <label>
        Live Data:{" "}
        <input
          type="checkbox"
          checked={liveData}
          onChange={(e) => {
            e.persist();
            setState((old) => ({ ...old, liveData: !!e.target.checked }));
          }}
        />
      </label>
      <br />
      <label>
        Live Data Update Interval:{" "}
        <select
          value={String(liveDataInterval)}
          onChange={(e) => {
            e.persist();
            setState((old) => ({
              ...old,
              liveDataInterval: parseInt(e.target.value),
            }));
          }}
        >
          <option value="16">16 ms</option>
          <option value="32">32 ms</option>
          <option value="50">50 ms</option>
          <option value="100">100 ms</option>
          <option value="250">250 ms</option>
          <option value="500">500 ms</option>
          <option value="1000">1000 ms</option>
        </select>
      </label>
      <br />
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      {[...new Array(chartCount)].map((d, i) => (
        <ResizableBox key={i} height={100}>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              memoizeSeries,
              getSeriesStyle: (series) => ({
                opacity:
                  activeSeriesIndex > -1
                    ? series.index === activeSeriesIndex
                      ? 1
                      : 0.1
                    : 1,
              }),
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
              onFocusDatum: (datum) => {
                setState((old) => ({
                  ...old,
                  activeSeriesIndex: datum ? datum.seriesIndex : -1,
                }));
              },
            }}
          />
        </ResizableBox>
      ))}
    </>
  );
}
