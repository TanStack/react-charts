import React from 'react'
import withHooks, { useContext, useRef, useEffect } from '../utils/hooks'
//
import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'

const getLineBackgroundColor = dark =>
  dark ? 'rgba(255,255,255,.3)' : 'rgba(0, 26, 39, 0.3)'
const getBackgroundColor = dark =>
  dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)'

function Cursor({ primary }) {
  const [
    { primaryCursor, secondaryCursor, focused, lastFocused, gridX, gridY, dark }
  ] = useContext(ChartContext)

  const cursor = primary ? primaryCursor : secondaryCursor

  if (!cursor) {
    return null
  }

  const {
    showLine,
    showLabel,
    resolvedValue,
    snap,
    render,
    axis,
    siblingAxis,
    resolvedShow
  } = cursor

  const resolvedFocused = focused || lastFocused
  const lastValue = Utils.useWhen(
    resolvedValue,
    typeof resolvedValue !== 'undefined'
  )

  // Should we animate?
  const animated = snap || axis.type === 'ordinal'

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

  // Vertical alignment
  if (axis.vertical) {
    y = axis.scale(lastValue)
    x1 = siblingRange[0]
    x2 = siblingRange[1]
    y1 = y - 1
    y2 = y + axis.cursorSize + 1
    if (axis.position === 'left') {
      alignPctX = -100
      alignPctY = -50
    } else {
      alignPctX = 0
      alignPctY = -50
    }
  } else {
    x = axis.scale(lastValue)
    x1 = x - 1
    x2 = x + axis.cursorSize + 1
    y1 = siblingRange[0]
    y2 = siblingRange[1]
    if (axis.position === 'top') {
      alignPctX = -500
      alignPctY = -100
    } else {
      alignPctX = -50
      alignPctY = 0
    }
  }

  const renderProps = { ...cursor }

  renderProps.formattedValue = axis.vertical
    ? typeof lastValue !== 'undefined'
      ? axis.format(
        axis.stacked && !primary && resolvedFocused
          ? resolvedFocused.totalValue
          : lastValue
      )
      : ''
    : typeof lastValue !== 'undefined'
      ? axis.format(
        axis.stacked && !primary && resolvedFocused
          ? resolvedFocused.totalValue
          : lastValue
      )
      : ''

  const lineStartX = Math.min(x1, x2)
  const lineStartY = Math.min(y1, y2)
  const lineEndX = Math.max(x1, x2)
  const lineEndY = Math.max(y1, y2)
  const bubbleX =
    axis.vertical && axis.RTL
      ? lineEndX
      : x1 + (!axis.vertical ? (x2 - x1) / 2 : 0) + (!axis.vertical ? 1 : 0)
  const bubbleY =
    !axis.vertical && axis.RTL
      ? lineStartY
      : y1 + (axis.vertical ? (y2 - y1) / 2 : 0) + (axis.vertical ? 1 : 0)

  const lineHeight = Math.max(lineEndY - lineStartY, 0)
  const lineWidth = Math.max(lineEndX - lineStartX, 0)

  const previousShowRef = useRef()
  useEffect(() => {
    previousShowRef.current = resolvedShow
  })

  let animateCoords
  if (previousShowRef.current === resolvedShow) {
    animateCoords = true
  }

  let renderedChildren = render(renderProps)

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate3d(${gridX}px, ${gridY}px, 0)`,
        opacity: resolvedShow ? 1 : 0,
        transition: 'all .3s ease'
      }}
      className='Cursor'
    >
      {/* Render the cursor line */}
      {showLine ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translate3d(${lineStartX}px, ${lineStartY}px, 0px)`,
            width: `${lineWidth}px`,
            height: `${lineHeight}px`,
            background: getLineBackgroundColor(dark),
            WebkitBackfaceVisibility: 'hidden',
            transition:
              animated && animateCoords ? 'all .2s ease' : 'opacity .2s ease'
          }}
        />
      ) : null}
      {/* Render the cursor bubble */}
      {showLabel ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translate3d(${bubbleX}px, ${bubbleY}px, 0px)`,
            transition:
              animated && animateCoords ? 'all .2s ease' : 'opacity .2s ease'
          }}
        >
          {/* Render the cursor label */}
          <div
            style={{
              padding: '5px',
              fontSize: '10px',
              background: getBackgroundColor(dark),
              color: dark ? 'black' : 'white',
              borderRadius: '3px',
              position: 'relative',
              transform: `translate3d(${alignPctX}%, ${alignPctY}%, 0px)`,
              whiteSpace: 'nowrap'
            }}
          >
            {renderedChildren}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default withHooks(Cursor)
