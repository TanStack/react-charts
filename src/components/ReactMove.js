import React from 'react'
import { NodeGroup as RMNodeGroup, Animate as RMAnimate } from 'react-move'
import { easeCubicOut } from 'd3-ease'

const defaultTiming = {
  duration: 300,
  ease: easeCubicOut,
}

export const NodeGroup = ({ timing, ...rest }) => (
  <RMNodeGroup timing={{ ...defaultTiming, ...timing }} {...rest} />
)
export const Animate = ({ timing, ...rest }) => (
  <RMAnimate timing={{ ...defaultTiming, ...timing }} {...rest} />
)
