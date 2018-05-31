import React from 'react'
import RAF from 'raf'

export default {
  requestAnimationFrame: RAF,
  throttle,
  getStatus,
  getStatusStyle,
  getMultiFocus,
  getClosestPoint,
  normalizeComponent,
  materializeStyles,
  normalizeGetter,
  normalizePathGetter,
  isArray,
  isValidPoint,
  getAxisByAxisID,
  getAxisIndexByAxisID,
  shallowCompare,
}

function throttle (func) {
  let running
  return (...args) => {
    if (running) return
    running = RAF(() => {
      func(...args)
      running = false
    })
  }
}

function getStatus (item, hovered, selected) {
  const status = {
    selected: false,
    hovered: false,
    otherSelected: false,
    otherHovered: false,
  }

  if (item.series) {
    let d
    if (selected && selected.active && selected.datums) {
      for (let i = 0; i < selected.datums.length; i++) {
        d = selected.datums[i]
        if (d.seriesID === item.series.id && d.index === item.index) {
          status.selected = true
          break
        }
      }
      status.otherSelected = !status.selected
    }
    if (hovered && hovered.active && hovered.datums) {
      for (let i = 0; i < hovered.datums.length; i++) {
        d = hovered.datums[i]
        if (d.seriesID === item.series.id && d.index === item.index) {
          status.hovered = true
          break
        }
      }
      status.otherHovered = !status.hovered
    }
  } else {
    if (selected && selected.active && selected.series) {
      status.selected = selected.series.id === item.id
      status.otherSelected = !status.selected
    }
    if (hovered && hovered.active && hovered.series) {
      status.hovered = hovered.series.id === item.id
      status.otherHovered = !status.hovered
    }
  }

  return status
}

