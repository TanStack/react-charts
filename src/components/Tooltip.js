import React from 'react'
import withHooks, { useContext, useEffect, useRef } from '../utils/hooks'
//
import ChartContext from '../utils/ChartContext'
import Utils from '../utils/Utils'
//

const triangleSize = 7

const getBackgroundColor = dark =>
  dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)'

function Tooltip() {
  const [chartState] = useContext(ChartContext)

  const {
    primaryAxes,
    secondaryAxes,
    gridX,
    gridY,
    gridWidth,
    gridHeight,
    dark,
    focused,
    lastFocused,
    getDatumStyles,
    tooltip: {
      align,
      alignPriority,
      padding,
      tooltipArrowPadding,
      //
      arrowPosition,
      render,
      anchor,
      show
    }
  } = chartState

  const elRef = useRef()
  const tooltipElRef = useRef()

  const resolvedFocused = focused || lastFocused

  let alignX = 0
  let alignY = -50
  let triangleStyles = {}
  let resolvedAlign = align || 'auto'

  const backgroundColor = getBackgroundColor(dark)

  let resolvedArrowPosition = arrowPosition

  if (resolvedAlign === 'auto' && elRef.current) {
    let container = elRef.current
    const gridDims = container.getBoundingClientRect()
    const tooltipDims = tooltipElRef.current.getBoundingClientRect()
    const space = {
      left: Infinity,
      top: Infinity,
      right: Infinity,
      bottom: Infinity
    }

    while (container !== document.body) {
      container = container.parentElement
      const { overflowX, overflowY } = window.getComputedStyle(container)
      if (
        container === document.body ||
        [overflowX, overflowY].find(d => ['auto', 'hidden'].includes(d))
      ) {
        const containerDims = container.getBoundingClientRect()
        const left = gridDims.left - containerDims.left + anchor.x
        const top = gridDims.top - containerDims.top + anchor.y
        const right = containerDims.width - left
        const bottom = containerDims.height - top

        space.left = Math.min(space.left, left)
        space.top = Math.min(space.top, top)
        space.right = Math.min(space.right, right)
        space.bottom = Math.min(space.bottom, bottom)
      }
    }

    resolvedAlign = null

    alignPriority.forEach(priority => {
      if (resolvedAlign) {
        return
      }
      if (priority === 'left') {
        if (
          space.left -
            tooltipArrowPadding -
            padding -
            anchor.horizontalPadding >
            tooltipDims.width &&
          space.top > tooltipDims.height / 2 &&
          space.bottom > tooltipDims.height / 2
        ) {
          resolvedAlign = priority
        }
      } else if (priority === 'right') {
        if (
          space.right -
            tooltipArrowPadding -
            padding -
            anchor.horizontalPadding >
            tooltipDims.width &&
          space.top > tooltipDims.height / 2 &&
          space.bottom > tooltipDims.height / 2
        ) {
          resolvedAlign = priority
        }
      } else if (priority === 'top') {
        if (
          space.top - tooltipArrowPadding - padding - anchor.verticalPadding >
            tooltipDims.height &&
          space.left > tooltipDims.width / 2 &&
          space.right > tooltipDims.width / 2
        ) {
          resolvedAlign = priority
        }
      } else if (priority === 'bottom') {
        if (
          space.bottom -
            tooltipArrowPadding -
            padding -
            anchor.verticalPadding >
            tooltipDims.height &&
          space.left > tooltipDims.width / 2 &&
          space.right > tooltipDims.width / 2
        ) {
          resolvedAlign = priority
        }
      } else if (priority === 'topLeft') {
        if (
          space.top - tooltipArrowPadding > tooltipDims.height &&
          space.left - tooltipArrowPadding > tooltipDims.width
        ) {
          resolvedAlign = priority
        }
      } else if (priority === 'topRight') {
        if (
          space.top - tooltipArrowPadding > tooltipDims.height &&
          space.right - tooltipArrowPadding > tooltipDims.width
        ) {
          resolvedAlign = priority
        }
      } else if (priority === 'bottomLeft') {
        if (
          space.bottom - tooltipArrowPadding > tooltipDims.height &&
          space.left - tooltipArrowPadding > tooltipDims.width
        ) {
          resolvedAlign = priority
        }
      } else if (priority === 'bottomRight') {
        if (
          space.bottom - tooltipArrowPadding > tooltipDims.height &&
          space.right - tooltipArrowPadding > tooltipDims.width
        ) {
          resolvedAlign = priority
        }
      }
    })
  }

  if (resolvedAlign === 'top') {
    alignX = -50
    alignY = -100
  } else if (resolvedAlign === 'topRight') {
    alignX = 0
    alignY = -100
  } else if (resolvedAlign === 'right') {
    alignX = 0
    alignY = -50
  } else if (resolvedAlign === 'bottomRight') {
    alignX = 0
    alignY = 0
  } else if (resolvedAlign === 'bottom') {
    alignX = -50
    alignY = 0
  } else if (resolvedAlign === 'bottomLeft') {
    alignX = -100
    alignY = 0
  } else if (resolvedAlign === 'left') {
    alignX = -100
    alignY = -50
  } else if (resolvedAlign === 'topLeft') {
    alignX = -100
    alignY = -100
  }

  if (!resolvedArrowPosition) {
    if (resolvedAlign === 'left') {
      resolvedArrowPosition = 'right'
    } else if (resolvedAlign === 'right') {
      resolvedArrowPosition = 'left'
    } else if (resolvedAlign === 'top') {
      resolvedArrowPosition = 'bottom'
    } else if (resolvedAlign === 'bottom') {
      resolvedArrowPosition = 'top'
    } else if (resolvedAlign === 'topRight') {
      resolvedArrowPosition = 'bottomLeft'
    } else if (resolvedAlign === 'bottomRight') {
      resolvedArrowPosition = 'topLeft'
    } else if (resolvedAlign === 'topLeft') {
      resolvedArrowPosition = 'bottomRight'
    } else if (resolvedAlign === 'bottomLeft') {
      resolvedArrowPosition = 'topRight'
    }
  }

  if (resolvedArrowPosition === 'bottom') {
    triangleStyles = {
      top: '100%',
      left: '50%',
      transform: 'translate3d(-50%, 0%, 0)',
      borderLeft: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 0.8}px solid transparent`,
      borderTop: `${triangleSize}px solid ${backgroundColor}`
    }
  } else if (resolvedArrowPosition === 'top') {
    triangleStyles = {
      top: '0%',
      left: '50%',
      transform: 'translate3d(-50%, -100%, 0)',
      borderLeft: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize}px solid ${backgroundColor}`
    }
  } else if (resolvedArrowPosition === 'right') {
    triangleStyles = {
      top: '50%',
      left: '100%',
      transform: 'translate3d(0%, -50%, 0)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize}px solid ${backgroundColor}`
    }
  } else if (resolvedArrowPosition === 'left') {
    triangleStyles = {
      top: '50%',
      left: '0%',
      transform: 'translate3d(-100%, -50%, 0)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize}px solid ${backgroundColor}`
    }
  } else if (resolvedArrowPosition === 'topRight') {
    triangleStyles = {
      top: '0%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize * 2}px solid ${backgroundColor}`
    }
  } else if (resolvedArrowPosition === 'bottomRight') {
    triangleStyles = {
      top: '100%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize * 2}px solid ${backgroundColor}`
    }
  } else if (resolvedArrowPosition === 'topLeft') {
    triangleStyles = {
      top: '0%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 2}px solid ${backgroundColor}`
    }
  } else if (resolvedArrowPosition === 'bottomLeft') {
    triangleStyles = {
      top: '100%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 2}px solid ${backgroundColor}`
    }
  } else {
    triangleStyles = {
      opacity: 0
    }
  }

  const primaryAxis = Utils.getAxisByAxisID(
    primaryAxes,
    resolvedFocused ? resolvedFocused.series.primaryAxisID : null
  )
  const secondaryAxis = Utils.getAxisByAxisID(
    secondaryAxes,
    resolvedFocused ? resolvedFocused.series.secondaryAxisID : null
  )

  const resolvedHorizontalPadding = padding + anchor.horizontalPadding
  const resolvedVerticalPadding = padding + anchor.verticalPadding

  const renderProps = {
    ...chartState,
    datum: resolvedFocused,
    getStyle: datum => datum.getStatusStyle(resolvedFocused, getDatumStyles),
    primaryAxis,
    secondaryAxis
  }

  const renderedChildren = render(renderProps)

  const previousShowRef = useRef()
  useEffect(() => {
    previousShowRef.current = show
  })

  let animateCoords
  if (previousShowRef.current === show) {
    animateCoords = true
  }

  return (
    <div
      className='tooltip-wrap'
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: `${gridX}px`,
        top: `${gridY}px`,
        width: `${gridWidth}px`,
        height: `${gridHeight}px`,
        opacity: show ? 1 : 0,
        transition: 'all .3s ease'
      }}
      ref={el => {
        elRef.current = el
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: Utils.translate(anchor.x, anchor.y),
          transition: animateCoords ? 'all .2s ease' : 'opacity .2s ease'
        }}
      >
        <div
          style={{
            transform: `translate3d(${alignX}%, ${alignY}%, 0)`,
            padding: `${tooltipArrowPadding +
              resolvedVerticalPadding}px ${tooltipArrowPadding +
              resolvedHorizontalPadding}px`,
            width: 'auto',
            transition: 'all .2s ease'
          }}
        >
          <div
            ref={el => {
              tooltipElRef.current = el
            }}
            style={{
              fontSize: '12px',
              padding: '5px',
              background: getBackgroundColor(dark),
              color: dark ? 'black' : 'white',
              borderRadius: '3px',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 0,
                height: 0,
                ...triangleStyles,
                transition: animateCoords ? 'all .2s ease' : 'none'
              }}
            />
            {renderedChildren}
          </div>
        </div>
      </div>
    </div>
  )
}

export default withHooks(Tooltip)
