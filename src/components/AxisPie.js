import { Component } from 'react'
import { Connect } from 'react-state'
import { arc as makeArc, pie as makePie } from 'd3-shape'
//
import Selectors from '../utils/Selectors'

// const fontSize = 10

export const positionTop = 'top'
export const positionRight = 'right'
export const positionBottom = 'bottom'
export const positionLeft = 'left'

class AxisPie extends Component {
  static defaultProps = {
    tickArguments: [],
    tickValues: null,
    tickFormat: null,
    tickSizeInner: 6,
    tickSizeOuter: 6,
    tickPadding: 3,
    cutoutPercentage: 0.5,
    outerPadding: 10,
    cornerRadius: 1,
    arcPadding: 0.2,
    seriesPadding: 0.2,
  }
  // Lifecycle
  constructor () {
    super()
    this.updateScale = this.updateScale.bind(this)
  }
  componentWillReceiveProps (newProps) {
    const oldProps = this.props

    // If any of the following change,
    // we need to update the axis
    if (
      newProps.materializedData !== oldProps.materializedData ||
      newProps.height !== oldProps.height ||
      newProps.width !== oldProps.width
    ) {
      this.updateScale(newProps)
    }
  }
  componentDidMount () {
    this.updateScale(this.props)
  }
  shouldComponentUpdate (newProps) {
    if (newProps.axis !== this.props.axis) {
      return true
    }
    return false
  }
  updateScale (props) {
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
    const radius = Math.min(midX, midY) - outerPadding

    const outerRadius = radius
    const innerRadius = radius * cutoutPercentage
    const totalRadius = outerRadius - innerRadius
    const seriesRadius = totalRadius / materializedData.length
    const arcPaddingRadius = outerRadius * arcPadding * 20
    const seriesPaddingRadius = totalRadius * seriesPadding / 2.5
    const padAngle = 0.01

    const data = materializedData.map(series => {
      const seriesInnerRadius = innerRadius + seriesRadius * series.index
      const seriesOuterRadius = seriesRadius + seriesInnerRadius
      const preData = series.data.map(d => ({
        x: d.primary,
        y: d.secondary,
      }))
      const pie = makePie()
        .sort(null)
        .padAngle(padAngle)
        .value(d => d.y)
      const pieData = pie(preData)
      return pieData.map(d => {
        const arcData = {
          startAngle: d.startAngle,
          endAngle: d.endAngle,
          padAngle: d.padAngle,
          padRadius: arcPaddingRadius,
          innerRadius: seriesInnerRadius + seriesPaddingRadius,
          outerRadius: seriesOuterRadius,
          cornerRadius,
        }
        // Calculate the arc for the centroid
        const arc = makeArc()
          .startAngle(arcData.startAngle)
          .endAngle(arcData.endAngle)
          .padAngle(arcData.padAngle)
          .padRadius(arcPaddingRadius)
          .innerRadius(seriesInnerRadius + seriesPaddingRadius)
          .outerRadius(seriesOuterRadius)
          .cornerRadius(cornerRadius)
        const centroid = arc.centroid()
        return {
          x: centroid[0] + midX,
          y: centroid[1] + midY,
        }
      })
    })

    const primaryScale = d =>
      data[d.seriesIndex] ? (data[d.seriesIndex][d.index] ? data[d.seriesIndex][d.index] : 0) : 0
    const secondaryScale = d =>
      data[d.seriesIndex] ? (data[d.seriesIndex][d.index] ? data[d.seriesIndex][d.index] : 0) : 0
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
      arcPaddingRadius,
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
  render () {
    // TODO: This is where permanent labels and lines will be drawn
    return null
  }
}

export default Connect(
  () => {
    const selectors = {
      gridWidth: Selectors.gridWidth(),
      gridHeight: Selectors.gridHeight(),
    }
    return state => ({
      materializedData: state.materializedData,
      width: selectors.gridWidth(state),
      height: selectors.gridHeight(state),
    })
  },
  {
    filter: (oldState, newState, meta) => meta.type !== 'cursor',
  }
)(AxisPie)
