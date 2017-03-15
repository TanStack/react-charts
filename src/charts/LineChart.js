import React from 'react'
//
import Chart from '../components/Chart'

const getX = d => Array.isArray(d) ? d[0] : d.x
const getY = d => Array.isArray(d) ? d[1] : d.y
const getR = d => Array.isArray(d) ? d[0] : d.r

export default (props) => {
  return (
    <Chart
      type='line'
      getX={getX}
      getY={getY}
      getR={getR}
      // padding={{
      //   left: 40,
      //   right: 10,
      //   top: 10,
      //   bottom: 20
      // }}
      {...props}
    />
  )
}
