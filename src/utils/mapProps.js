import React from 'react'

export default (children, props) =>
  React.Children.map(children, child =>
    React.cloneElement(child, typeof props === 'function' ? props(child) : props)
  )
