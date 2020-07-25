import React from "react";
import ReactDOM from "react-dom";
import Tree from "react-json-tree";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  const [{ clicked, focused, hovered }, setState] = React.useState({
    clicked: null,
    focused: null,
    hovered: null
  });

  const { data, grouping, elementType, randomizeData, Options } = useDemoConfig(
    {
      series: 10,
      show: ["elementType", "grouping"]
    }
  );

  const axes = React.useMemo(
    () => [
      { primary: true, position: "bottom", type: "time" },
      { position: "left", type: "linear" }
    ],
    []
  );

  return (
    <>
      {Options}
      <br />
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart
          data={data}
          grouping={grouping}
          type={elementType}
          axes={axes}
          primaryCursor
          secondaryCursor
          tooltip
          onClick={datum => setState(old => ({ ...old, clicked: datum }))}
          onFocus={datum => setState(old => ({ ...old, focused: datum }))}
          onHover={pointer => setState(old => ({ ...old, hovered: pointer }))}
        />
      </ResizableBox>
      <br />
      <div>Hovered:</div>
      <Tree hideRoot data={hovered} />
      <div>Focused:</div>
      <Tree hideRoot data={focused} />
      <div>Clicked:</div>
      <Tree hideRoot data={clicked} />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
