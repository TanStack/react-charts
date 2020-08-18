import React from 'react'

import { getAxisByAxisId } from '../../utils/Utils'

const defaultCursorProps = {
  render: ({ formattedValue }) => <span>{formattedValue}</span>,
  snap: true,
  showLine: true,
  showLabel: true,
  axisId: undefined,
  onChange: () => {},
}

export default ({
  primaryCursor,
  secondaryCursor,
  primaryAxes,
  secondaryAxes,
  focused,
  pointer,
  gridWidth,
  gridHeight,
  stackData,
}) => {
  return [primaryCursor, secondaryCursor].map((cursor, i) => {
    const cursorValue = cursor && cursor.value

    return React.useMemo(() => {
      if (!cursor) {
        return
      }
      const primary = i === 0
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cursor = {
        ...defaultCursorProps,
        ...cursor,
        primary,
      }

      let value
      let show = false

      // Determine the axis to use
      const axis = getAxisByAxisId(
        primary ? primaryAxes : secondaryAxes,
        cursor.axisId || focused
          ? focused.series[primary ? 'primaryAxisId' : 'secondaryAxisId']
          : undefined
      )

      const siblingAxis = primary ? secondaryAxes[0] : primaryAxes[0]

      // Resolve the invert function
      const invert = axis.scale.invert || (d => d)

      // If the pointer is active, try to show
      if (pointer.active) {
        // Default to cursor x and y
        let x = pointer.x
        let y = pointer.y
        // If the cursor isn't in the grid, don't display
        if (x < -1 || x > gridWidth + 1 || y < -1 || y > gridHeight + 1) {
          show = false
        } else {
          show = true
        }

        // Implement snapping
        if (axis.type === 'ordinal' || cursor.snap) {
          if (!focused) {
            show = false
          } else {
            if (axis.vertical) {
              value = focused.yValue
            } else {
              value = focused.xValue
            }
          }
        } else if (axis.vertical) {
          value = invert(y)
        } else {
          value = invert(x)
        }
      } else {
        show = false
      }

      let resolvedShow = show
      let resolvedValue = value

      if (typeof cursor.value !== 'undefined' && cursor.value !== null) {
        resolvedValue = cursor.value

        if (typeof cursor.show !== 'undefined') {
          resolvedShow = cursor.show
        } else {
          resolvedShow = true
        }

        if (typeof axis.scale(resolvedValue) === 'undefined') {
          resolvedShow = false
        }
      }

      return {
        ...cursor,
        axis,
        siblingAxis,
        show,
        value,
        resolvedShow,
        resolvedValue,
      }
    }, [stackData, pointer, cursorValue])
  })
}
