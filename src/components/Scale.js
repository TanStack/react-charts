import { Component } from 'react'
//

import ScaleUtil from '../utils/Scale'
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'

class Scale extends Component {
  constructor () {
    super()
    this.updateScale = this.updateScale.bind(this)
  }
  componentDidMount () {
    this.updateScale(this.props)
  }
  componentWillUpdate (newProps) {
    const oldProps = this.props
    const {
      primary,
      type,
      id,
      invert,
      //
      data,
      getX,
      getY,
      width,
      height
    } = newProps

    // If data, width, height, or any scale settings change, rebuild the scale
    if (
      primary !== oldProps.primary ||
      type !== oldProps.type ||
      id !== oldProps.id ||
      invert !== oldProps.invert ||
      data !== oldProps.data ||
      getX !== oldProps.getX ||
      getY !== oldProps.getY ||
      height !== oldProps.height ||
      width !== oldProps.width
    ) {
      this.updateScale(newProps)
    }
  }
  updateScale (props) {
    const {
      primary,
      id,
      type,
      invert,
      data,
      getX,
      getY
    } = props
    const newScale = ScaleUtil({
      primary,
      id,
      type,
      invert,
      data,
      getX,
      getY
    })
    // Provide the scale to the rest of the chart
    this.props.dispatch(state => ({
      scales: {
        ...state.scales,
        [id]: newScale
      }
    }))
  }
  render () {
    const {
      scale,
      children
    } = this.props

    if (!scale) {
      return null
    }

    return children || null
  }
}

export default Connect((state, props) => {
  const {
    id
  } = props

  return {
    data: state.data,
    getX: state.getX,
    getY: state.getY,
    width: Selectors.gridWidth(state),
    height: Selectors.gridHeight(state),
    scale: state.scales && state.scales[id]
  }
})(Scale)
