export function hoverSeries(series, { setChartState }) {
  setChartState(state => ({
    ...state,
    hovered: series
      ? {
        active: true,
        series,
        datums: [],
        single: false
      }
      : {
        ...state.hovered,
        active: false
      }
  }))
}

export function hoverDatum(datum, { setChartState }) {
  setChartState(state => ({
    ...state,
    hovered: datum
      ? {
        active: true,
        series: null,
        datums: [datum],
        single: true
      }
      : {
        ...state.hovered,
        active: false
      }
  }))
}

export function selectSeries(series, { setChartState }) {
  setChartState(state => ({
    ...state,
    selected: series
      ? {
        active: true,
        series,
        datums: [],
        single: false
      }
      : {
        active: false
      }
  }))
}

export function selectDatum(datum, { setChartState }) {
  setChartState(state => ({
    ...state,
    selected: datum
      ? {
        active: true,
        series: null,
        datums: [datum],
        single: true
      }
      : {
        active: false
      }
  }))
}
