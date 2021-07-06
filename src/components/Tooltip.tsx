import React from 'react'
import ReactDOM from 'react-dom'

import { useSpring, animated } from '@react-spring/web'

import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import useLatestWhen from '../hooks/useLatestWhen'
import usePrevious from '../hooks/usePrevious'
import {
  AlignMode,
  AlignPosition,
  AnchorMode,
  Datum,
  GridDimensions,
  ResolvedTooltipOptions,
  TooltipOptions,
} from '../types'
//
import { getWidth, getX, getY, translate, getWidth } from '../utils/Utils'
import useChartContext from './Chart'
import TooltipRenderer, { TooltipRendererProps } from './TooltipRenderer'

//

type Anchor = {
  x: number
  y: number
}

//

const triangleSize = 7

const getBackgroundColor = (dark?: boolean) =>
  dark ? 'rgba(255,255,255,.9)' : 'rgba(0, 26, 39, 0.9)'

function defaultTooltip<TDatum>(
  options: TooltipOptions<TDatum> = {}
): ResolvedTooltipOptions<TDatum> {
  return {
    ...options,
    align: options.align ?? 'auto',
    alignPriority: options.alignPriority ?? [
      'right',
      'topRight',
      'bottomRight',
      'left',
      'topLeft',
      'bottomLeft',
      'top',
      'bottom',
    ],
    padding: options.padding ?? 5,
    tooltipArrowPadding: options.tooltipArrowPadding ?? 7,
    anchor: options.anchor ?? 'closest',
    render: options.render ?? TooltipRenderer,
  }
}

