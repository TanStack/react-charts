import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  const [
    {
      chartCount,
      seriesCount,
      datumCount,
      primaryCursorValue,
      secondaryCursorValue,
      activeSeriesIndex,
      liveData,
      liveDataInterval
    },
    setState
  ] = React.useState({
    primaryCursorValue: null,
    secondaryCursorValue: null,
    activeSeriesIndex: -1,
    chartCount: 10,
    seriesCount: 10,
    datumCount: 20,
    liveData: false,
    liveDataInterval: 1000
  });

  const { data, randomizeData } = useDemoConfig({
    series: seriesCount,
    datums: datumCount
  });

  React.useEffect(() => {
    let interval;

    if (liveData) {
      interval = setInterval(() => {
        randomizeData();
      }, liveDataInterval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [liveData, liveDataInterval, randomizeData]);

  const onFocus = React.useCallback(datum => {
    setState(old => ({
      ...old,
      primaryCursorValue: datum ? datum.primary : null,
      secondaryCursorValue: datum ? datum.secondary : null,
      activeSeriesIndex: datum ? datum.series.id : -1
    }));
  }, []);

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear" }
    ],
    []
  );

  const series = React.useMemo(
    () => ({
      showPoints: false
    }),
    []
  );

  const primaryCursor = React.useMemo(
    () => ({
      value: primaryCursorValue
    }),
    [primaryCursorValue]
  );

  const secondaryCursor = React.useMemo(
    () => ({
      value: secondaryCursorValue
    }),
    [secondaryCursorValue]
  );

  const getSeriesStyle = React.useCallback(
    series => ({
      opacity:
        activeSeriesIndex > -1 ? (series.id === activeSeriesIndex ? 1 : 0.1) : 1
    }),
    [activeSeriesIndex]
  );

  return (
    <div>
      <h3>
        {chartCount} Charts * 10 Series * 20 Datums (
        {chartCount * seriesCount * datumCount} data elements) w/ Synced Cursors
        & Series Highlighting
      </h3>
      <br />

      <p>
        NOTE: This example is best views in production for maximum performance.
      </p>

      <br />
      <br />
      <label>
        Chart Count:{" "}
        <input
          type="number"
          min="1"
          value={chartCount}
          onChange={e =>
            e.persist() ||
            setState(old => ({ ...old, chartCount: parseInt(e.target.value) }))
          }
        />
      </label>
      <br />
      <label>
        Series Count:{" "}
        <input
          type="number"
          min="1"
          value={seriesCount}
          onChange={e =>
            e.persist() ||
            setState(old => ({ ...old, seriesCount: parseInt(e.target.value) }))
          }
        />
      </label>
      <br />
      <label>
        DatumCount Count:{" "}
        <input
          type="number"
          min="1"
          value={datumCount}
          onChange={e =>
            e.persist() ||
            setState(old => ({
              ...old,
              datumCount: parseInt(e.target.value)
            }))
          }
        />
      </label>
      <br />
      <label>
        Live Data:{" "}
        <input
          type="checkbox"
          checked={liveData}
          onChange={e =>
            e.persist() ||
            setState(old => ({ ...old, liveData: e.target.checked }))
          }
        />
      </label>
      <br />
      <label>
        Live Data Update Interval:{" "}
        <select
          value={String(liveDataInterval)}
          onChange={e =>
            e.persist() ||
            setState(old => ({
              ...old,
              liveDataInterval: parseInt(e.target.value)
            }))
          }
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
      <br />
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      {[...new Array(chartCount)].map((d, i) => (
        <ResizableBox key={i} height={100} canRandomize={false}>
          <Chart
            data={data}
            tooltip
            {...{
              axes,
              series,
              primaryCursor,
              secondaryCursor,
              getSeriesStyle,
              onFocus
            }}
          />
        </ResizableBox>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
