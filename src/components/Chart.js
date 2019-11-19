import React from "react";
import PropTypes from "prop-types";
//
import ChartContext from "../utils/ChartContext";
import Utils from "../utils/Utils";

import useHyperResponsive from "../hooks/useHyperResponsive";
import useLatestRef from "../hooks/useLatestRef";
import useLatest from "../hooks/useLatest";
import usePrevious from "../hooks/usePrevious";

import ChartInner from "./ChartInner";

import calculateMaterializeData from "./pipeline/calculateMaterializeData";
import calculateSeriesOptions, {
  seriesPropType
} from "./pipeline/calculateSeriesOptions";
import calculateSeriesTypes from "./pipeline/calculateSeriesTypes";
import calculateDimensions from "./pipeline/calculateDimensions";
import calculateAxes, { axisShape } from "./pipeline/calculateAxes";
import calculateStackData from "./pipeline/calculateStackData";
import calculateTooltip, { tooltipShape } from "./pipeline/calculateTooltip";
import calculateCursors, { cursorShape } from "./pipeline/calculateCursors";

import {
  groupingSingle,
  groupingSeries,
  groupingPrimary,
  groupingSecondary,
  focusAuto,
  focusElement,
  focusClosest
} from "../utils/Constants";

const defaultProps = {
  getDatums: d => (Array.isArray(d) ? d : d.datums || d.data),
  getLabel: (d, i) => d.label || `Series ${i + 1}`,
  getSeriesID: (d, i) => i,
  getPrimary: d => (Array.isArray(d) ? d[0] : d.primary || d.x),
  getSecondary: d => (Array.isArray(d) ? d[1] : d.secondary || d.y),
  getR: d => (Array.isArray(d) ? d[2] : d.radius || d.r),
  getPrimaryAxisID: s => s.primaryAxisID,
  getSecondaryAxisID: s => s.secondaryAxisID,
  getSeriesStyle: series => ({ color: series.originalSeries.color }),
  getDatumStyle: () => ({}),
  getSeriesOrder: d => d,
  onHover: () => {},
  grouping: groupingPrimary,
  focus: focusAuto,
  showVoronoi: false
};

