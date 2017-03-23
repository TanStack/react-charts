import {
  scaleLinear,
  scaleLog,
  scaleTime,
  scaleBand
 } from 'd3-scale'
//
import Utils from '../utils/Utils'

const scales = {
  linear: scaleLinear,
  log: scaleLog,
  time: scaleTime,
  ordinal: scaleBand
}

export default ({
  primary,
  data,
  id,
  type,
  getSeries,
  getX,
  getY,
  invert
}) => {
  const getter = primary ? getX : getY
  const vals = []

  data.forEach(s => {
    let series = getSeries(s)
    series.forEach(d => {
      vals.push(getter(d))
    })
  })

  const min = Math.min(...vals)
  const max = Math.max(...vals)

  let domain
  if (type === 'ordinal') {
    const dedupedVals = Utils.uniq(vals)
    domain = invert ? [...dedupedVals].reverse() : dedupedVals
  } else {
    domain = invert ? [max, min] : [min, max]
  }

  const scale = scales[type]()
    .domain(domain)

  if (type !== 'ordinal') {
    scale.nice()
  }

  scale.isPrimary = !!primary
  scale.isInverted = !!invert

  return scale
}
