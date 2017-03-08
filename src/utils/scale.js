import { scaleLinear } from 'd3-scale'
//

export default ({
  data,
  axis,
  width,
  height,
  getX,
  getY,
  children
}) => {
  const getter = axis === 'y' ? getY : getX
  const vals = []

  data.forEach(series => {
    series.forEach(d => {
      vals.push(getter(d))
    })
  })

  const min = Math.min(...vals)
  const max = Math.max(...vals)

  const domain = [min, max]
  const range = axis === 'y' ? [height, 0] : [0, width]

  return scaleLinear()
    .domain(domain)
    .range(range)
    .nice()
}
