import Area from "./components/Area";
import Band from "./components/Band";
import Bar from "./components/Bar";
import Bubble from "./components/Bubble";
import CustomStyles from "./components/CustomStyles";
import DarkMode from "./components/DarkMode";
import DynamicContainer from "./components/DynamicContainer";
import GroupingModes from "./components/GroupingModes";
import Line from "./components/Line";
import MultipleAxes from "./components/MultipleAxes";
import Steam from "./components/Steam";
import "./styles.css";
import useLagRadar from "./useLagRadar";
import React from "react";
import ReactDOM from "react-dom";

const components = [
  ["Line", Line],
  ["Bar", Bar],
  ["Band", Band],
  ["Area", Area],
  ["Bubble", Bubble],
  ["Steam", Steam],
  ["Multiple Axes", MultipleAxes],
  ["Grouping Modes", GroupingModes],
  ["Dark Mode", DarkMode],
  ["Dynamic / Overflow Container", DynamicContainer],
  ["Custom Styles", CustomStyles],
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
