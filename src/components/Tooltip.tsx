import React from 'react'
import ReactDOM from 'react-dom'

import { useSpring, animated } from '@react-spring/web'

import { useAnchor } from '../hooks/useAnchor'
// import useIsScrolling from '../hooks/useIsScrolling'
import useLatestWhen from '../hooks/useLatestWhen'
import usePortalElement from '../hooks/usePortalElement'
import usePrevious from '../hooks/usePrevious'
import { Datum, ResolvedTooltipOptions, TooltipOptions } from '../types'
//
import useChartContext from '../utils/chartContext'
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

export default function Tooltip<TDatum>(): React.ReactPortal | null {
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

  const preTooltipOptions = getOptions().tooltip ?? true

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

  let anchorRect: DOMRect | null = null

  if (latestFocusedDatum) {
    anchorRect = latestFocusedDatum.element?.getBoundingClientRect() ?? null
  }

  const portalEl = usePortalElement()

  const [tooltipEl, setTooltipEl] = React.useState<HTMLDivElement | null>()

  const translateX = anchorRect?.left ?? 0
  const translateY = anchorRect?.top ?? 0
  const width = anchorRect?.width ?? 0
  const height = anchorRect?.height ?? 0

  const boundingBox = React.useMemo(() => {
    const box = {
      x: translateY,
      y: translateX,
      top: translateY,
      left: translateX,
      bottom: translateY + width,
      right: translateX + height,
      width: width,
      height: height,
      toJSON: () => ({} as DOMRect),
    }

    box.toJSON = () => box

    return box
  }, [height, translateX, translateY, width])

  const anchorEl = React.useMemo(
    () => ({
      getBoundingClientRect() {
        return boundingBox
      },
    }),
    [boundingBox]
  )

  // const isScrolling = useIsScrolling(200)

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
        // isScrolling ||
        wasZero ||
        (['left', 'top'].includes(key) &&
          !previousFocusedDatum &&
          !!focusedDatum)
      )
    },
  })

  const show = !!preTooltipOptions

  return show && portalEl
    ? ReactDOM.createPortal(
        <animated.div style={springProps}>
          <div
            ref={el => setTooltipEl(el)}
            style={{
              fontFamily: 'sans-serif',
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