export default function Tooltip<TDatum>() {
  const {
    useFocusedDatumAtom,
    usePointerAtom,
    getOptions,
    gridDimensions,
    useChartOffsetAtom,
    axesInfo,
    primaryAxis,
    secondaryAxes,
    getDatumStatusStyle,
    getSeriesStatusStyle,
  } = useChartContext<TDatum>()

  const [focusedDatum] = useFocusedDatumAtom()
  const [pointer] = usePointerAtom()
  const [offset] = useChartOffsetAtom()

  // const latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum)

  const preTooltipOptions = getOptions().tooltip

  const secondaryAxis =
    secondaryAxes.find(d => d.id === focusedDatum?.secondaryAxisId) ??
    secondaryAxes[0]

  const tooltipOptions = React.useMemo(
    () =>
      defaultTooltip(
        typeof preTooltipOptions === 'boolean' ? {} : preTooltipOptions
      ),
    [preTooltipOptions]
  )

  const [finalAlign, setFinalAlign] = React.useState<AlignMode | null>(
    tooltipOptions.align || 'auto'
  )

  // If there is a focused datum, default the focus to its x and y
  let show = !!focusedDatum

  let anchor = {
    x: NaN,
    y: NaN,
    paddingX: 0,
    paddingY: 0,
  }

  if (focusedDatum) {
    anchor = {
      x: getX(focusedDatum, primaryAxis, secondaryAxis),
      y: getY(focusedDatum, primaryAxis, secondaryAxis),
      paddingX: getWidth(focusedDatum, primaryAxis, secondaryAxis),
      paddingY: 0,
    }
  }

  if (tooltipOptions.anchor === 'pointer') {
    // Support pointer-bound focus
    // anchor = { x: pointer.x, y: pointer.y, paddingX: 0, paddingY: 0 }
  } else if (tooltipOptions.anchor === 'closest') {
    // Do nothing, this is already calculated
  }
  // else if (focusedDatum) {
  //   // Support manual definition of focus point using relative multiFocus strategy
  //   const multiFocus: AnchorMode[] = Array.isArray(tooltipOptions.anchor)
  //     ? [...tooltipOptions.anchor]
  //     : [tooltipOptions.anchor]
  //   anchor = {
  //     paddingX: 0,
  //     paddingY: 0,
  //     ...getMultiAnchor(multiFocus, focusedDatum.group ?? [], gridDimensions),
  //   }
  // }

  const previousShow = usePrevious(show)

  const elRef = React.useRef<HTMLDivElement | null>(null)
  const tooltipElRef = React.useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!show) {
      return
    }

    if (tooltipOptions.align !== 'auto' || !elRef.current || !show || !anchor) {
      return
    }

    const space = {
      left: Infinity,
      top: Infinity,
      right: Infinity,
      bottom: Infinity,
    }

    let container: HTMLElement = elRef.current
    const gridDims = container.getBoundingClientRect()
    const tooltipDims = tooltipElRef.current?.getBoundingClientRect()

    if (!tooltipDims) {
      return
    }

    while (container !== document.body && container.parentElement) {
      container = container.parentElement
      const { overflowX, overflowY } = window.getComputedStyle(container)
      if (
        container === document.body ||
        [overflowX, overflowY].find(d => ['auto', 'hidden'].includes(d))
      ) {
        const containerDims = container.getBoundingClientRect()
        const left = gridDims.left - containerDims.left + (anchor.x ?? 0)
        const top = gridDims.top - containerDims.top + (anchor.y ?? 0)
        const right = containerDims.width - left
        const bottom = containerDims.height - top

        space.left = Math.min(space.left, left)
        space.top = Math.min(space.top, top)
        space.right = Math.min(space.right, right)
        space.bottom = Math.min(space.bottom, bottom)
      }
    }

    let resolvedAlign: AlignPosition | null = null

    tooltipOptions.alignPriority.forEach(priority => {
      if (resolvedAlign) {
        return
      }

      const fits = {
        left:
          space.left -
            tooltipOptions.tooltipArrowPadding -
            tooltipOptions.padding -
            (anchor.paddingX ?? 0) >
          tooltipDims.width,
        right:
          space.right -
            tooltipOptions.tooltipArrowPadding -
            tooltipOptions.padding -
            (anchor.paddingX ?? 0) >
          tooltipDims.width,
        top:
          space.top -
            tooltipOptions.tooltipArrowPadding -
            tooltipOptions.padding -
            (anchor.paddingY ?? 0) >
            tooltipDims.height && space.left > tooltipDims.width / 2,
        bottom:
          space.bottom -
            tooltipOptions.tooltipArrowPadding -
            tooltipOptions.padding -
            (anchor.paddingY ?? 0) >
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

    setFinalAlign(resolvedAlign)
  }, [])

  let alignX = 0
  let alignY = -50
  let triangleStyles = {}

  const dark = getOptions().dark

  const backgroundColor = getBackgroundColor(dark)

  let resolvedArrowPosition = tooltipOptions.arrowPosition

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

  const resolvedHorizontalPadding =
    tooltipOptions.padding + (anchor.paddingX ?? 0)
  const resolvedVerticalPadding =
    tooltipOptions.padding + (anchor.paddingY ?? 0)

  const renderProps: TooltipRendererProps<TDatum> = {
    axesInfo,
    getOptions,
    useChartContext,
    focusedDatum,
    pointer,
    primaryAxis,
    secondaryAxis,
    tooltipOptions,
    getDatumStyle: (datum: Datum<TDatum>) =>
      getDatumStatusStyle(datum, focusedDatum),
  }

  const renderedChildren = tooltipOptions.render(renderProps)

  // let animateCoords
  // if (previousShow === show) {
  //   animateCoords = true
  // }

  const [container, setContainer] = React.useState<HTMLDivElement>()

  useIsomorphicLayoutEffect(() => {
    if (!container) {
      let element = document.getElementById(
        'react-charts-portal'
      ) as HTMLDivElement

      if (!element) {
        element = document.createElement('div')

        Object.assign(element.style, {
          pointerEvents: 'none',
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        })

        document.body.append(element)
      }

      setContainer(element)
    }
  })

  const translateX = offset.left + gridDimensions.gridX + anchor.x ?? 0
  const translateY = offset.top + gridDimensions.gridY + anchor.y ?? 0

  const springProps = useSpring({
    translateX: Number.isNaN(translateX) ? 0 : translateX,
    translateY: Number.isNaN(translateY) ? 0 : translateY,
    config: { mass: 1, tension: 210, friction: 30 },
  })

  return container
    ? ReactDOM.createPortal(
        <animated.div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            ...springProps,
          }}
          >
          <div
            style={{
              // transform: `translate3d(${alignX}%, ${alignY}%, 0)`,
              paddingTop: tooltipOptions.tooltipArrowPadding + resolvedVerticalPadding,
              paddingBottom: tooltipOptions.tooltipArrowPadding + resolvedVerticalPadding,
              paddingLeft: tooltipOptions.tooltipArrowPadding + resolvedHorizontalPadding,
              paddingRight: tooltipOptions.tooltipArrowPadding + resolvedHorizontalPadding,
              // width: 'auto',
              transition: 'all .2s ease',
            }}
            >
            <div
              ref={tooltipElRef}
              style={{
                fontSize: '12px',
                padding: '5px',
                background: getBackgroundColor(dark),
                color: dark ? 'black' : 'white',
                borderRadius: '3px',
                position: 'relative',
              }}
            >
              {/* <div
                style={{
                  position: 'absolute',
                  width: 0,
                  height: 0,
                  ...triangleStyles,
                  transition: animateCoords ? 'all .2s ease' : 'none',
                }}
              />
              {renderedChildren} */}
            </div>
          </div>
        </animated.div>,
        container
      )
    : null
}

function getMultiAnchor<TDatum>(
  anchor: AnchorMode[],
  datums: Datum<TDatum>[],
  gridDimensions: GridDimensions
) {
  const invalid = () => {
    throw new Error(
      `${JSON.stringify(
        anchor
      )} is not a valid tooltip anchor option. You should use a single anchor option or 2 non-conflicting anchor options.`
    )
  }

  let x
  let y

  let xMin = datums[0].anchor.x ?? 0
  let xMax = datums[0].anchor.x ?? 0
  let yMin = datums[0].anchor.y ?? 0
  let yMax = datums[0].anchor.y ?? 0

  datums.forEach(datum => {
    xMin = Math.min(datum.anchor.x ?? 0, xMin)
    xMax = Math.max(datum.anchor.x ?? 0, xMax)
    yMin = Math.min(datum.anchor.y ?? 0, yMin)
    yMax = Math.max(datum.anchor.y ?? 0, yMax)
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
        x = gridDimensions.gridWidth
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
        y = gridDimensions.gridHeight
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
          y = gridDimensions.gridHeight / 2
        }
        if (typeof x === 'undefined') {
          x = gridDimensions.gridWidth / 2
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
