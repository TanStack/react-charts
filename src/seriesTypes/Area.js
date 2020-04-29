import React from "react";
import { area, line } from "d3-shape";
//

import Utils from "../utils/Utils";
import { curveLinear } from "../utils/Curves";

import usePropsMemo from "../hooks/usePropsMemo";
import useSeriesStyle from "../hooks/useSeriesStyle";
import useDatumStyle from "../hooks/useDatumStyle";

import Path from "../primitives/Path";
import Line from "../primitives/Line";

const defaultAreaStyle = {
  strokeWidth: 0
};

const lineDefaultStyle = {
  strokeWidth: 3
};

export default function Area({ series, showOrphans, curve }) {
  const areaFn = React.useMemo(
    () =>
      area()
        .x(d => d.x)
        .y0(d => d.base)
        .y1(d => d.y)
        .defined(d => d.defined)
        .curve(curve),
    [curve]
  );

  const lineFn = React.useMemo(
    () =>
      line()
        .x(d => d.x)
        .y(d => d.y)
        .defined(d => d.defined)
        .curve(curve),
    [curve]
  );
  const areaPath = React.useMemo(() => areaFn(series.datums), [
    areaFn,
    series.datums
  ]);
  const linePath = React.useMemo(() => lineFn(series.datums), [
    lineFn,
    series.datums
  ]);

  const style = useSeriesStyle(series);

  const areaPathProps = {
    d: areaPath,
    style: {
      ...defaultAreaStyle,
      ...style,
      ...style.line,
      ...style.area
    }
  };
  const renderedAreaPath = usePropsMemo(
    () => <Path {...areaPathProps} />,
    areaPathProps
  );

  const linePathProps = {
    d: linePath,
    style: {
      ...defaultAreaStyle,
      ...style,
      ...style.line,
      fill: "none"
    }
  };
  const renderedLinePath = usePropsMemo(
    () => <Path {...linePathProps} />,
    linePathProps
  );

  return (
    <g>
      {renderedAreaPath}
      {renderedLinePath}
      {showOrphans &&
        series.datums.map((datum, index, all) => {
          return (
            <OrphanLine
              {...{
                key: index,
                datum,
                style,
                all,
                index
              }}
            />
          );
        })}
    </g>
  );
}

Area.defaultProps = {
  showOrphans: true,
  curve: curveLinear
};

Area.plotDatum = (datum, { primaryAxis, secondaryAxis, xAxis, yAxis }) => {
  // Turn clamping on for secondaryAxis
  secondaryAxis.scale.clamp(true);

  datum.primaryCoord = primaryAxis.scale(datum.primary);
  datum.secondaryCoord = secondaryAxis.scale(datum.secondary);
  datum.x = xAxis.scale(datum.xValue);
  datum.y = yAxis.scale(datum.yValue);
  datum.defined =
    Utils.isValidPoint(datum.xValue) && Utils.isValidPoint(datum.yValue);
  datum.base = primaryAxis.vertical
    ? xAxis.scale(datum.baseValue)
    : yAxis.scale(datum.baseValue);

  // Turn clamping back off for secondaryAxis
  secondaryAxis.scale.clamp(false);

  // Adjust non-bar elements for ordinal scales
  if (xAxis.type === "ordinal") {
    datum.x += xAxis.tickOffset;
  }
  if (yAxis.type === "ordinal") {
    datum.y += yAxis.tickOffset;
  }

  // Set the default anchor point
  datum.anchor = {
    x: datum.x,
    y: datum.y
  };

  // Set the pointer points (used in voronoi)
  datum.boundingPoints = [
    datum.anchor,
    {
      x: primaryAxis.vertical
        ? primaryAxis.position === "left"
          ? datum.base - 1
          : datum.base
        : datum.anchor.x,
      y: !primaryAxis.vertical
        ? primaryAxis.position === "bottom"
          ? datum.base - 1
          : datum.base
        : datum.anchor.y
    }
  ];
};

Area.buildStyles = (series, { defaultColors }) => {
  const defaults = {
    // Pass some sane defaults
    color: defaultColors[series.index % (defaultColors.length - 1)]
  };

  Utils.buildStyleGetters(series, defaults);
};

const OrphanLine = function OrphanLine({ datum, style, all, index }) {
  const prev = all[index - 1] || { defined: false };
  const next = all[index + 1] || { defined: false };

  const dataStyle = useDatumStyle(datum);

  const lineProps = {
    x1: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y1: !datum || Number.isNaN(datum.base) ? null : datum.base,
    x2: !datum || Number.isNaN(datum.x) ? null : datum.x,
    y2: !datum || Number.isNaN(datum.y) ? null : datum.y,
    style: {
      ...lineDefaultStyle,
      ...style,
      ...style.line,
      ...dataStyle,
      ...dataStyle.line
    }
  };

  return usePropsMemo(() => {
    if (!datum.defined || prev.defined || next.defined) {
      return null;
    }
    return <Line {...lineProps} />;
  }, lineProps);
};
