export function hoverSeries (series) {
  this.props.dispatch(state => ({
    ...state,
    hovered: series
      ? {
        active: true,
        series,
        datums: [],
        single: false,
      }
      : {
        ...state.hovered,
        active: false,
      },
  }))
}

export function hoverDatum (datum) {
  this.props.dispatch(state => ({
    ...state,
    hovered: datum
      ? {
        active: true,
        series: null,
        datums: [datum],
        single: true,
      }
      : {
        ...state.hovered,
        active: false,
      },
  }))
}

export function selectSeries (series) {
  this.props.dispatch(state => ({
    ...state,
    selected: series
      ? {
        active: true,
        series,
        datums: [],
        single: false,
      }
      : {
        active: false,
      },
  }))
}

export function selectDatum (datum) {
  this.props.dispatch(state => ({
    ...state,
    selected: datum
      ? {
        active: true,
        series: null,
        datums: [datum],
        single: true,
      }
      : {
        active: false,
      },
  }))
}
