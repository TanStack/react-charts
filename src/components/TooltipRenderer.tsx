import React, { CSSProperties } from 'react'

import {
  AxisLinear,
  Datum,
  GroupingMode,
  RequiredChartOptions,
  ResolvedTooltipOptions,
} from '../types'

//
//

const showCount = 10

function getSecondaryFormatter(
  datum: Datum,
  formatSecondary?: (d: any) => any
) {
  return (
    formatSecondary ||
    datum.secondaryAxis.format ||
    ((val: any) => (Math.floor(val) < val ? Math.round(val * 100) / 100 : val))
  )
}

export type TooltipRendererProps = {
  focusedDatum: Datum | null
  tooltipOptions: ResolvedTooltipOptions
  getOptions: () => RequiredChartOptions
  primaryAxis: AxisLinear
  secondaryAxis: AxisLinear
  getDatumStyle: (datum: Datum) => CSSProperties
}

export default function TooltipRenderer(props: TooltipRendererProps) {
  if (!props.focusedDatum) {
    return null
  }

  const {
    primaryAxis,
    secondaryAxis,
    tooltipOptions,
    getDatumStyle,
    focusedDatum,
  } = props

  const { groupingMode, dark } = props.getOptions()

  const resolvedFormatTertiary =
    tooltipOptions.formatTertiary ||
    ((val: any) => (Math.floor(val) < val ? Math.round(val * 100) / 100 : val))

  const sortedGroupDatums = [...props.focusedDatum.group].sort((a, b) => {
    if (
      (!primaryAxis.stacked && groupingMode === 'series') ||
      groupingMode === 'secondary'
    ) {
      if (a.primaryCoord > b.primaryCoord) {
        return -1
      } else if (a.primaryCoord < b.primaryCoord) {
        return 1
      }
    } else if (!secondaryAxis.stacked) {
      if (a.secondaryCoord > b.secondaryCoord) {
        return -1
      } else if (a.secondaryCoord < b.secondaryCoord) {
        return 1
      }
    }
    return a.seriesIndex > b.seriesIndex ? 1 : -1
  })

  if (groupingMode === 'primary') {
    sortedGroupDatums.reverse()
  }

  if (secondaryAxis.invert) {
    sortedGroupDatums.reverse()
  }

  if (tooltipOptions.invert) {
    sortedGroupDatums.reverse()
  }

  const resolvedShowCount = showCount % 2 === 0 ? showCount : showCount + 1
  const length = sortedGroupDatums.length

  // Get the focused series' index
  const activeIndex = sortedGroupDatums.findIndex(d => d === focusedDatum)
  // Get the start by going back half of the showCount
  let start = activeIndex > -1 ? activeIndex - resolvedShowCount / 2 : 0
  // Make sure it's at least 0
  start = Math.max(start, 0)
  // Use the start and add the showCount to get the end
  let end = activeIndex > -1 ? start + resolvedShowCount : length
  // Don't let the end go passed the length
  end = Math.min(end, length)
  // Double check we aren't clipping the start
  start = Math.max(end - resolvedShowCount, 0)
  // Slice the datums by start and end
  const visibleSortedGroupDatums = sortedGroupDatums.slice(start, end)
  // Detect if we have previous items
  const hasPrevious = start > 0
  // Or next items
  const hasNext = end < length

  return (
    <div>
      <div
        style={{
          marginBottom: '3px',
          textAlign: 'center',
        }}
      >
        {groupingMode === 'series' ? (
          <strong>{focusedDatum.seriesLabel}</strong>
        ) : groupingMode === 'secondary' ? (
          <strong>
            {focusedDatum.secondaryAxis.format(
              focusedDatum.secondary,
              focusedDatum.index
            )}
          </strong>
        ) : (
          <strong>
            {focusedDatum.primaryAxis.format(
              focusedDatum.primary,
              focusedDatum.index
            )}
          </strong>
        )}
      </div>
      <table
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <tbody>
          {hasPrevious ? (
            <tr
              style={{
                opacity: 0.8,
              }}
            >
              <td />
              <td>...</td>
              <td />
            </tr>
          ) : null}
          {visibleSortedGroupDatums.map((sortedDatum, i) => {
            const active = sortedDatum === focusedDatum
            const resolvedSecondaryFormat = getSecondaryFormatter(
              sortedDatum,
              tooltipOptions.formatSecondary
            )

            return (
              <tr
                key={i}
                style={{
                  opacity: active ? 1 : 0.8,
                  fontWeight: active ? 'bold' : undefined,
                }}
              >
                <td
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '5px',
                  }}
                >
                  <svg width="16" height="16">
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      style={{
                        ...getDatumStyle(sortedDatum),
                        stroke: dark ? 'black' : 'white',
                        strokeWidth: active ? 2 : 1,
                      }}
                    />
                  </svg>
                </td>
                {groupingMode === 'series' ? (
                  <React.Fragment>
                    <td>
                      {primaryAxis.format(
                        sortedDatum.primary,
                        sortedDatum.index
                      )}
                      : &nbsp;
                    </td>
                    <td
                      style={{
                        textAlign: 'right',
                      }}
                    >
                      {resolvedSecondaryFormat(
                        sortedDatum.secondary,
                        sortedDatum.index
                      )}
                      {sortedDatum.r
                        ? ` (${resolvedFormatTertiary(sortedDatum.r)})`
                        : null}
                    </td>
                  </React.Fragment>
                ) : groupingMode === 'secondary' ? (
                  <React.Fragment>
                    <td>{sortedDatum.seriesLabel}: &nbsp;</td>
                    <td
                      style={{
                        textAlign: 'right',
                      }}
                    >
                      {primaryAxis.format(
                        sortedDatum.primary,
                        sortedDatum.index
                      )}
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
                        textAlign: 'right',
                      }}
                    >
                      {resolvedSecondaryFormat(
                        sortedDatum.secondary,
                        sortedDatum.index
                      )}
                      {sortedDatum.r
                        ? ` (${resolvedFormatTertiary(sortedDatum.r)})`
                        : null}
                    </td>
                  </React.Fragment>
                )}
              </tr>
            )
          })}
          {hasNext ? (
            <tr
              style={{
                opacity: 0.8,
              }}
            >
              <td />
              <td>...</td>
              <td />
            </tr>
          ) : null}
          {secondaryAxis &&
          secondaryAxis.stacked &&
          focusedDatum.group.length > 1 ? (
            <tr>
              <td
                style={{
                  paddingTop: '5px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: dark
                      ? 'rgba(0, 26, 39, 0.3)'
                      : 'rgba(255,255,255,.2)',
                    borderRadius: '50px',
                  }}
                />
              </td>
              <td
                style={{
                  paddingTop: '5px',
                }}
              >
                Total: &nbsp;
              </td>
              <td
                style={{
                  paddingTop: '5px',
                }}
              >
                {secondaryAxis.format(
                  [...focusedDatum.group].reverse()[0].totalValue,
                  -1
                )}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}
