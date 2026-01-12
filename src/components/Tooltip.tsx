import React from 'react'
import ReactDOM from 'react-dom'

import { useAnchor } from '../hooks/useAnchor'
import useLatestWhen from '../hooks/useLatestWhen'
import usePortalElement from '../hooks/usePortalElement'
import usePrevious from '../hooks/usePrevious'
import { Datum, ResolvedTooltipOptions, TooltipOptions } from '../types'
//
import useChartContext from '../utils/chartContext'
import TooltipRenderer from './TooltipRenderer'
import useRect from '../hooks/useRect'
import { useSpring } from '../hooks/useSpring'

//

export function defaultTooltip<TDatum>(
  options: boolean | TooltipOptions<TDatum> = {}
): ResolvedTooltipOptions<TDatum> {
  if (options === true) {
    options = { show: true }
  } else if (options === false) {
    options = { show: false }
  }

  return {
    show: true,
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
    arrowPadding: options.arrowPadding ?? 7,
    // anchor: options.anchor ?? 'closest',
    render: options.render ?? TooltipRenderer,
    showDatumInTooltip: options.showDatumInTooltip ?? (() => true),
  }
}

export default function Tooltip<TDatum>(): React.ReactPortal | null {
  const {
    focusedDatumState,
    getOptions,
    primaryAxis,
    secondaryAxes,
    getDatumStatusStyle,
    svgRef,
  } = useChartContext<TDatum>()

  const [focusedDatum] = focusedDatumState
  const latestFocusedDatum = useLatestWhen(focusedDatum, !!focusedDatum)

  const secondaryAxis =
    secondaryAxes.find(d => d.id === latestFocusedDatum?.secondaryAxisId) ??
    secondaryAxes[0]

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

    const el = document.createElement('div')

    el.getBoundingClientRect = () =>
      ({
        x: translateX,
        y: translateY,
        width: width,
        height: height,
        top: translateY,
        left: translateX,
        bottom: translateY + width,
        right: translateX + height,
      } as any)

    return el
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

  const tooltipRef = React.useRef<HTMLDivElement | null>(null)

  const immediate = Number.isNaN(previousAnchor?.style.left)

  const tooltipXSpring = useSpring(
    anchorStyle.left || 0,
    [1, 210, 30],
    () => {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate(${tooltipXSpring.x()}px, ${tooltipYSpring.x()}px)`
      }
    },
    immediate
  )

  const tooltipYSpring = useSpring(
    anchorStyle.top || 0,
    [1, 210, 30],
    () => {
      if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate(${tooltipXSpring.x()}px, ${tooltipYSpring.x()}px)`
      }
    },
    immediate
  )

  // const springProps = useSpring({
  //   ...anchorStyle,
  //   left: anchorStyle.left || 0,
  //   top: anchorStyle.top || 0,
  //   config: { mass: 1, tension: 210, friction: 30 },
  //   immediate: key => {
  //     if (['left', 'top'].includes(key)) {
  //       return Number.isNaN(previousAnchor?.style.left)
  //     }

  //     return false
  //   },
  // })

  const show = getOptions().tooltip.show

  const latestFit = useLatestWhen(anchor.fit, !!anchor.fit)

  return show && portalEl
    ? ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          style={{
            position: anchorStyle.position,
            opacity: !!focusedDatum ? 1 : 0,
            transition: 'opacity .3s ease',
          }}
        >
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
            {getOptions().tooltip.render({
              getOptions,
              focusedDatum: latestFocusedDatum,
              primaryAxis,
              secondaryAxes,
              secondaryAxis,
              getDatumStyle: (datum: Datum<TDatum>) =>
                getDatumStatusStyle(datum, focusedDatum),
              anchor,
            })}
          </div>
        </div>,
        portalEl
      )
    : null
}
