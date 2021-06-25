import { atom, useAtom } from 'jotai'
import React, { MutableRefObject } from 'react'

import { axisDimensionsAtom } from '../atoms'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'
import { AxisLinear, GridDimensions, Position } from '../types'

const getElBox = (el: Element) => {
  var rect = el.getBoundingClientRect()
  return {
    top: Math.round(rect.top),
    right: Math.round(rect.right),
    bottom: Math.round(rect.bottom),
    left: Math.round(rect.left),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    x: Math.round(rect.x),
    y: Math.round(rect.y),
  }
}

function useIsLooping() {
  const callThreshold = 30
  const timeLimit = 500
  const now = Date.now()

  const ref = React.useRef([now])

  ref.current.push(now)

  ref.current = ref.current.filter(d => d > now - timeLimit)

  while (ref.current.length > callThreshold) {
    ref.current.shift()
  }

  const isLooping =
    ref.current.length === callThreshold && now - ref.current[0] < timeLimit

  return isLooping
}

export default function useMeasure({
  axis,
  elRef,
  gridDimensions,
  showRotated,
  setShowRotated,
}: {
  axis: AxisLinear
  elRef: MutableRefObject<SVGGElement | null>
  gridDimensions: GridDimensions
  showRotated: boolean
  setShowRotated: (value: boolean) => void
}) {
  const axisDimensionAtom = React.useMemo(() => {
    return atom(get => {
      return get(axisDimensionsAtom)[axis.position as Position]?.[axis.id!]
    })
  }, [axis.position, axis.id])

  const [axisDimensions, setAxisDimensions] = useAtom(axisDimensionsAtom)
  const [axisDimension] = useAtom(axisDimensionAtom)

  const isLooping = useIsLooping()

  const measureDimensions = React.useCallback(() => {
    if (!elRef.current) {
      return
    }

    let gridSize = !axis.isVertical
      ? gridDimensions.gridWidth
      : gridDimensions.gridHeight

    const unrotatedLabelDims = Array.from(
      elRef.current.querySelectorAll('.Axis.unrotated .tickLabel')
    ).map(el => getElBox(el))

    // Determine the largest labels on the axis
    let widestLabel: typeof unrotatedLabelDims[number] | undefined

    unrotatedLabelDims.forEach(label => {
      let resolvedLabel = label ?? unrotatedLabelDims[0]
      if (label.width > 0 && label.width > resolvedLabel.width) {
        widestLabel = label
      }
    })

    let smallestTickGap = gridSize

    if (unrotatedLabelDims.length > 1) {
      unrotatedLabelDims.forEach((current, i) => {
        const prev = unrotatedLabelDims[i - 1]

        if (prev) {
          smallestTickGap = Math.min(
            smallestTickGap,
            axis.isVertical ? current.top - prev.top : current.left - prev.left
          )
        }
      })
    }

    const shouldRotate =
      (widestLabel?.width || 0) + axis.tickPadding > smallestTickGap

    if (!isLooping) {
      // Rotate ticks for non-time horizontal axes
      if (!axis.isVertical) {
        setShowRotated(shouldRotate)
      }
    }
  }, [
    elRef,
    axis.isVertical,
    axis.tickPadding,
    gridDimensions.gridWidth,
    gridDimensions.gridHeight,
    isLooping,
    setShowRotated,
  ])

  // Measure after if needed
  useIsomorphicLayoutEffect(() => {
    measureDimensions()
  })

  useIsomorphicLayoutEffect(() => {
    if (!elRef.current) {
      if (axisDimension) {
        // If the entire axis is hidden, then we need to remove the axis dimensions
        setAxisDimensions(old => {
          const newAxes = { ...(old[axis.position] ?? {}) }

          delete newAxes[axis.id!]

          return {
            ...old,
            [axis.position]: newAxes,
          }
        })
      }
      return
    }

    const newDimensions = {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }

    const domainEl = elRef.current.querySelector(
      `.Axis.${showRotated ? 'rotated' : 'unrotated'} .domain`
    )

    if (!domainEl) {
      return
    }

    const domainDims = getElBox(domainEl)

    const measureDims = showRotated
      ? Array.from(
          elRef.current.querySelectorAll('.Axis.rotated .tickLabel')
        ).map(el => getElBox(el))
      : Array.from(
          elRef.current.querySelectorAll('.Axis.unrotated .tickLabel')
        ).map(el => getElBox(el))

    // Determine the largest labels on the axis
    let widestRealLabel = measureDims[0]
    let tallestRealLabel = measureDims[0]

    measureDims.forEach(d => {
      if (d.width > 0 && d.width > widestRealLabel.width) {
        widestRealLabel = d
      }

      if (d.height > 0 && d.height > tallestRealLabel.height) {
        tallestRealLabel = d
      }
    })

    // Axis overflow measurements
    if (!axis.isVertical) {
      if (measureDims.length) {
        const leftMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.left < d.left ? labelDim : d
        )
        const rightMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.right > d.right ? labelDim : d
        )

        newDimensions.left = Math.round(
          Math.max(0, domainDims.left - leftMostLabelDim?.left)
        )

        newDimensions.right = Math.round(
          Math.max(0, rightMostLabelDim?.right - domainDims.right)
        )
      }

      newDimensions.height = Math.round(
        Math.max(axis.tickSizeInner, axis.tickSizeOuter) +
          axis.tickPadding +
          (tallestRealLabel?.height ?? 0)
      )
    } else {
      if (measureDims.length) {
        const topMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.top < d.top ? labelDim : d
        )

        const bottomMostLabelDim = measureDims.reduce((d, labelDim) =>
          labelDim.bottom > d.bottom ? labelDim : d
        )

        newDimensions.top = Math.round(
          Math.max(0, domainDims.top - topMostLabelDim?.top)
        )

        newDimensions.bottom = Math.round(
          Math.max(0, bottomMostLabelDim?.bottom - domainDims.bottom)
        )
      }

      newDimensions.width = Math.round(
        Math.max(axis.tickSizeInner, axis.tickSizeOuter) +
          axis.tickPadding +
          (widestRealLabel?.width ?? 0)
      )
    }

    // Only update the axisDimensions if something has changed
    if (
      !axisDimensions ||
      !axisDimension ||
      Object.keys(newDimensions).some(key => {
        // @ts-ignore
        return newDimensions[key] !== axisDimension[key]
      })
    ) {
      setAxisDimensions(old => ({
        ...old,
        [axis.position]: {
          ...(old[axis.position] ?? {}),
          [axis.id!]: newDimensions,
        },
      }))
    }
  })
}
