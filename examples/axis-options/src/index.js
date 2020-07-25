import React from "react";
import ReactDOM from "react-dom";

import { Chart } from "react-charts";

import useDemoConfig from "./useDemoConfig";
import useLagRadar from "./useLagRadar";
import ResizableBox from "./ResizableBox";
import "./styles.css";

export default function App() {
  useLagRadar();

  const {
    data,
    primaryAxisShow,
    secondaryAxisShow,
    randomizeData,
    Options
  } = useDemoConfig({
    series: 10,
    show: ["primaryAxisShow", "secondaryAxisShow"]
  });

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        position: "bottom",
        type: "time",
        show: primaryAxisShow
      },
      { position: "left", type: "linear", show: secondaryAxisShow }
    ],
    [primaryAxisShow, secondaryAxisShow]
  );

  return (
    <>
      {Options}
      <br />
      <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br />
      <ResizableBox>
        <Chart data={data} axes={axes} tooltip />
      </ResizableBox>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
