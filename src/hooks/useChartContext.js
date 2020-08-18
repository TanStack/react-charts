import React from 'react'
import useGetLatest from './useGetLatest'

const chartContext = React.createContext()

export function ChartContextProvider({ value, children }) {
  const getValue = useGetLatest(value)

  return <chartContext.Provider value={getValue} children={children} />
}

export default function useChartContext() {
  return React.useContext(chartContext)()
}
