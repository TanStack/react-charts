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
  const ctx = React.useContext(chartContext)() as ChartContextValue<TDatum>
  if (!ctx)
    throw new Error('useChartContext can only be used within a Chart Provider')
  return ctx as ChartContextValue<TDatum>
}
