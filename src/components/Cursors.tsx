import React from 'react'
import ReactDOM from 'react-dom'
import * as TSTB from 'ts-toolbelt'

import usePrevious from '../hooks/usePrevious'
import useLatestWhen from '../hooks/useLatestWhen'
import usePortalElement from '../hooks/usePortalElement'
import { AxisTime, CursorOptions, Datum } from '../types'
import { translate } from '../utils/Utils'
//
import useChartContext from '../utils/chartContext'
import useRect from '../hooks/useRect'
import { useSpring } from '../hooks/useSpring'
import useGetLatest from '../hooks/useGetLatest'

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
    svgRef,
    gridDimensions,
    focusedDatumState,
    primaryAxis,
    secondaryAxes,
  } = useChartContext<TDatum>()

  const getTooltipOptions = useGetLatest(props.options)

  const [focusedDatum] = focusedDatumState
  const latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum)

  const secondaryAxis = secondaryAxes.find(
    d => d.id === props.options.axisId || latestFocusedDatum?.secondaryAxisId
  )!

  const axis = props.primary ? primaryAxis : secondaryAxis

  const siblingAxis = props.primary ? secondaryAxis : primaryAxis

  const resolveValue = (d: Datum<TDatum> | null) =>
    d
      ? axis.stacked
        ? d.stackData?.[1]
        : axis.getValue(d?.originalDatum)
      : undefined

  const datumValue = resolveValue(focusedDatum)

  React.useEffect(() => {
    getTooltipOptions()?.onChange?.(datumValue)
  }, [getTooltipOptions, datumValue])

  const value = props.options.value ?? datumValue

  const latestPropsValue = useLatestWhen(
    props.options.value,
    props.options.value != null
  )

  const latestDatumValue = useLatestWhen(
    resolveValue(latestFocusedDatum),
    resolveValue(latestFocusedDatum) != null
  )

  const latestValue = latestPropsValue ?? latestDatumValue

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

  const show = typeof value !== 'undefined' && !Number.isNaN(value)

  let px = axis.scale(value)

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

  let lineStartX = Math.min(x1, x2)
  let lineStartY = Math.min(y1, y2)
  let lineEndX = Math.max(x1, x2)
  let lineEndY = Math.max(y1, y2)
  let lineHeight = Math.max(lineEndY - lineStartY, 0)
  let lineWidth = Math.max(lineEndX - lineStartX, 0)

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

  const svgRect = useRect(svgRef.current, show)

  const lineRef = React.useRef<HTMLDivElement | null>(null)
  const bubbleRef = React.useRef<HTMLDivElement | null>(null)

  const latestLineStartX = useLatestWhen(lineStartX, px != null)
  const latestLineStartY = useLatestWhen(lineStartY, px != null)
  const latestBubbleX = useLatestWhen(bubbleX, px != null)
  const latestBubbleY = useLatestWhen(bubbleY, px != null)

  const previousTruePx = usePrevious(px)
  const immediate = previousTruePx == null && px !== null

  lineStartX = (px != null ? lineStartX : latestLineStartX) ?? NaN
  lineStartY = (px != null ? lineStartY : latestLineStartY) ?? NaN
  bubbleX = (px != null ? bubbleX : latestBubbleX) ?? NaN
  bubbleY = (px != null ? bubbleY : latestBubbleY) ?? NaN

  const lineXSpring = useSpring(
    lineStartX,
    [1, 210, 20],
    () => {
      if (lineRef.current) {
        lineRef.current.style.transform = `translate(${lineXSpring.x()}px, ${lineYSpring.x()}px)`
      }
    },
    immediate
  )

  const lineYSpring = useSpring(
    lineStartY,
    [1, 210, 20],
    () => {
      if (lineRef.current) {
        lineRef.current.style.transform = `translate(${lineXSpring.x()}px, ${lineYSpring.x()}px)`
      }
    },
    immediate
  )

  const bubbleXSpring = useSpring(
    bubbleX,
    [1, 210, 20],
    () => {
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${bubbleXSpring.x()}px, ${bubbleYSpring.x()}px)`
      }
    },
    immediate
  )

  const bubbleYSpring = useSpring(
    bubbleY,
    [1, 210, 20],
    () => {
      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${bubbleXSpring.x()}px, ${bubbleYSpring.x()}px)`
      }
    },
    immediate
  )

  const portalEl = usePortalElement()

  return portalEl
    ? ReactDOM.createPortal(
        <div
          style={{
            fontFamily: 'sans-serif',
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            transform: translate(
              svgRect.left + gridDimensions.gridX,
              svgRect.top + gridDimensions.gridY
            ),
            opacity: show ? 1 : 0,
            transition: 'opacity .3s ease',
          }}
          className="Cursor"
        >
          {/* Render the cursor line */}
          {props.options.showLine ? (
            <div
              ref={lineRef}
              style={{
                width: `${lineWidth}px`,
                height: `${lineHeight}px`,
                position: 'absolute',
                top: 0,
                left: 0,
                background: getLineBackgroundColor(getOptions().dark),
              }}
            />
          ) : null}
          {/* Render the cursor bubble */}
          {props.options.showLabel ? (
            <div
              ref={bubbleRef}
              style={{
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
            </div>
          ) : null}
        </div>,
        portalEl
      )
    : null
}
