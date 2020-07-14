import React from 'react'
//
import Utils from '../../utils/Utils'

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
    } else if (tooltip.anchor === 'absoluteTop') {
      anchor = pointer
      anchor.y = 0
    } else if (tooltip.anchor === 'closest') {
      // Do nothing, this is already calculated
    } else if (focused) {
      // Support manual definition of focus point using relative multiFocus strategy
      const multiFocus = Array.isArray(tooltip.anchor)
        ? [...tooltip.anchor]
        : [tooltip.anchor]
      anchor = Utils.getMultiAnchor({
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
