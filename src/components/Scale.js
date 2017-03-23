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
    // If scale dependencies settings change, update the scale
    if (
      newProps.primary !== oldProps.primary ||
      newProps.type !== oldProps.type ||
      newProps.id !== oldProps.id ||
      newProps.invert !== oldProps.invert ||
      newProps.data !== oldProps.data ||
      newProps.getSeries !== oldProps.getSeries ||
      newProps.getX !== oldProps.getX ||
      newProps.getY !== oldProps.getY ||
      newProps.height !== oldProps.height ||
      newProps.width !== oldProps.width
    ) {
      this.updateScale(newProps)
    }
  }
  updateScale (props) {
    const {
      id,
      data
    } = props

    if (!data) {
      return
    }

    const newScale = ScaleUtil(props)
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
    getSeries: state.getSeries,
    getX: state.getX,
    getY: state.getY,
    width: Selectors.gridWidth(state),
    height: Selectors.gridHeight(state),
    scale: state.scales && state.scales[id]
  }
})(Scale)
