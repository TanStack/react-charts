export function buildStyleGetters(series, defaults) {
  series.getStatusStyle = (focused, decorator) => {
    const status = getStatus(series, focused)
    series.style = getStatusStyle(series, status, decorator, defaults)
    return series.style
  }

  // We also need to decorate each datum in the same fashion
  series.datums.forEach(datum => {
    datum.getStatusStyle = (focused, decorator) => {
      const status = getStatus(datum, focused)
      datum.style = getStatusStyle(datum, status, decorator, defaults)
      return datum.style
    }
  })
}

function getStatusStyle(item, status, decorator, defaults) {
  if (item.series) {
    defaults = {
      ...defaults,
      ...item.series.style,
    }
  }

  return materializeStyles(
    decorator({
      ...item,
      ...status,
    }),
    defaults
  )
}

function getStatus(item, focused) {
  const status = {
    focused: false,
    otherFocused: false,
  }

  if (!focused) {
    return status
  }

  // If the item is a datum
  if (typeof item.primary !== 'undefined') {
    const length = focused.group.length
    for (let i = 0; i < length; i++) {
      if (
        focused.group[i].seriesId === item.series.id &&
        focused.group[i].index === item.index
      ) {
        status.focused = true
        break
      }
    }
    status.otherFocused = !status.focused
    // For series
  } else if (focused.series) {
    status.focused = focused.series.id === item.id
    status.otherFocused = !status.focused
  }

  return status
}

function normalizeColor(style, defaults) {
  return {
    ...style,
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color,
  }
}

const elementTypes = ['area', 'line', 'rectangle', 'circle']
function materializeStyles(style = {}, defaults = {}) {
  style = normalizeColor(style, defaults)
  for (let i = 0; i < elementTypes.length; i++) {
    const type = elementTypes[i]
    if (style[type] && defaults[type]) {
      style[type] = materializeStyles(style[type], defaults)
    }
  }
  return style
}

export function isValidPoint(d) {
  if (d === null) {
    return false
  }
  if (typeof d === 'undefined') {
    return false
  }
  if (typeof d === 'string' && d === 'null') {
    return false
  }
  return true
}

export function getClosestPoint(position, datums) {
  if (!datums || !position || !datums.length) {
    return
  }
  let closestDistance = Infinity
  let closestDatum = datums[0]
  datums.forEach(datum => {
    datum.boundingPoints.forEach(pointerPoint => {
      const distance = Math.sqrt(
        (pointerPoint.x - position.x) ** 2 + (pointerPoint.y - position.y) ** 2
      )
      if (distance < closestDistance) {
        closestDistance = distance
        closestDatum = datum
      }
    })
  })
  return closestDatum
}

export function getAxisByAxisId(axes, AxisId) {
  return axes.find(d => d.id === AxisId) || axes[0]
}

export function getAxisIndexByAxisId(axes, AxisId) {
  const index = axes.findIndex(d => d.id === AxisId)
  return index > -1 ? index : 0
}

export function translateX(x) {
  return `translate3d(${Math.round(x)}px, 0, 0)`
}

export function translateY(y) {
  return `translate3d(0, ${Math.round(y)}px, 0)`
}

export function translate(x, y) {
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
}

export function identity(d) {
  return d
}

export function functionalUpdate(updater, old) {
  return typeof updater === 'function' ? updater(old) : updater
}

export function round(num, step, rounder = Math.round) {
  return rounder(rounder(num / step) * step)
}
