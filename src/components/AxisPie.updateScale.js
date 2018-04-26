import { arc as makeArc, pie as makePie } from 'd3-shape'

export default function updateScale (props) {
  const {
    type,
    id,
    materializedData,
    cutoutPercentage,
    width,
    height,
    dispatch,
    outerPadding,
    cornerRadius,
    arcPadding,
    seriesPadding,
  } = props
  // We need the data to proceed
  if (!materializedData) {
    return
  }

  const midX = width / 2
  const midY = height / 2
  const radius = Math.max(Math.min(midX, midY) - outerPadding, 0)

  const outerRadius = radius
  const innerRadius = radius * cutoutPercentage
  const totalRadius = outerRadius - innerRadius
  const seriesRadius = totalRadius / materializedData.length
  const padRadius = outerRadius * arcPadding * 20
  const seriesPaddingRadius = totalRadius * seriesPadding / 2.5
  const padAngle = 0.01

  const data = materializedData.map(series => {
    const seriesInnerRadius = innerRadius + seriesRadius * series.index
    const seriesOuterRadius = seriesRadius + seriesInnerRadius

    const pie = makePie()
      .sort(null)
      .padAngle(padAngle)
      .value(d => d.secondary)

    const pieData = pie(series.datums)

    return pieData.map(d => {
      const arcData = {
        startAngle: d.startAngle,
        endAngle: d.endAngle,
        padAngle: d.padAngle,
        padRadius,
        innerRadius: seriesInnerRadius + seriesPaddingRadius,
        outerRadius: seriesOuterRadius,
        cornerRadius,
        seriesPaddingRadius,
      }
      // Calculate the arc for the centroid
      const arc = makeArc()
        .startAngle(arcData.startAngle)
        .endAngle(arcData.endAngle)
        .padAngle(arcData.padAngle)
        .padRadius(arcData.padRadius)
        .innerRadius(arcData.innerRadius)
        .outerRadius(arcData.outerRadius)
        .cornerRadius(arcData.cornerRadius)

      const centroid = arc.centroid()

      return {
        arcData,
        arc,
        x: centroid[0] + midX,
        y: centroid[1] + midY,
      }
    })
  })

  const primaryScale = d =>
    data[d.seriesIndex] ? (data[d.seriesIndex][d.index] ? data[d.seriesIndex][d.index] : 0) : 0
  const secondaryScale = () => {}

  primaryScale.range = () => [0, width]
  secondaryScale.range = () => [height, 0]

  const primaryAxis = {
    id,
    scale: primaryScale,
    cutoutPercentage,
    type,
    primary: true,
    format: d => d,
    width,
    height,
    radius,
    cornerRadius,
    arcPadding,
    seriesPadding,
    outerRadius,
    innerRadius,
    totalRadius,
    seriesRadius,
    padRadius,
    seriesPaddingRadius,
    padAngle,
  }

  const secondaryAxis = {
    id,
    scale: secondaryScale,
    format: d => d,
    type,
  }

  dispatch(
    state => ({
      ...state,
      axes: {
        pie_primary: primaryAxis,
        pie_secondary: secondaryAxis,
      },
    }),
    {
      type: 'axisUpdateScale',
    }
  )
}
