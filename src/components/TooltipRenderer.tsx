import { sum } from 'd3-array'
import React, { CSSProperties } from 'react'

import { useAnchor } from '../hooks/useAnchor'
import { Axis, AxisTime, Datum, RequiredChartOptions } from '../types'

//
//

const showCount = 10

const triangleSize = 7

const getBackgroundColor = (dark?: boolean) =>
  dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)'

export type TooltipRendererProps<TDatum> = {
  focusedDatum: Datum<TDatum> | null
  getOptions: () => RequiredChartOptions<TDatum>
  primaryAxis: Axis<TDatum>
  secondaryAxis: Axis<TDatum>
  getDatumStyle: (datum: Datum<TDatum>) => CSSProperties
  anchorFit: ReturnType<typeof useAnchor>
}

export default function TooltipRenderer<TDatum>(
  props: TooltipRendererProps<TDatum>
) {
  if (!props.focusedDatum) {
    return null
  }

  const { primaryAxis, secondaryAxis, getDatumStyle, focusedDatum } = props

  const { groupingMode, dark } = props.getOptions()

  const groupDatums = props.focusedDatum?.group ?? []

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

  const finalAlign = `${props.anchorFit.fit?.side}-${props.anchorFit.fit?.align}`

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
          {groupingMode === 'series' ? (
            <strong>{focusedDatum.seriesLabel}</strong>
          ) : groupingMode === 'secondary' ? (
            <strong>
              {(secondaryAxis as AxisTime<any>).formatters.tooltip(
                secondaryAxis.getValue(focusedDatum.originalDatum)
              )}
            </strong>
          ) : (
            <strong>
              {(primaryAxis as AxisTime<any>).formatters.tooltip(
                primaryAxis.getValue(focusedDatum.originalDatum)
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
                  {groupingMode === 'series' ? (
                    <React.Fragment>
                      <td>
                        {(primaryAxis as AxisTime<any>).formatters.tooltip(
                          primaryAxis.getValue(sortedDatum.originalDatum)
                        )}
                        : &nbsp;
                      </td>
                      <td
                        style={{
                          textAlign: 'right',
                        }}
                      >
                        {(secondaryAxis as AxisTime<any>).formatters.tooltip(
                          secondaryAxis.getValue(sortedDatum.originalDatum)
                        )}
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
                        {(primaryAxis as AxisTime<any>).formatters.tooltip(
                          primaryAxis.getValue(sortedDatum.originalDatum)
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
                        {(secondaryAxis as AxisTime<any>).formatters.tooltip(
                          secondaryAxis.getValue(sortedDatum.originalDatum)
                        )}
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
            {secondaryAxis.stacked && (focusedDatum.group ?? []).length > 1 ? (
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
                  {/* {secondaryAxis.format(
                  [...focusedDatum.group].reverse()[0].totalValue,
                  -1
                )} */}
                  {sum(focusedDatum.group ?? [], d =>
                    secondaryAxis.getValue(d.originalDatum)
                  )}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}
