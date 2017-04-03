export function hoverSeries (series) {
  this.props.dispatch(state => ({
    ...state,
    hovered: series ? {
      active: true,
      series,
      datums: null,
      single: false
    } : {
      ...state.hovered,
      active: false
    }
  }))
}

export function hoverDatum (datum) {
  this.props.dispatch(state => ({
    ...state,
    hovered: datum ? {
      active: true,
      series: null,
      datums: [datum],
      single: true
    } : {
      ...state.hovered,
      active: false
    }
  }))
}
