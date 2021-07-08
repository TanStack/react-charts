import * as React from 'react'

import { ChartContextValue } from '../types'

const chartContext = React.createContext<any>(null!)

export function ChartContextProvider<TDatum>({
  value,
  children,
}: {
  value: () => ChartContextValue<TDatum>
  children: React.ReactNode
}) {
  return <chartContext.Provider value={value} children={children} />
}

export default function useChartContext<TDatum>() {
  return React.useContext(chartContext)() as ChartContextValue<TDatum>
}
