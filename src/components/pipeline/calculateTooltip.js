import PropTypes from 'prop-types'
import { useMemo } from 'use-react-hooks'

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
  anchorPointer,
  anchorClosest,
  anchorCenter,
  anchorTop,
  anchorBottom,
  anchorLeft,
  anchorRight,
  anchorGridTop,
  anchorGridBottom,
  anchorGridLeft,
  anchorGridRight
} from '../../utils/Constants'

const alignPropType = PropTypes.oneOf([
  alignAuto,
  alignRight,
  alignTopRight,
  alignBottomRight,
  alignLeft,
  alignTopLeft,
  alignBottomLeft,
  alignTop,
  alignBottom
])

export const tooltipShape = PropTypes.oneOfType([
  PropTypes.oneOf([true]),
  PropTypes.shape({
    align: alignPropType,
    alignPriority: PropTypes.arrayOf(alignPropType),
    padding: PropTypes.number,
    tooltipArrowPadding: PropTypes.number,
    anchor: PropTypes.oneOf([
      anchorPointer,
      anchorClosest,
      anchorCenter,
      anchorTop,
      anchorBottom,
      anchorLeft,
      anchorRight,
      anchorGridTop,
      anchorGridBottom,
      anchorGridLeft,
      anchorGridRight
    ]),
    render: PropTypes.func.required,
    onChange: PropTypes.func
  })
])

export default ({ focused, tooltip, pointer, gridWidth, gridHeight }) => {
  if (!tooltip) {
    return null
  }
  // Default tooltip props
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
      alignBottom
    ],
    padding: 5,
    tooltipArrowPadding: 7,
    anchor: 'closest',
    render: TooltipRenderer,
    onChange: () => {},
    ...tooltip
  }
  return useMemo(
    () => {
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
        anchor = Utils.getMultiAnchor({
          anchor: multiFocus,
          points: focused.group,
          gridWidth,
          gridHeight
        })
      }

      anchor = anchor
        ? {
          horizontalPadding: anchor.horizontalPadding || 0,
          verticalPadding: anchor.verticalPadding || 0,
          ...anchor
        }
        : anchor

      return {
        ...tooltip,
        anchor,
        show
      }
    },
    [pointer, tooltip]
  )
}
