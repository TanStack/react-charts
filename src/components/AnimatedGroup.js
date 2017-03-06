import React from 'react'
import { TransitionMotion, spring } from 'react-motion'

export default React.createClass({
  getDefaultProps () {
    return {
      data: [],
      stagger: false
    }
  },
  render () {
    const {
      data,
      stagger,
      getKey,
      willEnter,
      willLeave,
      style
    } = this.props

    const resolvedStyles = prevInter => data.map((_, i) => {
      let prevIndex = i - 1
      let prevItem = prevInter ? prevInter[prevIndex] : null
      let d = data[i]
      return stagger && i > 0 ? {
        key: getKey(d, i),
        style: style(prevItem, prevIndex, spring),
        data: d
      } : {
        key: getKey(d, i),
        style: style(d, i, spring),
        data: d
      }
    })

    return (
      <TransitionMotion
        {...this.props}
        styles={resolvedStyles}
        willEnter={(...args) => willEnter(...args, spring)}
        willLeave={(...args) => willLeave(...args, spring)}
      />
    )
  }
})
