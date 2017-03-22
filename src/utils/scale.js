import {
  scaleLinear,
  scaleLog,
  scaleTime
 } from 'd3-scale'
//

const scales = {
  linear: scaleLinear,
  log: scaleLog,
  time: scaleTime
}

export default ({
  primary,
  data,
  id,
  type,
  getX,
  getY,
  invert
}) => {
  const getter = primary ? getX : getY
  const vals = []

  data.forEach(series => {
    series.forEach(d => {
      vals.push(getter(d))
    })
  })

  const min = Math.min(...vals)
  const max = Math.max(...vals)

  const domain = invert ? [max, min] : [min, max]

  const scale = scales[type]()
    .domain(domain)
    .nice()

  scale.isPrimary = !!primary
  scale.isInverted = !!invert

  return scale
}
