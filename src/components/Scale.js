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
      type,
      data,
      width,
      height,
      getX,
      getY
    } = newProps

    if (
      type !== oldProps.type ||
      data !== oldProps.data ||
      width !== oldProps.width ||
      height !== oldProps.height ||
      getX !== oldProps.getX ||
      getY !== oldProps.getY
    ) {
      this.updateScale(newProps)
    }
  }
  updateScale (props) {
    const {
      type,
      data,
      width,
      height,
      getX,
      getY
    } = props
    const newScale = ScaleUtil({
      type,
      data,
      width,
      height,
      getX,
      getY
    })
    this.props.dispatch(state => ({
      scales: {
        ...state.scales,
        [type]: newScale
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

    return children
  }
}

export default Connect((state, props) => {
  const {
    type
  } = props

  return {
    data: state.data,
    width: Selectors.gridWidth(state),
    height: Selectors.gridHeight(state),
    getX: state.getX,
    getY: state.getY,
    scale: state.scales && state.scales[type]
  }
})(Scale)
