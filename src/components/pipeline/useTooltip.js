import React from 'react'
import TooltipRenderer from '../TooltipRenderer'

import {
  alignAuto,
  alignRight,
  alignTopRight,
  alignBottomRight,
  alignLeft,
  alignTopLeft,
  alignBottomLeft,
  alignTop,
  alignBottom,
} from '../../utils/Constants'

export default ({ focused, tooltip, pointer, gridWidth, gridHeight }) => {
  return React.useMemo(() => {
    if (!tooltip) {
      return null
    }
    // Default tooltip props
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tooltip = {
      align: alignAuto,
      alignPriority: [
        alignRight,
        alignTopRight,
        alignBottomRight,
        alignLeft,
        alignTopLeft,
        alignBottomLeft,
        alignTop,
        alignBottom,
      ],
      padding: 5,
      tooltipArrowPadding: 7,
      anchor: 'closest',
      render: TooltipRenderer,
      onChange: () => {},
      ...tooltip,
    }
    let anchor = {}
    let show = true

    // If there is a focused datum, default the focus to its x and y
    if (focused) {
      anchor = focused.anchor
    } else {
      show = false
    }

    if (tooltip.anchor === 'pointer') {
      // Support pointer-bound focus
      anchor = pointer
    } else if (tooltip.anchor === 'closest') {
      // Do nothing, this is already calculated
    } else if (focused) {
      // Support manual definition of focus point using relative multiFocus strategy
      const multiFocus = Array.isArray(tooltip.anchor)
        ? [...tooltip.anchor]
        : [tooltip.anchor]
      anchor = getMultiAnchor({
        anchor: multiFocus,
        points: focused.group,
        gridWidth,
        gridHeight,
      })
    }

    anchor = anchor
      ? {
          horizontalPadding: anchor.horizontalPadding || 0,
          verticalPadding: anchor.verticalPadding || 0,
          ...anchor,
        }
      : anchor

    return {
      ...tooltip,
      anchor,
      show,
    }
  }, [focused, gridHeight, gridWidth, pointer, tooltip])
}

function getMultiAnchor({ anchor, points, gridWidth, gridHeight }) {
  const invalid = () => {
    throw new Error(
      `${JSON.stringify(
        anchor
      )} is not a valid tooltip anchor option. You should use a single anchor option or 2 non-conflicting anchor options.`
    )
  }

  let x
  let y

  let xMin = points[0].anchor.x
  let xMax = points[0].anchor.x
  let yMin = points[0].anchor.y
  let yMax = points[0].anchor.y

  points.forEach(point => {
    xMin = Math.min(point.anchor.x, xMin)
    xMax = Math.max(point.anchor.x, xMax)
    yMin = Math.min(point.anchor.y, yMin)
    yMax = Math.max(point.anchor.y, yMax)
  })

  if (anchor.length > 2) {
    return invalid()
  }

  anchor = anchor.sort(a =>
    a.includes('center') || a.includes('Center') ? 1 : -1
  )

  for (let i = 0; i < anchor.length; i++) {
    const anchorPart = anchor[i]

    // Horizontal Positioning
    if (['left', 'right', 'gridLeft', 'gridRight'].includes(anchorPart)) {
      if (typeof x !== 'undefined') {
        invalid()
      }
      if (anchorPart === 'left') {
        x = xMin
      } else if (anchorPart === 'right') {
        x = xMax
      } else if (anchorPart === 'gridLeft') {
        x = 0
      } else if (anchorPart === 'gridRight') {
        x = gridWidth
      } else {
        invalid()
      }
    }

    // Vertical Positioning
    if (['top', 'bottom', 'gridTop', 'gridBottom'].includes(anchorPart)) {
      if (typeof y !== 'undefined') {
        invalid()
      }
      if (anchorPart === 'top') {
        y = yMin
      } else if (anchorPart === 'bottom') {
        y = yMax
      } else if (anchorPart === 'gridTop') {
        y = 0
      } else if (anchorPart === 'gridBottom') {
        y = gridHeight
      } else {
        invalid()
      }
    }

    // Center Positioning
    if (['center', 'gridCenter'].includes(anchorPart)) {
      if (anchorPart === 'center') {
        if (typeof y === 'undefined') {
          y = (yMin + yMax) / 2
        }
        if (typeof x === 'undefined') {
          x = (xMin + xMax) / 2
        }
      } else if (anchorPart === 'gridCenter') {
        if (typeof y === 'undefined') {
          y = gridHeight / 2
        }
        if (typeof x === 'undefined') {
          x = gridWidth / 2
        }
      } else {
        invalid()
      }
    }

    // Auto center the remainder if there is only one anchorPart listed
    if (anchor.length === 1) {
      if (anchor[0].includes('grid')) {
        anchor.push('gridCenter')
      } else {
        anchor.push('center')
      }
    }
  }

  return { x, y }
}
