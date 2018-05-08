import { Component } from 'react'
import { Connect } from 'react-state'
//
import Selectors from '../utils/Selectors'

import updateScale from './AxisPie.updateScale'

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
    this.updateScale = updateScale.bind(this)
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

    if (newProps.stackData !== oldProps.stackData) {
      this.updateStackData(newProps)
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
    filter: (oldState, newState, meta) => meta.type !== 'pointer',
  }
)(AxisPie)
