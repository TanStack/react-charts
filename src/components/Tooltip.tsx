import React from 'react'
import ReactDOM from 'react-dom'

import { useSpring, animated } from '@react-spring/web'

import { useAnchor } from '../hooks/useAnchor'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import useLatestWhen from '../hooks/useLatestWhen'
import usePrevious from '../hooks/usePrevious'
import { Datum, ResolvedTooltipOptions, TooltipOptions } from '../types'
//
import useChartContext from './Chart'
import TooltipRenderer from './TooltipRenderer'

//

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
    // anchor: options.anchor ?? 'closest',
    render: options.render ?? TooltipRenderer,
  }
}

export default function Tooltip<TDatum>() {
  const {
    useFocusedDatumAtom,
    getOptions,
    primaryAxis,
    secondaryAxes,
    getDatumStatusStyle,
    // getSeriesStatusStyle,
  } = useChartContext<TDatum>()

  const [focusedDatum] = useFocusedDatumAtom()
  const latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum)

  // const [pointer] = usePointerAtom()

  // const latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum)

  const preTooltipOptions = getOptions().tooltip

  const secondaryAxis =
    secondaryAxes.find(d => d.id === latestFocusedDatum?.secondaryAxisId) ??
    secondaryAxes[0]

  const tooltipOptions = React.useMemo(
    () =>
      defaultTooltip(
        typeof preTooltipOptions === 'boolean' ? {} : preTooltipOptions
      ),
    [preTooltipOptions]
  )

  // const [finalAlign, setFinalAlign] = React.useState<AlignMode | null>(
  //   tooltipOptions.align || 'auto'
  // )

  // If there is a focused datum, default the focus to its x and y

  let anchorRect: DOMRect | null = null

  if (latestFocusedDatum) {
    anchorRect = latestFocusedDatum.element?.getBoundingClientRect() ?? null
  }

  // if (tooltipOptions.anchor === 'pointer') {
  // Support pointer-bound focus
  // anchor = { x: pointer.x, y: pointer.y, paddingX: 0, paddingY: 0 }
  // } else if (tooltipOptions.anchor === 'closest') {
  // Do nothing, this is already calculated
  // }
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

  // let animateCoords
  // if (previousShow === show) {
  //   animateCoords = true
  // }

  const [portalEl, setPortalEl] = React.useState<HTMLDivElement | null>()
  const [tooltipEl, setTooltipEl] = React.useState<HTMLDivElement | null>()

  useIsomorphicLayoutEffect(() => {
    if (!portalEl) {
      let element = document.getElementById(
        'react-charts-portal'
      ) as HTMLDivElement

      if (!element) {
        element = document.createElement('div')

        element.setAttribute('id', 'react-charts-portal')

        Object.assign(element.style, {
          pointerEvents: 'none',
          position: 'fixed',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          'z-index': 99999999999,
        })

        document.body.append(element)
      }

      setPortalEl(element)
    }
  })

  const translateX = anchorRect?.left ?? 0
  const translateY = anchorRect?.top ?? 0
  const width = anchorRect?.width ?? 0
  const height = anchorRect?.height ?? 0

  const boundingBox = React.useMemo(
    () => ({
      top: translateY,
      left: translateX,
      bottom: translateY + width,
      right: translateX + height,
      width: width,
      height: height,
    }),
    [height, translateX, translateY, width]
  )

  const anchorEl = React.useMemo(
    () => ({
      getBoundingClientRect() {
        return boundingBox
      },
    }),
    [boundingBox]
  )

  const anchorFit = useAnchor({
    show: !!focusedDatum,
    portalEl,
    anchorEl,
    tooltipEl,
    side: ['right', 'left', 'top', 'bottom'],
  })

  const { visibility, ...anchorFitStyle } = anchorFit.style

  const previousFocusedDatum = usePrevious(focusedDatum)
  const previousAnchorFitStyle = usePrevious(anchorFitStyle)
  const wasZero =
    previousAnchorFitStyle?.left === 0 && previousAnchorFitStyle?.top === 0

  const springProps = useSpring({
    ...anchorFitStyle,
    opacity: wasZero ? 0 : focusedDatum && anchorFit.fit ? 1 : 0,
    config: { mass: 1, tension: 210, friction: 30 },
    immediate: key => {
      return (
        wasZero ||
        (['left', 'top'].includes(key) &&
          !previousFocusedDatum &&
          !!focusedDatum)
      )
    },
  })

  return portalEl
    ? ReactDOM.createPortal(
        <animated.div style={springProps}>
          <div
            ref={el => setTooltipEl(el)}
            style={{
              ...(anchorFit.fit?.startKey === 'left'
                ? {
                    padding: '0 10px',
                  }
                : {
                    padding: '10px 0',
                  }),
            }}
          >
            {tooltipOptions.render({
              getOptions,
              focusedDatum: latestFocusedDatum,
              primaryAxis,
              secondaryAxis,
              getDatumStyle: (datum: Datum<TDatum>) =>
                getDatumStatusStyle(datum, focusedDatum),
              anchorFit,
            })}
          </div>
        </animated.div>,
        portalEl
      )
    : null
}