export default function Chart({
  data,
  grouping,
  focus,
  showVoronoi,
  dark,
  series,
  axes,
  primaryCursor,
  secondaryCursor,
  tooltip,
  brush,
  renderSVG,
  getDatums,
  getLabel,
  getSeriesID,
  getPrimary,
  getSecondary,
  getR,
  getPrimaryAxisID,
  getSecondaryAxisID,
  getSeriesStyle,
  getDatumStyle,
  onClick,
  onFocus,
  onHover,
  getSeriesOrder,
  ...rest
}) {
  let [
    { focused, element, axisDimensions, offset: offsetState, padding, pointer },
    setChartState
  ] = React.useState({
    focused: null,
    element: null,
    axisDimensions: {},
    padding: {},
    offset: {},
    pointer: {}
  });

  const onClickRef = useLatestRef(onClick);
  const onFocusRef = useLatestRef(onFocus);
  const onHoverRef = useLatestRef(onHover);

  const responsiveElRef = React.useRef();
  const [{ width, height }] = useHyperResponsive(responsiveElRef);

  getSeriesID = React.useCallback(
    Utils.normalizeGetter(getSeriesID),
    getSeriesID
  );
  getLabel = React.useCallback(Utils.normalizeGetter(getLabel), getLabel);
  getPrimaryAxisID = React.useCallback(
    Utils.normalizeGetter(getPrimaryAxisID),
    getPrimaryAxisID
  );
  getSecondaryAxisID = React.useCallback(
    Utils.normalizeGetter(getSecondaryAxisID),
    getSecondaryAxisID
  );
  getDatums = React.useCallback(Utils.normalizeGetter(getDatums), getDatums);
  getPrimary = React.useCallback(Utils.normalizeGetter(getPrimary), getPrimary);
  getSecondary = React.useCallback(
    Utils.normalizeGetter(getSecondary),
    getSecondary
  );
  getR = React.useCallback(Utils.normalizeGetter(getR), getR);

  let materializedData = calculateMaterializeData({
    data,
    getSeriesID,
    getLabel,
    getPrimaryAxisID,
    getSecondaryAxisID,
    getDatums,
    getPrimary,
    getSecondary,
    getR
  });

  const seriesOptions = calculateSeriesOptions({
    materializedData,
    series
  });

  materializedData = calculateSeriesTypes({
    materializedData,
    seriesOptions
  });

  const { offset, gridX, gridY, gridWidth, gridHeight } = calculateDimensions({
    width,
    height,
    axisDimensions,
    padding,
    offset: offsetState
  });

  const {
    primaryAxes,
    secondaryAxes,
    xKey,
    yKey,
    xAxes,
    yAxes
  } = calculateAxes({
    axes,
    materializedData,
    gridHeight,
    gridWidth,
    axisDimensions
  });

  const stackData = calculateStackData({
    materializedData,
    primaryAxes,
    secondaryAxes,
    yAxes,
    yKey,
    xAxes,
    xKey,
    grouping
  });

  pointer = React.useMemo(
    () => {
      return {
        ...pointer,
        axisValues: [...primaryAxes, ...secondaryAxes].map(axis => ({
          axis,
          value: axis.scale.invert
            ? axis.scale.invert(pointer[axis.vertical ? "y" : "x"])
            : null
        }))
      };
    },
    [pointer, primaryAxes, secondaryAxes]
  );

  focused = React.useMemo(
    () => {
      // Get the closest focus datum out of the datum group
      if (focused || element) {
        let resolvedFocus = focus;

        if (focus === focusAuto) {
          if (element) {
            resolvedFocus = focusElement;
          } else {
            resolvedFocus = focusClosest;
          }
        }

        if (resolvedFocus === focusElement && element) {
          return element;
        } else if (resolvedFocus === focusClosest) {
          return Utils.getClosestPoint(pointer, focused.group);
        }
      }
      return null;
    },
    [element, focus, focused, pointer]
  );

  // keep the previous focused value around for animations
  const latestFocused = useLatest(focused, focused);

  // Calculate Tooltip
  tooltip = calculateTooltip({
    focused,
    tooltip,
    pointer,
    gridWidth,
    gridHeight
  });

  // Cursors
  [primaryCursor, secondaryCursor] = calculateCursors({
    primaryCursor,
    secondaryCursor,
    primaryAxes,
    secondaryAxes,
    focused,
    pointer,
    gridWidth,
    gridHeight,
    stackData
  });

  React.useEffect(
    () => {
      if (onFocusRef.current) {
        onFocusRef.current(focused);
      }
    },
    [onFocusRef, focused]
  );

  React.useEffect(
    () => {
      if (onHoverRef.current) {
        onHoverRef.current(pointer);
      }
    },
    [onHoverRef, pointer]
  );

  const previousDragging = usePrevious(pointer.dragging);

  React.useEffect(
    () => {
      if (brush && previousDragging && !pointer.dragging) {
        if (Math.abs(pointer.sourceX - pointer.x) < 20) {
          return;
        }
        brush.onSelect({
          pointer: pointer.released,
          start: primaryAxes[0].scale.invert(pointer.sourceX),
          end: primaryAxes[0].scale.invert(pointer.x)
        });
      }
    },
    [
      brush,
      pointer,
      pointer.released,
      pointer.sourceX,
      pointer.x,
      previousDragging,
      primaryAxes
    ]
  );

  // Decorate the chartState with computed values (or ones we just
  // want to pass down through context)
  const chartState = React.useMemo(
    () => ({
      focused,
      latestFocused,
      pointer,
      tooltip,
      axisDimensions,
      offset,
      padding,
      width,
      height,
      brush,
      grouping,
      showVoronoi,
      materializedData,
      stackData,
      primaryAxes,
      secondaryAxes,
      primaryCursor,
      secondaryCursor,
      gridX,
      gridY,
      gridWidth,
      gridHeight,
      dark,
      renderSVG,
      xKey,
      yKey,
      xAxes,
      yAxes,
      onClickRef,
      getSeriesStyle,
      getDatumStyle,
      seriesOptions,
      getSeriesOrder
    }),
    [
      axisDimensions,
      brush,
      dark,
      focused,
      getDatumStyle,
      getSeriesOrder,
      getSeriesStyle,
      gridHeight,
      gridWidth,
      gridX,
      gridY,
      grouping,
      height,
      latestFocused,
      materializedData,
      offset,
      onClickRef,
      padding,
      pointer,
      primaryAxes,
      primaryCursor,
      renderSVG,
      secondaryAxes,
      secondaryCursor,
      seriesOptions,
      showVoronoi,
      stackData,
      tooltip,
      width,
      xAxes,
      xKey,
      yAxes,
      yKey
    ]
  );

  const chartStateContextValue = React.useMemo(
    () => [chartState, setChartState],
    [chartState, setChartState]
  );

  return (
    <ChartContext.Provider value={chartStateContextValue}>
      <ChartInner
        ref={responsiveElRef}
        {...rest}
        onClick={e => {
          if (onClickRef.current) {
            onClickRef.current(focused);
          }
        }}
      />
    </ChartContext.Provider>
  );
}

Chart.propTypes = {
  data: PropTypes.any.isRequired,
  focus: PropTypes.oneOf([focusAuto, focusClosest, focusElement]).isRequired,
  grouping: PropTypes.oneOf([
    groupingSingle,
    groupingSeries,
    groupingPrimary,
    groupingSecondary
  ]).isRequired,
  showVoronoi: PropTypes.bool,
  dark: PropTypes.bool,
  series: seriesPropType,
  axes: PropTypes.arrayOf(axisShape),
  primaryCursor: cursorShape,
  secondaryCursor: cursorShape,
  tooltip: tooltipShape,
  renderSVG: PropTypes.func,
  getDatums: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
  getSeriesID: PropTypes.func.isRequired,
  getPrimary: PropTypes.func.isRequired,
  getSecondary: PropTypes.func.isRequired,
  getR: PropTypes.func.isRequired,
  getPrimaryAxisID: PropTypes.func.isRequired,
  getSecondaryAxisID: PropTypes.func.isRequired,
  getSeriesOrder: PropTypes.func.isRequired,
  getSeriesStyle: PropTypes.func,
  getDatumStyle: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onHover: PropTypes.func
};

Chart.defaultProps = defaultProps;
