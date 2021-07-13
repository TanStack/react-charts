import React from 'react'
import ReactDOM from 'react-dom'

import { useSpring, animated } from '@react-spring/web'

import { useAnchor } from '../hooks/useAnchor'
import useLatestWhen from '../hooks/useLatestWhen'
import usePortalElement from '../hooks/usePortalElement'
import usePrevious from '../hooks/usePrevious'
import { Datum, ResolvedTooltipOptions, TooltipOptions } from '../types'
//
import useChartContext from '../utils/chartContext'
import TooltipRenderer from './TooltipRenderer'
import useRect from '../hooks/useRect'

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
    svgRef,
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

  const portalEl = usePortalElement()

  const [tooltipEl, setTooltipEl] = React.useState<HTMLDivElement | null>()

  const svgRect = useRect(svgRef.current, !!focusedDatum?.element)

  const anchorEl = React.useMemo(() => {
    const anchorRect =
      latestFocusedDatum?.element?.getBoundingClientRect() ?? null

    if (!anchorRect) {
      return null
    }

    if (!svgRect) return

    const translateX = anchorRect.left ?? 0
    const translateY = anchorRect.top ?? 0
    const width = anchorRect.width ?? 0
    const height = anchorRect.height ?? 0

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

    return {
      getBoundingClientRect: () => {
        return box
      },
    }
  }, [latestFocusedDatum?.element, svgRect])

  const anchor = useAnchor({
    show: !!focusedDatum,
    portalEl,
    anchorEl,
    tooltipEl,
    side: ['right', 'left', 'top', 'bottom'],
  })

  const previousAnchor = usePrevious(anchor)
  const latestStableAnchor = useLatestWhen(anchor, !!anchor.fit) ?? anchor

  const { visibility, ...anchorStyle } = latestStableAnchor.style

  const springProps = useSpring({
    ...anchorStyle,
    left: anchorStyle.left || 0,
    top: anchorStyle.top || 0,
    opacity: !!focusedDatum ? 1 : 0,
    config: { mass: 1, tension: 210, friction: 30 },
    immediate: key => {
      if (['left', 'top'].includes(key)) {
        return Number.isNaN(previousAnchor?.style.left)
      }

      return false
    },
  })

  const show = !!preTooltipOptions

  const latestFit = useLatestWhen(anchor.fit, !!anchor.fit)

  return show && portalEl
    ? ReactDOM.createPortal(
        <animated.div style={springProps}>
          <div
            ref={el => setTooltipEl(el)}
            style={{
              fontFamily: 'sans-serif',
              ...(latestFit?.startKey === 'left'
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
              anchor,
            })}
          </div>
        </animated.div>,
        portalEl
      )
    : null
}
