import React from 'react'
//

import Scale from '../utils/Scale'
import Connect from '../utils/Connect'
import Selectors from '../utils/Selectors'

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
})(React.createClass({
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
      const newScale = Scale({
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
  },
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
}))
