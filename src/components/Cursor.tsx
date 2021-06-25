import { ScaleLinear } from 'd3-scale'
import { useAtom } from 'jotai'
import React from 'react'
import * as TSTB from 'ts-toolbelt'

import { focusedDatumAtom, pointerAtom } from '../atoms'
import useLatestWhen from '../hooks/useLatestWhen'
import { CursorOptions } from '../types'
//
import { getAxisByAxisId, translate } from '../utils/Utils'
import useChartContext from './Chart'

type ResolvedCursorOptions = TSTB.Object.Required<
  CursorOptions,
  'show' | 'render' | 'snap' | 'showLine' | 'showLabel'
>

//

const getLineBackgroundColor = (dark?: boolean) =>
  dark ? 'rgba(255,255,255,.3)' : 'rgba(0, 26, 39, 0.3)'

const getBackgroundColor = (dark?: boolean) =>
  dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)'

function defaultCursor(options: CursorOptions): ResolvedCursorOptions {
  return {
    ...options,
    show: options.show ?? true,
    render:
      options.render ?? (({ formattedValue }) => <span>{formattedValue}</span>),
    snap: options.snap ?? true,
    showLine: options.showLine ?? true,
    showLabel: options.showLabel ?? true,
  }
}

export default function Cursor(props: { isPrimary?: boolean }) {
  const [pointer] = useAtom(pointerAtom)
  const [focusedDatum] = useAtom(focusedDatumAtom)

  const { getOptions, axesInfo, gridDimensions } = useChartContext()

  const preCursorOptions = props.isPrimary
    ? getOptions().primaryCursor
    : getOptions().secondaryCursor

  const cursorOptions = React.useMemo(
    () =>
      defaultCursor(
        !preCursorOptions
          ? { show: false }
          : typeof preCursorOptions === 'boolean'
          ? {}
          : preCursorOptions
      ),
    [preCursorOptions]
  )

  const cursorInfo = React.useMemo(() => {
    // if (!cursorOptions) {
    //   return
    // }

    let value
    let show = false

    // Determine the axis to use
    const axis = getAxisByAxisId(
      props.isPrimary ? axesInfo.primaryAxes : axesInfo.secondaryAxes,
      cursorOptions.axisId ||
        focusedDatum?.series[
          props.isPrimary ? 'primaryAxisId' : 'secondaryAxisId'
        ]
    )

    const siblingAxis = props.isPrimary
      ? axesInfo.secondaryAxes[0]
      : axesInfo.primaryAxes[0]

    // Resolve the invert function
    const invert = (axis.scale as ScaleLinear<number, number>)?.invert

    // If the pointer is active, try to show
    if (pointer.svgHovered) {
      // Default to cursor x and y
      let x = pointer.x
      let y = pointer.y
      // If the cursor isn't in the grid, don't display
      if (
        x < -1 ||
        x > gridDimensions.gridWidth + 1 ||
        y < -1 ||
        y > gridDimensions.gridHeight + 1
      ) {
        show = false
      } else {
        show = true
      }

      // Implement snapping
      if (axis.type === 'ordinal' || cursorOptions.snap) {
        if (!focusedDatum) {
          show = false
        } else {
          if (axis.isVertical) {
            value = focusedDatum.yValue
          } else {
            value = focusedDatum.xValue
          }
        }
      } else if (axis.isVertical) {
        value = invert(y)
      } else {
        value = invert(x)
      }
    } else {
      show = false
    }

    let resolvedShow = show
    let resolvedValue = value

    if (
      typeof cursorOptions.value !== 'undefined' &&
      cursorOptions.value !== null
    ) {
      resolvedValue = cursorOptions.value

      if (typeof cursorOptions.show !== 'undefined') {
        resolvedShow = cursorOptions.show
      } else {
        resolvedShow = true
      }

      if (typeof axis.scale(resolvedValue as any) === 'undefined') {
        resolvedShow = false
      }
    }

    return {
      axis,
      siblingAxis,
      show,
      value,
      resolvedShow,
      resolvedValue,
    }
  }, [
    axesInfo.primaryAxes,
    axesInfo.secondaryAxes,
    cursorOptions.axisId,
    cursorOptions.show,
    cursorOptions.snap,
    cursorOptions.value,
    focusedDatum,
    gridDimensions.gridHeight,
    gridDimensions.gridWidth,
    pointer.svgHovered,
    pointer.x,
    pointer.y,
    props.isPrimary,
  ])

  const latestFocused = useLatestWhen(focusedDatum, !!focusedDatum)

  const resolvedFocused = focusedDatum || latestFocused

  const latestValue = useLatestWhen(
    cursorInfo.value,
    typeof cursorInfo.value !== 'undefined'
  )

  const previousShowRef = React.useRef<boolean>(false)
  React.useEffect(() => {
    previousShowRef.current = cursorInfo.show
  }, [cursorInfo.show])

  if (!cursorInfo) {
    return null
  }

  // Should we animate?
  const animated = cursorOptions.snap || cursorInfo.axis.type === 'ordinal'

  // Get the sibling range
  const siblingRange = cursorInfo.siblingAxis.scale.range()

  let x
  let y
  let x1
  let x2
  let y1
  let y2
  let alignPctX
  let alignPctY

  // Vertical alignment
  if (cursorInfo.axis.isVertical) {
    y = cursorInfo.axis.scale(latestValue as any)
    y1 = (y ?? 0) - 1
    y2 = (y ?? 0) + cursorInfo.axis.cursorSize + 1
    if (cursorInfo.axis.position === 'left') {
      x1 = siblingRange[0]
      x2 = siblingRange[1]
    } else {
      x1 = siblingRange[1]
      x2 = siblingRange[0]
    }
  } else {
    x = cursorInfo.axis.scale(latestValue as any)
    x1 = (x ?? 0) - 1
    x2 = (x ?? 0) + cursorInfo.axis.cursorSize + 1
    if (cursorInfo.axis.position === 'top') {
      y1 = siblingRange[0]
      y2 = siblingRange[1]
    } else {
      y1 = siblingRange[1]
      y2 = siblingRange[0]
    }
  }

  const lineStartX = Math.min(x1, x2)
  const lineStartY = Math.min(y1, y2)
  const lineEndX = Math.max(x1, x2)
  const lineEndY = Math.max(y1, y2)
  const lineHeight = Math.max(lineEndY - lineStartY, 0)
  const lineWidth = Math.max(lineEndX - lineStartX, 0)

  let bubbleX
  let bubbleY

  // Bubble placement
  if (cursorInfo.axis.isVertical) {
    if (cursorInfo.axis.position === 'left') {
      bubbleX = lineStartX
    } else {
      bubbleX = lineEndX
    }

    bubbleY = lineStartY + lineHeight / 2
  } else {
    if (cursorInfo.axis.position === 'top') {
      bubbleY = lineStartY
    } else {
      bubbleY = lineEndY
    }

    bubbleX = lineStartX + lineWidth / 2
  }

  // Bubble anchoring
  if (cursorInfo.axis.isVertical) {
    alignPctY = -50
    if (cursorInfo.axis.position === 'left') {
      alignPctX = -100
    } else {
      alignPctX = 0
    }
  } else {
    alignPctX = -50
    if (cursorInfo.axis.position === 'top') {
      alignPctY = -100
    } else {
      alignPctY = 0
    }
  }

  const renderProps = {
    cursorOptions,
    cursorInfo,
    formattedValue: String(
      cursorInfo.axis.isVertical
        ? typeof latestValue !== 'undefined'
          ? cursorInfo.axis.format(
              cursorInfo.axis.stacked && !props.isPrimary && resolvedFocused
                ? resolvedFocused.totalValue
                : latestValue,
              -1
            )
          : ''
        : typeof latestValue !== 'undefined'
        ? cursorInfo.axis.format(
            cursorInfo.axis.stacked && !props.isPrimary && resolvedFocused
              ? resolvedFocused.totalValue
              : latestValue,
            -1
          )
        : ''
    ),
  }

  // if (!axis.isVertical) {
  // console.log({ bubbleX, bubbleY });
  // }

  let animateCoords
  if (previousShowRef.current === cursorInfo.resolvedShow) {
    animateCoords = true
  }

  let renderedChildren = cursorOptions.render(renderProps)

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: translate(gridDimensions.gridX, gridDimensions.gridY),
        opacity: cursorInfo.resolvedShow ? 1 : 0,
        transition: 'all .3s ease',
      }}
      className="Cursor"
    >
      {/* Render the cursor line */}
      {cursorOptions.showLine ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: translate(lineStartX, lineStartY),
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            background: getLineBackgroundColor(getOptions().dark),
            transition:
              animated && animateCoords ? 'all .2s ease' : 'opacity .2s ease',
          }}
        />
      ) : null}
      {/* Render the cursor bubble */}
      {cursorOptions.showLabel ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: translate(bubbleX, bubbleY),
            transition:
              animated && animateCoords ? 'all .2s ease' : 'opacity .2s ease',
          }}
        >
          {/* Render the cursor label */}
          <div
            style={{
              padding: '5px',
              fontSize: '10px',
              background: getBackgroundColor(getOptions().dark),
              color: getBackgroundColor(!getOptions().dark),
              borderRadius: '3px',
              position: 'relative',
              transform: `translate3d(${alignPctX}%, ${alignPctY}%, 0)`,
              whiteSpace: 'nowrap',
            }}
          >
            {renderedChildren}
          </div>
        </div>
      ) : null}
    </div>
  )
}
