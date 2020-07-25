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
    { primaryCursorValue, secondaryCursorValue },
    setState
  ] = React.useState({
    primaryCursorValue: null,
    secondaryCursorValue: null
  });

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear" }
    ],
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

  const onFocus = React.useCallback(datum => {
    setState({
      primaryCursorValue: datum ? datum.primary : null,
      secondaryCursorValue: datum ? datum.secondary : null
    });
  }, []);

  return (
    <>
      <pre>
        {JSON.stringify({ primaryCursorValue, secondaryCursorValue }, null, 2)}
      </pre>
      <ResizableBox width={500} height={250}>
        <ChartWithData
          axes={axes}
          onFocus={onFocus}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
          tooltip
        />
      </ResizableBox>
      <br />
      <ResizableBox width={600} height={200}>
        <ChartWithData
          axes={axes}
          onFocus={onFocus}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
          tooltip
        />
      </ResizableBox>
      <br />
      <ResizableBox width={700} height={150}>
        <ChartWithData
          axes={axes}
          onFocus={onFocus}
          primaryCursor={primaryCursor}
          secondaryCursor={secondaryCursor}
          tooltip
        />
      </ResizableBox>
    </>
  );
}

function ChartWithData(props) {
  const { data } = useDemoConfig({
    series: 10
  });

  return <Chart data={data} {...props} />;
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
