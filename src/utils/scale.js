import { scaleLinear } from 'd3-scale'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y

export default ({
  data,
  axis,
  width,
  height
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

  return scaleLinear()
    .domain([min, max])
    .range([0, axis === 'y' ? height : width])
}
