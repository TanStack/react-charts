import React from 'react'
//
import { ChartConnect } from '../utils/Context'
import Selectors from '../utils/Selectors'

import updateScale from './AxisPie.updateScale'

// const fontSize = 10

export const positionTop = 'top'
export const positionRight = 'right'
export const positionBottom = 'bottom'
export const positionLeft = 'left'

class AxisPie extends React.Component {
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
    this.updateScale = updateScale.bind(this)
  }
  componentDidMount () {
    this.updateScale(this.props)
  }
  componentDidUpdate (oldProps) {
    // If any of the following change,
    // we need to update the axis
    if (
      this.props.materializedData !== oldProps.materializedData ||
      this.props.height !== oldProps.height ||
      this.props.width !== oldProps.width
    ) {
      this.updateScale(this.props)
    }

    if (this.props.stackData !== oldProps.stackData) {
      this.updateStackData(this.props)
    }
  }
  render () {
    // TODO: This is where permanent labels and lines will be drawn
    return null
  }
}

export default ChartConnect(() => {
  const selectors = {
    gridWidth: Selectors.gridWidth(),
    gridHeight: Selectors.gridHeight(),
  }
  return state => ({
    materializedData: state.materializedData,
    width: selectors.gridWidth(state),
    height: selectors.gridHeight(state),
  })
})(AxisPie)
