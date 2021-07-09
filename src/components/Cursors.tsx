import React from 'react'
import ReactDOM from 'react-dom'
import * as TSTB from 'ts-toolbelt'

import { animated, config, useSpring } from '@react-spring/web'

// import useIsScrolling from '../hooks/useIsScrolling'
import useLatestWhen from '../hooks/useLatestWhen'
import usePortalElement from '../hooks/usePortalElement'
import { AxisTime, CursorOptions, Datum } from '../types'
import { translate } from '../utils/Utils'
//
import useChartContext from '../utils/chartContext'

type ResolvedCursorOptions = TSTB.Object.Required<
  CursorOptions,
  'show' | 'showLine' | 'showLabel'
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
    showLine: options.showLine ?? true,
    showLabel: options.showLabel ?? true,
  }
}

export default function Cursors<TDatum>() {
  const { getOptions } = useChartContext<TDatum>()

  let primaryOptions = getOptions().primaryCursor ?? true
  let secondaryOptions = getOptions().secondaryCursor ?? true

  const resolvedPrimaryOptions = React.useMemo(
    () =>
      defaultCursor(
        !primaryOptions
          ? { show: false }
          : typeof primaryOptions === 'boolean'
          ? {}
          : primaryOptions
      ),
    [primaryOptions]
  )

  const resolvedSecondaryOptions = React.useMemo(
    () =>
      defaultCursor(
        !secondaryOptions
          ? { show: false }
          : typeof secondaryOptions === 'boolean'
          ? {}
          : secondaryOptions
      ),
    [secondaryOptions]
  )

  return (
    <>
      <Cursor primary options={resolvedPrimaryOptions} />
      <Cursor options={resolvedSecondaryOptions} />
    </>
  )
}

function Cursor<TDatum>(props: {
  primary?: boolean
  options: ResolvedCursorOptions
}) {
  const {
    getOptions,
    svgRect,
    gridDimensions,
    useFocusedDatumAtom,
    primaryAxis,
    secondaryAxes,
  } = useChartContext<TDatum>()

  const [focusedDatum] = useFocusedDatumAtom()
  const latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum)

  const secondaryAxis = secondaryAxes.find(
    d => d.id === props.options.axisId || latestFocusedDatum?.secondaryAxisId
  )!

  const axis = props.primary ? primaryAxis : secondaryAxis

  const siblingAxis = props.primary ? secondaryAxis : primaryAxis

  const resolveValue = (d: Datum<TDatum> | null) =>
    props.options.value ??
    (d
      ? axis.stacked
        ? d.stackData?.[1]
        : axis.getValue(d?.originalDatum)
      : undefined)

  const value = resolveValue(focusedDatum)
  const latestValue = resolveValue(latestFocusedDatum)

  // Get the sibling range
  const siblingRange = siblingAxis.scale.range()

  let x
  let y
  let x1
  let x2
  let y1
  let y2
  let alignPctX
  let alignPctY

  const bandWidth = axis.axisFamily === 'band' ? axis.scale.bandwidth() : 1

  const px = axis.scale(latestValue)

  const show = typeof value !== 'undefined' && !Number.isNaN(value)

  // Vertical alignment
  if (axis.isVertical) {
    y = px
    y1 = (y ?? 0) - 1
    y2 = (y ?? 0) + bandWidth
    if (axis.position === 'left') {
      x1 = siblingRange[0]
      x2 = siblingRange[1]
    } else {
      x1 = siblingRange[1]
      x2 = siblingRange[0]
    }
  } else {
    x = px
    x1 = (x ?? 0) - 1
    x2 = (x ?? 0) + bandWidth
    if (axis.position === 'top') {
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
  if (axis.isVertical) {
    if (axis.position === 'left') {
      bubbleX = lineStartX
    } else {
      bubbleX = lineEndX
    }

    bubbleY = lineStartY + lineHeight / 2
  } else {
    if (axis.position === 'top') {
      bubbleY = lineStartY
    } else {
      bubbleY = lineEndY
    }

    bubbleX = lineStartX + lineWidth / 2
  }

  // Bubble anchoring
  if (axis.isVertical) {
    alignPctY = -50
    if (axis.position === 'left') {
      alignPctX = -100
    } else {
      alignPctX = 0
    }
  } else {
    alignPctX = -50
    if (axis.position === 'top') {
      alignPctY = -100
    } else {
      alignPctY = 0
    }
  }

  const formattedValue = (axis as AxisTime<any>).formatters.cursor(latestValue)

  // const isScrolling = useIsScrolling(200)

  const lineSpring = useSpring({
    transform: translate(lineStartX, lineStartY),
    width: `${lineWidth}px`,
    height: `${lineHeight}px`,
    config: config.stiff,
    // immediate: isScrolling,
  })

  const bubbleSpring = useSpring({
    transform: translate(bubbleX, bubbleY),
    config: config.stiff,
    // immediate: isScrolling,
  })

  const portalEl = usePortalElement()

  return portalEl
    ? ReactDOM.createPortal(
        <div
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: translate(
              svgRect.left + gridDimensions.gridX,
              svgRect.top + gridDimensions.gridY
            ),
            opacity: show ? 1 : 0,
            transition: 'all .3s ease',
          }}
          className="Cursor"
        >
          {/* Render the cursor line */}
          {props.options.showLine ? (
            <animated.div
              style={{
                ...lineSpring,
                position: 'absolute',
                top: 0,
                left: 0,
                background: getLineBackgroundColor(getOptions().dark),
              }}
            />
          ) : null}
          {/* Render the cursor bubble */}
          {props.options.showLabel ? (
            <animated.div
              style={{
                ...bubbleSpring,
                position: 'absolute',
                top: 0,
                left: 0,
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
                {formattedValue}
              </div>
            </animated.div>
          ) : null}
        </div>,
        portalEl
      )
    : null
}
