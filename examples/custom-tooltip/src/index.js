import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  const { data, randomizeData } = useDemoConfig({
    series: 10,
    dataType: "ordinal"
  });

  const series = React.useMemo(() => ({ type: "bar" }), []);

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "ordinal" },
      { position: "left", type: "linear", stacked: true }
    ],
    []
  );

  const tooltip = React.useMemo(
    () => ({
      render: ({ datum, primaryAxis, getStyle }) => {
        return <CustomTooltip {...{ getStyle, primaryAxis, datum }} />;
      }
    }),
    []
  );

  return (
    <>
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart
          data={data}
          series={series}
          axes={axes}
          primaryCursor
          tooltip={tooltip}
        />
      </ResizableBox>
    </>
  );
}

function CustomTooltip({ getStyle, primaryAxis, datum }) {
  const data = React.useMemo(
    () =>
      datum
        ? [
            {
              data: datum.group.map(d => ({
                primary: d.series.label,
                secondary: d.secondary,
                color: getStyle(d).fill
              }))
            }
          ]
        : [],
    [datum, getStyle]
  );
  return datum ? (
    <div
      style={{
        color: "white",
        pointerEvents: "none"
      }}
    >
      <h3
        style={{
          display: "block",
          textAlign: "center"
        }}
      >
        {primaryAxis.format(datum.primary)}
      </h3>
      <div
        style={{
          width: "300px",
          height: "200px",
          display: "flex"
        }}
      >
        <Chart
          data={data}
          dark
          series={{ type: "bar" }}
          axes={[
            {
              primary: true,
              position: "bottom",
              type: "ordinal"
            },
            {
              position: "left",
              type: "linear"
            }
          ]}
          getDatumStyle={datum => ({
            color: datum.originalDatum.color
          })}
          primaryCursor={{
            value: datum.seriesLabel
          }}
        />
      </div>
    </div>
  ) : null;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
