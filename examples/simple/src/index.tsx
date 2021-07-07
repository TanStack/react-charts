import Area from "./components/Area";
import Bar from "./components/Bar";
import GroupingModes from "./components/GroupingModes";
import Line from "./components/Line";
import MultipleAxes from "./components/MultipleAxes";
import "./styles.css";
import useLagRadar from "./useLagRadar";
import React from "react";
// import { timeDay } from "d3";
import ReactDOM from "react-dom";

const components = [
  ["Line", Line],
  ["Bar", Bar],
  ["Area", Area],
  ["Multiple Axes", MultipleAxes],
  ["Grouping Modes", GroupingModes],
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
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
