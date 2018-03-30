import React, { Component } from 'react'
import 'javascript-detect-element-resize'
//
import Utils from '../utils/Utils'

export default class HyperResponsive extends Component {
  constructor () {
    super()
    this.state = {
      ready: false,
      width: 0,
      height: 0,
    }
  }
  componentDidMount () {
    if (!this.resizeListener && this.el) {
      this.resizeListener = window.addResizeListener(this.el, this.resize)
    }
    this.resize()
  }
  componentWillUnmount () {
    if (this.resizeListener) {
      window.removeResizeListener(this.el, this.resize)
    }
  }
  resize = Utils.throttle(() => {
    this.setState({
      ready: true,
      width: parseInt(window.getComputedStyle(this.el).width),
      height: parseInt(window.getComputedStyle(this.el).height),
    })
  })
  handleRef = el => {
    this.el = el
  }
  render () {
    const { style, render, children } = this.props
    const { ready, width, height } = this.state

    return (
      <div
        className="ResponsiveWrapper"
        ref={this.handleRef}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
      >
        {ready
          ? (render || children)({
              width,
              height,
            })
          : null}
      </div>
    )
  }
}
