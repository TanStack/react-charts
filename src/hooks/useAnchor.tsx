import React from 'react'

import useRect, { HasBoundingClientRect } from './useRect'

//

//

type AlignMode =
  | 'center'
  | 'start'
  | 'end'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'

type Side = 'left' | 'right' | 'top' | 'bottom'
type SideOption = Side | `${Side} ${AlignMode}`
type SideAlign = [Side, AlignMode]

type StartKey = 'left' | 'top'
type LengthKey = 'width' | 'height'

type Dims = {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

// These are the keys used internally to look up and measure
// different sides of a bounding box within another
const sideSchemas = {
  left: {
    side: 'left',
    startKey: 'left',
    lengthKey: 'width',
    crossStartKey: 'top',
    crossLengthKey: 'height',
    fromEnd: false,
  },
  right: {
    side: 'right',
    startKey: 'left',
    lengthKey: 'width',
    crossStartKey: 'top',
    crossLengthKey: 'height',
    fromEnd: true,
  },
  top: {
    side: 'top',
    startKey: 'top',
    lengthKey: 'height',
    crossStartKey: 'left',
    crossLengthKey: 'width',
    fromEnd: false,
  },
  bottom: {
    side: 'bottom',
    startKey: 'top',
    lengthKey: 'height',
    crossStartKey: 'left',
    crossLengthKey: 'width',
    fromEnd: true,
  },
} as const

// This is the final Tootlip component. It's a render prop
// that lets you attach handlers to elements, and render a tooltip
// anchored to them in relation to the parent portal container (either the only
// one defined or the one referenced by Id).
export function useAnchor(options: {
  show: boolean
  useLargest?: boolean
  side: SideOption | SideOption[]
  portalEl: HasBoundingClientRect | null | undefined
  anchorEl: HasBoundingClientRect | null | undefined
  tooltipEl: HasBoundingClientRect | null | undefined
}) {
  const portalDims = useRect(options.portalEl, { enabled: options.show })
  const anchorDims = useRect(options.anchorEl, { enabled: options.show })
  const tooltipDims = useRect(options.tooltipEl, {
    enabled: options.show,
  })

  const sides = React.useMemo(() => {
    const preSides = Array.isArray(options.side) ? options.side : [options.side]
    return preSides.map(alignStr => {
      const [side, align = 'center'] = alignStr.split(' ') as [Side, AlignMode]
      const incompatibleSide = !['top', 'right', 'bottom', 'left'].find(
        d => side === d
      )

      if (incompatibleSide) {
        throw new Error(
          `react-sticker: "${side}" is not a valid side! Must be one of ['top', 'right', 'bottom', 'left'].`
        )
      }

      const incompatibleAlign = ![
        'center',
        'start',
        'end',
        'top',
        'right',
        'bottom',
        'left',
      ].find(d => align === d)

      if (incompatibleAlign) {
        throw new Error(
          `react-sticker: "${align}" is not a valid side-alignment! Must be one of ['center', 'start', 'end', 'top', 'right', 'bottom', 'left'].`
        )
      }

      return [side, align] as [Side, AlignMode]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options.side)])

  // IF we have all of the dimensions needed to calculate
  // fits, then calculate the fit
  const ready = portalDims && tooltipDims && anchorDims

  const fit = React.useMemo(
    () =>
      ready
        ? fitOnBestSide({
            portalDims,
            tooltipDims,
            anchorDims,
            sides,
            useLargest: options.useLargest,
          })
        : null,
    [anchorDims, options.useLargest, portalDims, ready, sides, tooltipDims]
  )

  return {
    fit,
    style: {
      position: 'absolute' as const,
      visibility: ready ? ('visible' as const) : ('hidden' as const),
      // The fit styles are applied here from the best fit
      ...fit?.style,
    },
  }
}

// This function selects the best side for the tooltip by using
// the ranked fits.
function fitOnBestSide({
  portalDims,
  tooltipDims,
  anchorDims,
  sides,
  useLargest,
}: {
  portalDims: Dims
  tooltipDims: Dims
  anchorDims: Dims
  sides: SideAlign[]
  useLargest?: boolean
}) {
  const fits = sides.map(([side, align]) =>
    measureFit({
      ...sideSchemas[side],
      align,
      portalDims,
      tooltipDims,
      anchorDims,
    })
  )

  if (useLargest) {
    fits.sort((a, b) => b.fitRatio - a.fitRatio)
    return fits[0]
  }

  return fits.find(fit => fit.fitRatio >= 1) || fits[0]
}

// This function takes a side and bunch of calculated dimensions from
// the portal, tooltip and target. Then it returns
// the percentage fit and the style to achieve this specific fit
function measureFit({
  side,
  align,
  startKey,
  lengthKey,
  crossStartKey,
  crossLengthKey,
  fromEnd,
  portalDims,
  tooltipDims,
  anchorDims,
}: {
  side: Side
  align: AlignMode
  startKey: StartKey
  lengthKey: LengthKey
  crossStartKey: StartKey
  crossLengthKey: LengthKey
  fromEnd: boolean
  portalDims: Dims
  tooltipDims: Dims
  anchorDims: Dims
}) {
  const parentStart = portalDims[startKey]
  const parentLength = portalDims[lengthKey]
  const crossParentStart = portalDims[crossStartKey]
  const crossParentLength = portalDims[crossLengthKey]
  const anchorStart = anchorDims[startKey] - portalDims[startKey]
  const anchorLength = anchorDims[lengthKey]
  const crossAnchorStart = anchorDims[crossStartKey]
  const crossAnchorLength = anchorDims[crossLengthKey]
  const crossAnchorWidth = anchorDims[crossLengthKey]
  const targetLength = tooltipDims[lengthKey]
  const crossTargetLength = tooltipDims[crossLengthKey]

  let targetStart: number
  let fitRatio: number

  if (!fromEnd) {
    targetStart = anchorStart - targetLength
    fitRatio = Math.min(anchorStart / targetLength)
  } else {
    targetStart = anchorStart + anchorLength
    fitRatio = (parentLength - (anchorStart + anchorLength)) / targetLength
  }

  targetStart = Math.max(parentStart, Math.min(targetStart, parentLength))

  let crossTargetStart: number

  if (startKey === 'left') {
    if (align === 'top') {
      align = 'start'
    } else if (align === 'bottom') {
      align = 'end'
    }
  } else {
    if (align === 'left') {
      align = 'start'
    } else if (align === 'right') {
      align = 'end'
    }
  }

  if (!['start', 'center', 'end'].includes(align)) {
    align = 'center'
  }

  if (align === 'start') {
    crossTargetStart = crossAnchorStart
  } else if (align === 'end') {
    crossTargetStart = crossAnchorStart + crossAnchorWidth - crossTargetLength
  } else {
    crossTargetStart =
      crossAnchorStart + crossAnchorLength / 2 - crossTargetLength / 2
  }

  crossTargetStart = Math.max(
    crossParentStart,
    Math.min(crossTargetStart, crossParentLength - crossTargetLength)
  )

  return {
    side,
    align,
    startKey,
    lengthKey,
    crossStartKey,
    crossLengthKey,
    fromEnd,
    portalDims,
    tooltipDims,
    anchorDims,
    fitRatio,
    style: {
      [startKey]: targetStart,
      [crossStartKey]: crossTargetStart,
    } as Record<StartKey, number>,
  }
}
