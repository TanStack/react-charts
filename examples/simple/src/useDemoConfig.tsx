import React from "react";

//

const options = {
  elementType: ["line", "area", "bar"],
  primaryAxisType: ["linear", "time", "log", "band"],
  secondaryAxisType: ["linear", "time", "log", "band"],
  primaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisPosition: ["top", "left", "right", "bottom"],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  interactionMode: ["primary", "closest"],
  tooltipGroupingMode: ["single", "primary", "secondary", "series"],
  tooltipAnchor: [
    "closest",
    "top",
    "bottom",
    "left",
    "right",
    "center",
    "gridTop",
    "gridBottom",
    "gridLeft",
    "gridRight",
    "gridCenter",
    "pointer",
  ],
  tooltipAlign: [
    "auto",
    "top",
    "bottom",
    "left",
    "right",
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight",
    "center",
  ],
  snapCursor: [true, false],
} as const;

type DataType = "time" | "ordinal" | "linear";
type ElementType = typeof options["elementType"][number];
type PrimaryAxisType = typeof options["primaryAxisType"][number];
type SecondaryAxisType = typeof options["secondaryAxisType"][number];
type PrimaryAxisPosition = typeof options["primaryAxisPosition"][number];
type SecondaryAxisPosition = typeof options["secondaryAxisPosition"][number];
type TooltipAnchor = typeof options["tooltipAnchor"][number];
type TooltipAlign = typeof options["tooltipAlign"][number];
type InteractionMode = typeof options["interactionMode"][number];
type TooltipGroupingMode = typeof options["tooltipGroupingMode"][number];

const optionKeys = Object.keys(options) as (keyof typeof options)[];

export default function useChartConfig({
  series,
  datums = 10,
  useR,
  show = [],
  count = 1,
  resizable = true,
  canRandomize = true,
  dataType = "time",
  elementType = "line",
  primaryAxisType = "time",
  secondaryAxisType = "linear",
  primaryAxisPosition = "bottom",
  secondaryAxisPosition = "left",
  primaryAxisStack = false,
  secondaryAxisStack = true,
  primaryAxisShow = true,
  secondaryAxisShow = true,
  tooltipAnchor = "closest",
  tooltipAlign = "auto",
  interactionMode = "primary",
  tooltipGroupingMode = "primary",
  snapCursor = true,
}: {
  series: number;
  datums?: number;
  useR?: boolean;
  show?: (keyof typeof options)[];
  count?: number;
  resizable?: boolean;
  canRandomize?: boolean;
  dataType?: DataType;
  elementType?: ElementType;
  primaryAxisType?: PrimaryAxisType;
  secondaryAxisType?: SecondaryAxisType;
  primaryAxisPosition?: PrimaryAxisPosition;
  secondaryAxisPosition?: SecondaryAxisPosition;
  primaryAxisStack?: boolean;
  secondaryAxisStack?: boolean;
  primaryAxisShow?: boolean;
  secondaryAxisShow?: boolean;
  tooltipAnchor?: TooltipAnchor;
  tooltipAlign?: TooltipAlign;
  interactionMode?: InteractionMode;
  tooltipGroupingMode?: TooltipGroupingMode;
  snapCursor?: boolean;
}) {
  const [state, setState] = React.useState({
    count,
    resizable,
    canRandomize,
    dataType,
    elementType,
    primaryAxisType,
    secondaryAxisType,
    primaryAxisPosition,
    secondaryAxisPosition,
    primaryAxisStack,
    secondaryAxisStack,
    primaryAxisShow,
    secondaryAxisShow,
    tooltipAnchor,
    tooltipAlign,
    interactionMode,
    tooltipGroupingMode,
    snapCursor,
    datums,
    data: makeDataFrom(dataType, series, datums, useR),
  });

  React.useEffect(() => {
    setState((old) => ({
      ...old,
      data: makeDataFrom(dataType, series, datums, useR),
    }));
  }, [count, dataType, datums, series, useR]);

  const randomizeData = () =>
    setState((old) => ({
      ...old,
      data: makeDataFrom(dataType, series, datums, useR),
    }));

  const Options = optionKeys
    .filter((option) => show.indexOf(option) > -1)
    .map((option) => (
      <div key={option}>
        {option}: &nbsp;
        <select
          value={state[option] as string}
          onChange={({ target: { value } }) =>
            setState((old) => ({
              ...old,
              [option]:
                typeof options[option][0] === "boolean"
                  ? value === "true"
                  : value,
            }))
          }
        >
          {options[option].map((d: any) => (
            <option value={d as string} key={d.toString()}>
              {d.toString()}
            </option>
          ))}
        </select>
        <br />
      </div>
    ));

  return {
    ...state,
    randomizeData,
    Options,
  };
}

function makeDataFrom(
  dataType: DataType,
  series: number,
  datums: number,
  useR?: boolean
) {
  return [
    ...new Array(series || Math.max(Math.round(Math.random() * 5), 1)),
  ].map((d, i) => makeSeries(i, dataType, datums, useR));
}

function makeSeries(
  i: number,
  dataType: DataType,
  datums: number,
  useR?: boolean
) {
  const start = 0;
  const startDate = new Date();
  // startDate.setFullYear(2020);
  startDate.setUTCHours(0);
  startDate.setUTCMinutes(0);
  startDate.setUTCSeconds(0);
  startDate.setUTCMilliseconds(0);
  // const length = 5 + Math.round(Math.random() * 15)
  const length = datums;
  const min = 0;
  const max = 100;
  const rMin = 2;
  const rMax = 20;
  const nullChance = 0;
  return {
    label: `Series ${i + 1}`,
    data: [...new Array(length)].map((_, i) => {
      let x;

      if (dataType === "ordinal") {
        x = `Ordinal Group ${start + i}`;
      } else if (dataType === "time") {
        x = new Date(startDate.getTime() + 60 * 1000 * 60 * 24 * i);
      } else if (dataType === "linear") {
        x =
          Math.random() < nullChance
            ? null
            : min + Math.round(Math.random() * (max - min));
      } else {
        x = start + i;
      }

      const distribution = 1.1;

      const y =
        Math.random() < nullChance
          ? null
          : min + Math.round(Math.random() * (max - min));

      const r = !useR
        ? undefined
        : rMax -
          Math.floor(
            Math.log(Math.random() * (distribution ** rMax - rMin) + rMin) /
              Math.log(distribution)
          );

      return {
        primary: x,
        secondary: y,
        radius: r,
      };
    }),
  };
}
