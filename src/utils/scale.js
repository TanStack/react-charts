import { scaleLinear } from 'd3-scale'
//

export default ({
  data,
  type,
  width,
  height,
  getX,
  getY
}) => {
  const getter = type === 'y' ? getY : getX
  const vals = []

  data.forEach(series => {
    series.forEach(d => {
      vals.push(getter(d))
    })
  })

  const min = Math.min(...vals)
  const max = Math.max(...vals)

  const domain = [min, max]
  const range = type === 'y' ? [height, 0] : [0, width]

  return scaleLinear()
    .domain(domain)
    .range(range)
    .nice()
}
