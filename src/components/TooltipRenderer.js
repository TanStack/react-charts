import React from 'react'
//
//

const showCount = 10

export default function TooltipRenderer(props) {
  const {
    datum,
    primaryAxis,
    secondaryAxis,
    formatSecondary,
    formatTertiary,
    getStyle,
    dark
  } = props

  if (!datum) {
    return null
  }

  const resolvedFormatSecondary =
    formatSecondary ||
    (val =>
      Math.floor(val) < val
        ? secondaryAxis.format(Math.round(val * 100) / 100)
        : secondaryAxis.format(val))

  const resolvedFormatTertiary =
    formatTertiary ||
    (val => (Math.floor(val) < val ? Math.round(val * 100) / 100 : val))

  const sortedGroupDatums =
    secondaryAxis && secondaryAxis.stacked
      ? [...datum.group].reverse()
      : [...datum.group]
        .sort((a, b) => {
          if (a.secondary < b.secondary) {
            return -1
          } else if (a.secondary > b.secondary) {
            return 1
          }
          return a.seriesIndex < b.seriesIndex ? 1 : -1
        })
        .reverse()

  if (secondaryAxis.invert) {
    sortedGroupDatums.reverse()
  }

  const resolvedShowCount = showCount % 2 === 0 ? showCount : showCount + 1
  const length = sortedGroupDatums.length

  // Get the hovered series' index
  const activeIndex = sortedGroupDatums.findIndex(d => d === datum)
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
          textAlign: 'center'
        }}
      >
        <strong>{primaryAxis.format(datum.primary)}</strong>
      </div>
      <table
        style={{
          whiteSpace: 'nowrap'
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
            const active = sortedDatum === datum
            return (
              <tr
                key={i}
                style={{
                  opacity: active ? 1 : 0.8,
                  fontWeight: active && 'bold'
                }}
              >
                <td
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '5px'
                  }}
                >
                  <svg width='16' height='16'>
                    <circle
                      cx='8'
                      cy='8'
                      style={{
                        ...getStyle(sortedDatum),
                        r: 7,
                        stroke: dark ? 'black' : 'white',
                        strokeWidth: active ? 2 : 1
                      }}
                    />
                  </svg>
                </td>
                <td>{sortedDatum.seriesLabel}: &nbsp;</td>
                <td
                  style={{
                    textAlign: 'right'
                  }}
                >
                  {resolvedFormatSecondary(sortedDatum.secondary)}
                  {sortedDatum.r
                    ? ` (${resolvedFormatTertiary(sortedDatum.r)})`
                    : null}
                </td>
              </tr>
            )
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
                  paddingTop: '5px'
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: dark
                      ? 'rgba(0, 26, 39, 0.3)'
                      : 'rgba(255,255,255,.2)',
                    borderRadius: '50px'
                  }}
                />
              </td>
              <td
                style={{
                  paddingTop: '5px'
                }}
              >
                Total: &nbsp;
              </td>
              <td
                style={{
                  paddingTop: '5px'
                }}
              >
                {resolvedFormatSecondary(
                  [...datum.group].reverse()[0].totalValue
                )}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}
