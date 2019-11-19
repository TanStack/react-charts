import React from "react";
//
//
import {
  groupingSeries,
  groupingPrimary,
  groupingSecondary
} from "../utils/Constants";

const showCount = 10;

function getSecondaryFormatter(datum, formatSecondary) {
  return (
    formatSecondary ||
    datum.secondaryAxis.format ||
    (val => (Math.floor(val) < val ? Math.round(val * 100) / 100 : val))
  );
}

export default function TooltipRenderer(props) {
  const {
    datum,
    grouping,
    primaryAxis,
    secondaryAxis,
    formatSecondary,
    formatTertiary,
    getStyle,
    dark
  } = props;

  if (!datum) {
    return null;
  }

  const resolvedFormatTertiary =
    formatTertiary ||
    (val => (Math.floor(val) < val ? Math.round(val * 100) / 100 : val));

  const sortedGroupDatums = [...datum.group].sort((a, b) => {
    if (
      (!primaryAxis.stacked && grouping === groupingSeries) ||
      grouping === groupingSecondary
    ) {
      if (a.primaryCoord > b.primaryCoord) {
        return -1;
      } else if (a.primaryCoord < b.primaryCoord) {
        return 1;
      }
    } else if (!secondaryAxis.stacked) {
      if (a.secondaryCoord > b.secondaryCoord) {
        return -1;
      } else if (a.secondaryCoord < b.secondaryCoord) {
        return 1;
      }
    }
    return a.seriesIndex > b.seriesIndex ? 1 : -1;
  });

  if (grouping === groupingPrimary) {
    sortedGroupDatums.reverse();
  }

  if (secondaryAxis.invert) {
    sortedGroupDatums.reverse();
  }

  const resolvedShowCount = showCount % 2 === 0 ? showCount : showCount + 1;
  const length = sortedGroupDatums.length;

  // Get the focused series' index
  const activeIndex = sortedGroupDatums.findIndex(d => d === datum);
  // Get the start by going back half of the showCount
  let start = activeIndex > -1 ? activeIndex - resolvedShowCount / 2 : 0;
  // Make sure it's at least 0
  start = Math.max(start, 0);
  // Use the start and add the showCount to get the end
  let end = activeIndex > -1 ? start + resolvedShowCount : length;
  // Don't let the end go passed the length
  end = Math.min(end, length);
  // Double check we aren't clipping the start
  start = Math.max(end - resolvedShowCount, 0);
  // Slice the datums by start and end
  const visibleSortedGroupDatums = sortedGroupDatums.slice(start, end);
  // Detect if we have previous items
  const hasPrevious = start > 0;
  // Or next items
  const hasNext = end < length;

  return (
    <div>
      <div
        style={{
          marginBottom: "3px",
          textAlign: "center"
        }}
      >
        {grouping === groupingSeries ? (
          <strong>{datum.seriesLabel}</strong>
        ) : grouping === groupingSecondary ? (
          <strong>{datum.secondaryAxis.format(datum.secondary)}</strong>
        ) : (
          <strong>{datum.primaryAxis.format(datum.primary)}</strong>
        )}
      </div>
      <table
        style={{
          whiteSpace: "nowrap"
        }}
      >
        <tbody>
          {hasPrevious ? (
            <tr
              style={{
                opacity: 0.8
              }}
            >
              <td />
              <td>...</td>
              <td />
            </tr>
          ) : null}
          {visibleSortedGroupDatums.map((sortedDatum, i) => {
            const active = sortedDatum === datum;
            const resolvedSecondaryFormat = getSecondaryFormatter(
              sortedDatum,
              formatSecondary
            );

            return (
              <tr
                key={i}
                style={{
                  opacity: active ? 1 : 0.8,
                  fontWeight: active && "bold"
                }}
              >
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "5px"
                  }}
                >
                  <svg width="16" height="16">
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      style={{
                        ...getStyle(sortedDatum),
                        stroke: dark ? "black" : "white",
                        strokeWidth: active ? 2 : 1
                      }}
                    />
                  </svg>
                </td>
                {grouping === groupingSeries ? (
                  <React.Fragment>
                    <td>{primaryAxis.format(sortedDatum.primary)}: &nbsp;</td>
                    <td
                      style={{
                        textAlign: "right"
                      }}
                    >
                      {resolvedSecondaryFormat(sortedDatum.secondary)}
                      {sortedDatum.r
                        ? ` (${resolvedFormatTertiary(sortedDatum.r)})`
                        : null}
                    </td>
                  </React.Fragment>
                ) : grouping === groupingSecondary ? (
                  <React.Fragment>
                    <td>{sortedDatum.seriesLabel}: &nbsp;</td>
                    <td
                      style={{
                        textAlign: "right"
                      }}
                    >
                      {primaryAxis.format(sortedDatum.primary)}
                      {sortedDatum.r
                        ? ` (${resolvedFormatTertiary(sortedDatum.r)})`
                        : null}
                    </td>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <td>{sortedDatum.seriesLabel}: &nbsp;</td>
                    <td
                      style={{
                        textAlign: "right"
                      }}
                    >
                      {resolvedSecondaryFormat(sortedDatum.secondary)}
                      {sortedDatum.r
                        ? ` (${resolvedFormatTertiary(sortedDatum.r)})`
                        : null}
                    </td>
                  </React.Fragment>
                )}
              </tr>
            );
          })}
          {hasNext ? (
            <tr
              style={{
                opacity: 0.8
              }}
            >
              <td />
              <td>...</td>
              <td />
            </tr>
          ) : null}
          {secondaryAxis && secondaryAxis.stacked && datum.group.length > 1 ? (
            <tr>
              <td
                style={{
                  paddingTop: "5px"
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: dark
                      ? "rgba(0, 26, 39, 0.3)"
                      : "rgba(255,255,255,.2)",
                    borderRadius: "50px"
                  }}
                />
              </td>
              <td
                style={{
                  paddingTop: "5px"
                }}
              >
                Total: &nbsp;
              </td>
              <td
                style={{
                  paddingTop: "5px"
                }}
              >
                {secondaryAxis.format(
                  [...datum.group].reverse()[0].totalValue
                )}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
