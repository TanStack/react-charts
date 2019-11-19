import React from "react";
//
import ChartContext from "../utils/ChartContext";

export default function useSeriesStyle(series) {
  const [{ focused, getSeriesStyle }] = React.useContext(ChartContext);
  return series.getStatusStyle(focused, getSeriesStyle);
}
