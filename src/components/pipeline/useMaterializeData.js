import React from 'react'
//

export default ({ data }) => {
  return React.useMemo(() => {
    const materializedData = []

    // First access the data, and provide it to the context
    for (let seriesIndex = 0; seriesIndex < data.length; seriesIndex++) {
      const originalSeries = data[seriesIndex]
      const seriesId = originalSeries.id ?? seriesIndex
      const seriesLabel = originalSeries.label ?? `Series ${seriesIndex + 1}`
      const primaryAxisId = originalSeries.primaryAxisId
      const secondaryAxisId = originalSeries.secondaryAxisId
      const originalDatums = originalSeries.data
      const datums = []

      for (
        let datumIndex = 0;
        datumIndex < originalDatums.length;
        datumIndex++
      ) {
        const originalDatum = originalDatums[datumIndex]
        datums[datumIndex] = {
          originalSeries,
          seriesIndex,
          seriesId,
          seriesLabel,
          index: datumIndex,
          originalDatum,
          primary: originalDatum.primary,
          secondary: originalDatum.secondary,
          radius: originalDatum.radius,
        }
      }

      materializedData[seriesIndex] = {
        originalSeries,
        index: seriesIndex,
        id: seriesId,
        label: seriesLabel,
        primaryAxisId,
        secondaryAxisId,
        datums,
      }
    }

    return materializedData
  }, [data])
}