// function getMultiAnchor<TDatum>(
//   anchor: AnchorMode[],
//   datums: Datum<TDatum>[],
//   gridDimensions: GridDimensions
// ) {
//   const invalid = () => {
//     throw new Error(
//       `${JSON.stringify(
//         anchor
//       )} is not a valid tooltip anchor option. You should use a single anchor option or 2 non-conflicting anchor options.`
//     )
//   }

//   let x
//   let y

//   let xMin = datums[0].anchor.x ?? 0
//   let xMax = datums[0].anchor.x ?? 0
//   let yMin = datums[0].anchor.y ?? 0
//   let yMax = datums[0].anchor.y ?? 0

//   datums.forEach(datum => {
//     xMin = Math.min(datum.anchor.x ?? 0, xMin)
//     xMax = Math.max(datum.anchor.x ?? 0, xMax)
//     yMin = Math.min(datum.anchor.y ?? 0, yMin)
//     yMax = Math.max(datum.anchor.y ?? 0, yMax)
//   })

//   if (anchor.length > 2) {
//     return invalid()
//   }

//   anchor = anchor.sort(a =>
//     a.includes('center') || a.includes('Center') ? 1 : -1
//   )

//   for (let i = 0; i < anchor.length; i++) {
//     const anchorPart = anchor[i]

//     // Horizontal Positioning
//     if (['left', 'right', 'gridLeft', 'gridRight'].includes(anchorPart)) {
//       if (typeof x !== 'undefined') {
//         invalid()
//       }
//       if (anchorPart === 'left') {
//         x = xMin
//       } else if (anchorPart === 'right') {
//         x = xMax
//       } else if (anchorPart === 'gridLeft') {
//         x = 0
//       } else if (anchorPart === 'gridRight') {
//         x = gridDimensions.gridWidth
//       } else {
//         invalid()
//       }
//     }

//     // Vertical Positioning
//     if (['top', 'bottom', 'gridTop', 'gridBottom'].includes(anchorPart)) {
//       if (typeof y !== 'undefined') {
//         invalid()
//       }
//       if (anchorPart === 'top') {
//         y = yMin
//       } else if (anchorPart === 'bottom') {
//         y = yMax
//       } else if (anchorPart === 'gridTop') {
//         y = 0
//       } else if (anchorPart === 'gridBottom') {
//         y = gridDimensions.gridHeight
//       } else {
//         invalid()
//       }
//     }

//     // Center Positioning
//     if (['center', 'gridCenter'].includes(anchorPart)) {
//       if (anchorPart === 'center') {
//         if (typeof y === 'undefined') {
//           y = (yMin + yMax) / 2
//         }
//         if (typeof x === 'undefined') {
//           x = (xMin + xMax) / 2
//         }
//       } else if (anchorPart === 'gridCenter') {
//         if (typeof y === 'undefined') {
//           y = gridDimensions.gridHeight / 2
//         }
//         if (typeof x === 'undefined') {
//           x = gridDimensions.gridWidth / 2
//         }
//       } else {
//         invalid()
//       }
//     }

//     // Auto center the remainder if there is only one anchorPart listed
//     if (anchor.length === 1) {
//       if (anchor[0].includes('grid')) {
//         anchor.push('gridCenter')
//       } else {
//         anchor.push('center')
//       }
//     }
//   }

//   return { x, y }
// }
