import React, { PureComponent } from 'react'
import 'javascript-detect-element-resize'
//
import Utils from '../utils/Utils'

export default function HyperResponsive (WrappedComponent) {
  return class HyperResponsive extends PureComponent {
    constructor () {
      super()
      this.state = {
        ready: false,
        width: 0,
        height: 0,
      }
      this.resize = this.resize.bind(this)
    }
    componentWillMount () {
      this.resize = Utils.throttle(this.resize, 16)
    }
    componentDidMount () {
      if (!this.resizeListener) {
        this.resizeListener = window.addResizeListener(this.el, this.resize)
      }
      this.resize()
    }
    componentWillUnmount () {
      this.resizeListener && window.removeResizeListener(this.el, this.resize)
    }
    resize (e) {
      this.setState({
        ready: true,
        width: parseInt(window.getComputedStyle(this.el).width),
        height: parseInt(window.getComputedStyle(this.el).height),
      })
    }
    render () {
      const { style, ...rest } = this.props
      const { ready, width, height } = this.state
      return (
        <div
          className='ResponsiveWrapper'
          ref={el => {
            this.el = el
          }}
          style={{
            width: '100%',
            height: '100%',
            ...style,
          }}
        >
          {ready &&
            <WrappedComponent width={width} height={height} {...rest} />}
        </div>
      )
    }
  }
}
