import React from 'react'
import useChartContext from '../hooks/useChartContext'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
//
import { getAxisByAxisId, translate } from '../utils/Utils'
//

const triangleSize = 7

const getBackgroundColor = dark =>
  dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)'

export default function Tooltip() {
  const chartContext = useChartContext()

  const {
    primaryAxes,
    secondaryAxes,
    gridX,
    gridY,
    gridWidth,
    gridHeight,
    dark,
    focused,
    latestFocused,
    getDatumStyle,
    tooltip,
  } = chartContext

  const elRef = React.useRef()
  const tooltipElRef = React.useRef()
  const previousShowRef = React.useRef()

  const {
    align,
    alignPriority,
    padding,
    tooltipArrowPadding,
    //
    arrowPosition,
    render,
    anchor,
    show,
  } = tooltip || {}

  const [finalAlign, setFinalAlign] = React.useState(align || 'auto')

  React.useEffect(() => {
    previousShowRef.current = show
  }, [show])

  useIsomorphicLayoutEffect(() => {
    if (align !== 'auto' || !elRef.current || !show || !anchor) {
      return
    }

    const space = {
      left: Infinity,
      top: Infinity,
      right: Infinity,
      bottom: Infinity,
    }

    let container = elRef.current
    const gridDims = container.getBoundingClientRect()
    const tooltipDims = tooltipElRef.current.getBoundingClientRect()

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

    let resolvedAlign = null

    alignPriority.forEach(priority => {
      if (resolvedAlign) {
        return
      }
      const fits = {
        left:
          space.left -
            tooltipArrowPadding -
            padding -
            anchor.horizontalPadding >
          tooltipDims.width,
        right:
          space.right -
            tooltipArrowPadding -
            padding -
            anchor.horizontalPadding >
          tooltipDims.width,
        top:
          space.top - tooltipArrowPadding - padding - anchor.verticalPadding >
            tooltipDims.height && space.left > tooltipDims.width / 2,
        bottom:
          space.bottom -
            tooltipArrowPadding -
            padding -
            anchor.verticalPadding >
          tooltipDims.height,
        centeredFromLeft: space.left > tooltipDims.width / 2,
        centeredFromRight: space.right > tooltipDims.width / 2,
        centeredFromTop: space.top > tooltipDims.height / 2,
        centeredFromBottom: space.bottom > tooltipDims.height / 2,
      }
      if (priority === 'left') {
        if (fits.left && fits.centeredFromTop && fits.centeredFromBottom) {
          resolvedAlign = priority
        }
      } else if (priority === 'right') {
        if (fits.right && fits.centeredFromTop && fits.centeredFromBottom) {
          resolvedAlign = priority
        }
      } else if (priority === 'top') {
        if (fits.top && fits.centeredFromLeft && fits.centeredFromRight) {
          resolvedAlign = priority
        }
      } else if (priority === 'bottom') {
        if (fits.bottom && fits.centeredFromLeft && fits.centeredFromRight) {
          resolvedAlign = priority
        }
      } else if (priority === 'topLeft') {
        if (fits.top && fits.left) {
          resolvedAlign = priority
        }
      } else if (priority === 'topRight') {
        if (fits.top && fits.right) {
          resolvedAlign = priority
        }
      } else if (priority === 'bottomLeft') {
        if (fits.bottom && fits.left) {
          resolvedAlign = priority
        }
      } else if (priority === 'bottomRight') {
        if (fits.bottom && fits.right) {
          resolvedAlign = priority
        }
      }
    })

    if (resolvedAlign !== finalAlign) {
      setFinalAlign(resolvedAlign)
    }
  }, [
    align,
    alignPriority,
    anchor,
    finalAlign,
    padding,
    show,
    tooltipArrowPadding,
  ])

  if (!tooltip) {
    return null
  }

  const resolvedFocused = focused || latestFocused

  let alignX = 0
  let alignY = -50
  let triangleStyles = {}

  const backgroundColor = getBackgroundColor(dark)

  let resolvedArrowPosition = arrowPosition

  if (finalAlign === 'top') {
    alignX = -50
    alignY = -100
  } else if (finalAlign === 'topRight') {
    alignX = 0
    alignY = -100
  } else if (finalAlign === 'right') {
    alignX = 0
    alignY = -50
  } else if (finalAlign === 'bottomRight') {
    alignX = 0
    alignY = 0
  } else if (finalAlign === 'bottom') {
    alignX = -50
    alignY = 0
  } else if (finalAlign === 'bottomLeft') {
    alignX = -100
    alignY = 0
  } else if (finalAlign === 'left') {
    alignX = -100
    alignY = -50
  } else if (finalAlign === 'topLeft') {
    alignX = -100
    alignY = -100
  } else if (finalAlign === 'center') {
    alignX = -50
    alignY = -50
  }

  if (!resolvedArrowPosition) {
    if (finalAlign === 'left') {
      resolvedArrowPosition = 'right'
    } else if (finalAlign === 'right') {
      resolvedArrowPosition = 'left'
    } else if (finalAlign === 'top') {
      resolvedArrowPosition = 'bottom'
    } else if (finalAlign === 'bottom') {
      resolvedArrowPosition = 'top'
    } else if (finalAlign === 'topRight') {
      resolvedArrowPosition = 'bottomLeft'
    } else if (finalAlign === 'bottomRight') {
      resolvedArrowPosition = 'topLeft'
    } else if (finalAlign === 'topLeft') {
      resolvedArrowPosition = 'bottomRight'
    } else if (finalAlign === 'bottomLeft') {
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
      borderTop: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (resolvedArrowPosition === 'top') {
    triangleStyles = {
      top: '0%',
      left: '50%',
      transform: 'translate3d(-50%, -100%, 0)',
      borderLeft: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (resolvedArrowPosition === 'right') {
    triangleStyles = {
      top: '50%',
      left: '100%',
      transform: 'translate3d(0%, -50%, 0)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (resolvedArrowPosition === 'left') {
    triangleStyles = {
      top: '50%',
      left: '0%',
      transform: 'translate3d(-100%, -50%, 0)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize}px solid ${backgroundColor}`,
    }
  } else if (resolvedArrowPosition === 'topRight') {
    triangleStyles = {
      top: '0%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else if (resolvedArrowPosition === 'bottomRight') {
    triangleStyles = {
      top: '100%',
      left: '100%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderLeft: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else if (resolvedArrowPosition === 'topLeft') {
    triangleStyles = {
      top: '0%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else if (resolvedArrowPosition === 'bottomLeft') {
    triangleStyles = {
      top: '100%',
      left: '0%',
      transform: 'translate3d(-50%, -50%, 0) rotate(-45deg)',
      borderTop: `${triangleSize * 0.8}px solid transparent`,
      borderBottom: `${triangleSize * 0.8}px solid transparent`,
      borderRight: `${triangleSize * 2}px solid ${backgroundColor}`,
    }
  } else {
    triangleStyles = {
      opacity: 0,
    }
  }

  const primaryAxis = getAxisByAxisId(
    primaryAxes,
    resolvedFocused ? resolvedFocused.series.primaryAxisId : null
  )
  const secondaryAxis = getAxisByAxisId(
    secondaryAxes,
    resolvedFocused ? resolvedFocused.series.secondaryAxisId : null
  )

  const resolvedHorizontalPadding = padding + anchor.horizontalPadding
  const resolvedVerticalPadding = padding + anchor.verticalPadding

  const renderProps = {
    ...chartContext,
    ...chartContext.tooltip,
    datum: resolvedFocused,
    getStyle: datum => datum.getStatusStyle(resolvedFocused, getDatumStyle),
    primaryAxis,
    secondaryAxis,
  }

  const renderedChildren = React.createElement(render, renderProps)

  let animateCoords
  if (previousShowRef.current === show) {
    animateCoords = true
  }

  return (
    <div
      className="tooltip-wrap"
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: `${gridX}px`,
        top: `${gridY}px`,
        width: `${gridWidth}px`,
        height: `${gridHeight}px`,
        opacity: show ? 1 : 0,
        transition: 'all .3s ease',
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
          transform: translate(anchor.x, anchor.y),
          transition: animateCoords ? 'all .2s ease' : 'opacity .2s ease',
        }}
      >
        <div
          style={{
            transform: `translate3d(${alignX}%, ${alignY}%, 0)`,
            padding: `${tooltipArrowPadding +
              resolvedVerticalPadding}px ${tooltipArrowPadding +
              resolvedHorizontalPadding}px`,
            width: 'auto',
            transition: 'all .2s ease',
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
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 0,
                height: 0,
                ...triangleStyles,
                transition: animateCoords ? 'all .2s ease' : 'none',
              }}
            />
            {renderedChildren}
          </div>
        </div>
      </div>
    </div>
  )
}
