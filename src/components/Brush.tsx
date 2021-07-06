import { useAtom } from 'jotai'
import React from 'react'

import { pointerAtom } from '../atoms'
import { translate } from '../utils/Utils'
import useChartContext from './Chart'

//

export default function Brush() {
  const { getOptions, gridDimensions } = useChartContext<TDatum>()
  const [pointer] = useAtom(pointerAtom)

  const brush = getOptions().brush

  if (!brush) {
    return null
  }

  return (
    <div
      className="Brush"
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        transform: translate(gridDimensions.gridX, gridDimensions.gridY),
        opacity: pointer.dragging
          ? Math.abs(pointer.startX - pointer.x) < 20
            ? 0.5
            : 1
          : 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          transform: pointer.dragging
            ? translate(Math.min(pointer.x, pointer.startX), 0)
            : ``,
          width: pointer.dragging
            ? `${Math.abs(pointer.x - pointer.startX)}px`
            : 0,
          height: `${gridDimensions.gridHeight}px`,
          background: getOptions().dark
            ? 'rgba(255,255,255,.3)'
            : 'rgba(0, 26, 39, 0.3)',
          ...brush.style,
        }}
      />
    </div>
  )
}
