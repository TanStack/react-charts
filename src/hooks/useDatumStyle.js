import React from 'react'
//
import ChartContext from '../utils/ChartContext'

export default function useDatumStyle(datum) {
  const [{ focused, getDatumStyle }] = React.useContext(ChartContext)
  return datum.getStatusStyle(focused, getDatumStyle)
}
