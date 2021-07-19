import "./styles.css";
import useLagRadar from "./useLagRadar";
import React from "react";
import ReactDOM from "react-dom";

//

import Area from "./components/Area";
import Band from "./components/Band";
import Bar from "./components/Bar";
import Bubble from "./components/Bubble";
import CustomStyles from "./components/CustomStyles";
import DarkMode from "./components/DarkMode";
import DynamicContainer from "./components/DynamicContainer";
import InteractionMode from "./components/InteractionMode";
import Line from "./components/Line";
import MultipleAxes from "./components/MultipleAxes";
import Steam from "./components/Steam";
import BarHorizontal from "./components/BarHorizontal";
import SparkChart from "./components/SparkChart";
import SyncedCursors from "./components/SyncedCursors";
import StressTest from "./components/StressTest";

const components = [
  ["Line", Line],
  ["Bar", Bar],
  ["Bar (Horizontal)", BarHorizontal],
  ["Band", Band],
  ["Area", Area],
  ["Bubble", Bubble],
  ["Steam", Steam],
  ["Spark Chart", SparkChart],
  ["Multiple Axes", MultipleAxes],
  ["Interaction Modes", InteractionMode],
  ["Dark Mode", DarkMode],
  ["Dynamic / Overflow Container", DynamicContainer],
  ["Custom Styles", CustomStyles],
  ["Synced Cursors", SyncedCursors],
  ["Stress Test", StressTest],
];

export default function App() {
  useLagRadar();

  return (
    <div>
      {components.map(([label, Comp]) => {
        return (
          <div key={label + ""}>
            <h1>{label}</h1>
            <div>
              <Comp />
            </div>
          </div>
        );
      })}
      <div style={{ height: "50rem" }} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