function getStatusStyle (item, status, decorator, defaults) {
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

function getMultiFocus ({
  focus, points, gridX, gridY, gridWidth, gridHeight, width, height,
}) {
  const invalid = () => {
    throw new Error(
      `${JSON.stringify(
        focus
      )} is not a valid tooltip focus option. You should use a single focus option or 2 non-conflicting focus options.`
    )
  }

  let x
  let y

  let xMin = points[0].focus.x
  let xMax = points[0].focus.x
  let yMin = points[0].focus.y
  let yMax = points[0].focus.y

  points.forEach(point => {
    xMin = Math.min(point.focus.x, xMin)
    xMax = Math.max(point.focus.x, xMax)
    yMin = Math.min(point.focus.y, yMin)
    yMax = Math.max(point.focus.y, yMax)
  })

  if (focus.length > 2) {
    return invalid()
  }

  focus = focus.sort(a => (a.includes('center') || a.includes('Center') ? 1 : -1))

  for (let i = 0; i < focus.length; i++) {
    const focusPart = focus[i]

    // Horizontal Positioning
    if (['left', 'right', 'gridLeft', 'gridRight', 'chartLeft', 'chartRight'].includes(focusPart)) {
      if (typeof x !== 'undefined') {
        invalid()
      }
      if (focusPart === 'left') {
        x = xMin
      } else if (focusPart === 'right') {
        x = xMax
      } else if (focusPart === 'gridLeft') {
        x = gridX
      } else if (focusPart === 'gridRight') {
        x = gridX + gridWidth
      } else if (focusPart === 'chartLeft') {
        x = 0
      } else if (focusPart === 'chartRight') {
        x = width
      } else {
        invalid()
      }
    }

    // Vertical Positioning
    if (['top', 'bottom', 'gridTop', 'gridBottom', 'chartTop', 'chartBottom'].includes(focusPart)) {
      if (typeof y !== 'undefined') {
        invalid()
      }
      if (focusPart === 'top') {
        y = yMin
      } else if (focusPart === 'bottom') {
        y = yMax
      } else if (focusPart === 'gridTop') {
        y = gridY
      } else if (focusPart === 'gridBottom') {
        y = gridY + gridHeight
      } else if (focusPart === 'chartTop') {
        y = 0
      } else if (focusPart === 'chartBottom') {
        y = height
      } else {
        invalid()
      }
    }

    // Center Positioning
    if (['center', 'gridCenter', 'chartCenter'].includes(focusPart)) {
      if (focusPart === 'center') {
        if (typeof y === 'undefined') {
          y = (yMin + yMax) / 2
        }
        if (typeof x === 'undefined') {
          x = (xMin + xMax) / 2
        }
      } else if (focusPart === 'gridCenter') {
        if (typeof y === 'undefined') {
          y = gridY + gridHeight / 2
        }
        if (typeof x === 'undefined') {
          x = gridX + gridWidth / 2
        }
      } else if (focusPart === 'chartCenter') {
        if (typeof y === 'undefined') {
          y = height / 2
        }
        if (typeof x === 'undefined') {
          x = width / 2
        }
      } else {
        invalid()
      }
    }

    // Auto center the remainder if there is only one focusPart listed
    if (focus.length === 1) {
      if (focus[0].includes('grid')) {
        focus.push('gridCenter')
      } else if (focus[0].includes('chart')) {
        focus.push('chartCenter')
      } else {
        focus.push('center')
      }
    }
  }

  return { x, y }
}

function getClosestPoint (position, datums) {
  if (!datums || !position || !datums.length) {
    return
  }
  let closestDistance = Infinity
  let closestDatum = datums[0]
  datums.forEach(datum => {
    datum.pointerPoints.forEach(pointerPoint => {
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

function normalizeComponent (Comp, params = {}, fallback = Comp) {
  return typeof Comp === 'function' ? (
    Object.getPrototypeOf(Comp).isReactComponent ? (
      <Comp {...params} />
    ) : (
      Comp(params)
    )
  ) : (
    fallback
  )
}

function normalizeColor (style, defaults) {
  return {
    ...style,
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color,
  }
}

function materializeStyles (style = {}, defaults = {}) {
  style = normalizeColor(style, defaults);
  ['area', 'line', 'rectangle', 'circle'].forEach(type => {
    style[type] = style[type] ? materializeStyles(style[type], defaults) : {}
  })
  return style
}

function normalizeGetter (getter) {
  if (!getter) {
    return
  }
  if (typeof getter === 'function') {
    return getter
  }
  return () => getter
}

function normalizePathGetter (getter) {
  if (typeof getter === 'function') {
    return getter
  }
  return d => get(d, getter)
}

function get (obj, path, def) {
  if (typeof obj === 'function') {
    try {
      return obj()
    } catch (e) {
      return path
    }
  }
  if (!path) {
    return obj
  }
  const pathObj = makePathArray(path)
  let val
  try {
    val = pathObj.reduce((current, pathPart) => current[pathPart], obj)
  } catch (e) {
    // do nothing
  }
  return typeof val !== 'undefined' ? val : def
}

function isArray (a) {
  return Array.isArray(a)
}

function makePathArray (obj) {
  return flattenDeep(obj)
    .join('.')
    .replace('[', '.')
    .replace(']', '')
    .split('.')
}

function flattenDeep (arr, newArr = []) {
  if (!isArray(arr)) {
    newArr.push(arr)
  } else {
    for (let i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr)
    }
  }
  return newArr
}

function isValidPoint (d) {
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

function getAxisByAxisID (axes, AxisID) {
  return axes.find(d => d.id === AxisID) || axes[0]
}

function getAxisIndexByAxisID (axes, AxisID) {
  const index = axes.findIndex(d => d.id === AxisID)
  return index > -1 ? index : 0
}

function shallowCompare (old = {}, _new = {}, props, ignore) {
  if (!props) {
    props = {}
    Object.keys(old).forEach(key => {
      props[key] = true
    })
    Object.keys(_new).forEach(key => {
      props[key] = true
    })
    props = Object.keys(props)
  }
  if (ignore) {
    for (let i = 0; i < props.length; i++) {
      if (!ignore.includes(props[i])) {
        if (old[props[i]] !== _new[props[i]]) {
          return props[i] || true
        }
      }
    }
  } else {
    for (let i = 0; i < props.length; i++) {
      if (old[props[i]] !== _new[props[i]]) {
        return props[i] || true
      }
    }
  }
  return false
}
