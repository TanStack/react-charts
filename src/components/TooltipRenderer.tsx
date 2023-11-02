import { sum } from 'd3-array'
import React, { CSSProperties } from 'react'

import { useAnchor } from '../hooks/useAnchor'
import useLatestWhen from '../hooks/useLatestWhen'
import {
  Axis,
  AxisLinear,
  AxisTime,
  Datum,
  ResolvedChartOptions,
} from '../types'

//
//

const showCount = 10

const triangleSize = 7

const getBackgroundColor = (dark?: boolean) =>
  dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)'

export type TooltipRendererProps<TDatum> = {
  focusedDatum: Datum<TDatum> | null
  getOptions: () => ResolvedChartOptions<TDatum>
  primaryAxis: Axis<TDatum>
  secondaryAxes: Axis<TDatum>[]
  secondaryAxis: Axis<TDatum>
  getDatumStyle: (datum: Datum<TDatum>) => CSSProperties
  anchor: ReturnType<typeof useAnchor>
}

export default function tooltipRenderer<TDatum>(
  props: TooltipRendererProps<TDatum>
) {
  return <TooltipRenderer {...props} />
}

function TooltipRenderer<TDatum>(props: TooltipRendererProps<TDatum>) {
  const latestFit = useLatestWhen(props.anchor.fit, !!props.anchor.fit)

  if (!props.focusedDatum) {
    return null
  }

  const {
    primaryAxis,
    secondaryAxis,
    getDatumStyle,
    focusedDatum,
    secondaryAxes,
  } = props

  const { tooltip, dark } = props.getOptions()

  const groupDatums = (props.focusedDatum?.tooltipGroup ?? []).filter(
    datum => tooltip.showDatumInTooltip?.(datum) ?? true
  )

  const resolvedShowCount = showCount % 2 === 0 ? showCount : showCount + 1
  const length = groupDatums.length

  // Get the focused series' index
  const activeIndex = groupDatums.findIndex(d => d === focusedDatum)
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
  const visibleSortedGroupDatums = groupDatums.slice(start, end)
  // Detect if we have previous items
  const hasPrevious = start > 0
  // Or next items
  const hasNext = end < length

  const finalAlign = `${latestFit?.side}-${latestFit?.align}`

  let arrowPosition
  let triangleStyles

  if (!arrowPosition) {
    if (finalAlign === 'left-center') {
      arrowPosition = 'right'
    } else if (finalAlign === 'right-center') {
      arrowPosition = 'left'
    } else if (finalAlign === 'top-center') {
      arrowPosition = 'bottom'
    } else if (finalAlign === 'bottom-center') {
      arrowPosition = 'top'
    } else if (finalAlign === 'right-start') {
      arrowPosition = 'bottomLeft'
    } else if (finalAlign === 'right-end') {
      arrowPosition = 'topLeft'
    } else if (finalAlign === 'left-start') {
      arrowPosition = 'bottomRight'
    } else if (finalAlign === 'left-end') {
      arrowPosition = 'topRight'
    }
  }

  const backgroundColor = getBackgroundColor(dark)

  if (arrowPosition === 'bottom') {
    triangleStyles = {
      top: '100%',
      left: '50%',
      transform: 'translate3d(-50%, 0%, 0)',
      borderLeft: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 0.8}px solid transparent`,
      borderTop: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (arrowPosition === 'top') {
    triangleStyles = {
      top: '0%',
      left: '50%',
      transform: 'translate3d(-50%, -100%, 0)',
      borderLeft: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (arrowPosition === 'right') {
    triangleStyles = {
      top: '50%',
      left: '100%',
      transform: 'translate3d(0%, -50%, 0)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (arrowPosition === 'left') {
    triangleStyles = {
      top: '50%',
      left: '0%',
      transform: 'translate3d(-100%, -50%, 0)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (arrowPosition === 'topRight') {
    triangleStyles = {
      top: '0%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else if (arrowPosition === 'bottomRight') {
    triangleStyles = {
      top: '100%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else if (arrowPosition === 'topLeft') {
    triangleStyles = {
      top: '0%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else if (arrowPosition === 'bottomLeft') {
    triangleStyles = {
      top: '100%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else {
    triangleStyles = {
      opacity: 0,
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        fontSize: '10px',
        padding: '5px',
        background: getBackgroundColor(dark),
        color: dark ? 'black' : 'white',
        borderRadius: '3px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          ...triangleStyles,
        }}
      />
      <div>
        <div
          style={{
            marginBottom: '3px',
            textAlign: 'center',
          }}
        >
          {tooltip.groupingMode === 'series' ? (
            <strong>{focusedDatum.seriesLabel}</strong>
          ) : tooltip.groupingMode === 'secondary' ? (
            <strong>
              {(secondaryAxis as AxisTime<any>).formatters.tooltip(
                focusedDatum.secondaryValue
              )}
            </strong>
          ) : (
            <strong>
              {(primaryAxis as AxisTime<any>).formatters.tooltip(
                focusedDatum.primaryValue
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

              const datumSecondaryAxis = secondaryAxes.find(
                d => d.id === sortedDatum.secondaryAxisId
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
                    }}
                  >
                    <svg width="14" height="14">
                      <circle
                        cx="7"
                        cy="7"
                        r="5"
                        style={{
                          ...getDatumStyle(sortedDatum),
                          stroke: dark ? 'black' : 'white',
                          strokeWidth: active ? 2 : 1,
                        }}
                      />
                    </svg>
                  </td>
                  {tooltip.groupingMode === 'series' ? (
                    <React.Fragment>
                      <td>
                        {(primaryAxis as AxisTime<any>).formatters.tooltip(
                          sortedDatum.primaryValue
                        )}
                        : &nbsp;
                      </td>
                      <td
                        style={{
                          textAlign: 'right',
                        }}
                      >
                        {(
                          datumSecondaryAxis as AxisTime<any>
                        ).formatters.tooltip(sortedDatum.secondaryValue)}
                      </td>
                    </React.Fragment>
                  ) : tooltip.groupingMode === 'secondary' ? (
                    <React.Fragment>
                      <td>{sortedDatum.seriesLabel}: &nbsp;</td>
                      <td
                        style={{
                          textAlign: 'right',
                        }}
                      >
                        {(primaryAxis as AxisTime<any>).formatters.tooltip(
                          sortedDatum.primaryValue
                        )}
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
                        {(
                          datumSecondaryAxis as AxisTime<any>
                        ).formatters.tooltip(sortedDatum.secondaryValue)}
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
            {(focusedDatum.tooltipGroup ?? []).length > 1
              ? props.secondaryAxes
                  .filter(d => d.stacked)
                  .map((secondaryAxis, i) => {
                    return (
                      <tr key={`${secondaryAxis.id}_${i}`}>
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
                          {props.secondaryAxes.length > 1
                            ? secondaryAxis.id ?? `Axis ${i + 1} `
                            : ''}
                          Total: &nbsp;
                        </td>
                        <td
                          style={{
                            paddingTop: '5px',
                          }}
                        >
                          {/* {secondaryAxis.format(
                  [...focusedDatum.group].reverse()[0].totalValue,
                  -1
                )} */}
                          {(secondaryAxis as AxisLinear<any>).formatters.scale(
                            sum(
                              focusedDatum.tooltipGroup ?? [],
                              d => d.secondaryValue
                            )
                          )}
                        </td>
                      </tr>
                    )
                  })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
