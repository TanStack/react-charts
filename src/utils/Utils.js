import React from 'react'
import { Animate } from 'react-move'
import RAF from 'raf'

Animate.defaults.immutable = false

export default {
  requestAnimationFrame: RAF,
  throttle,
  seriesStatus,
  datumStatus,
  getStatusStyles,
  getStatusStyle,
  getCenterPointOfSide,
  getClosestPoint,
  normalizeComponent,
  materializeStyles,
  normalizeGetter,
  normalizePathGetter,
  get,
  mapValues,
  uniq,
  groupBy,
  orderBy,
  isArray,
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

function seriesStatus (series, hovered, selected) {
  const status = {
    selected: false,
    hovered: false,
    otherSelected: false,
    otherHovered: false,
  }
  if (selected && selected.active && selected.series) {
    status.selected = selected.series.id === series.id
    status.otherSelected = !status.selected
  }
  if (hovered && hovered.active && hovered.series) {
    status.hovered = hovered.series.id === series.id
    status.otherHovered = !status.hovered
  }

  return status
}

function datumStatus (series, datum, hovered, selected) {
  const status = {
    selected: false,
    hovered: false,
    otherSelected: false,
    otherHovered: false,
  }

  let d
  if (selected && selected.active && selected.datums) {
    for (let i = 0; i < selected.datums.length; i++) {
      d = selected.datums[i]
      if (d.seriesID === series.id && d.index === datum.index) {
        status.selected = true
        break
      }
    }
    status.otherSelected = !status.selected
  }
  if (hovered && hovered.active && hovered.datums) {
    for (let i = 0; i < hovered.datums.length; i++) {
      d = hovered.datums[i]
      if (d.seriesID === series.id && d.index === datum.index) {
        status.hovered = true
        break
      }
    }
    status.otherHovered = !status.hovered
  }

  return status
}

function getStatusStyles (item, decorator, defaults) {
  const styles = {
    default: decorator(item),
    selected: decorator({
      ...item,
      selected: true,
    }),
    selectedHovered: decorator({
      ...item,
      selected: true,
      hovered: true,
    }),
    selectedOtherHovered: decorator({
      ...item,
      selected: true,
      otherHovered: true,
    }),
    otherSelected: decorator({
      ...item,
      otherSelected: true,
    }),
    otherSelectedHovered: decorator({
      ...item,
      otherSelected: true,
      hovered: true,
    }),
    otherSelectedOtherHovered: decorator({
      ...item,
      otherHovered: true,
      otherSelected: true,
    }),
    hovered: decorator({
      ...item,
      hovered: true,
    }),
    otherHovered: decorator({
      ...item,
      otherHovered: true,
    }),
  }
  Object.keys(styles).forEach(key => {
    styles[key] = materializeStyles(styles[key], defaults)
  })
  return styles
}

function getStatusStyle (status, styles) {
  if (status.selected) {
    if (status.hovered) {
      return styles.selectedHovered
    }
    return styles.selected
  }
  if (status.hovered) {
    return styles.hovered
  }
  return styles.default
}

function getCenterPointOfSide (position, points) {
  let xMin, xMax, yMin, yMax

  xMin = points[0].focus.x
  xMax = points[0].focus.x
  yMin = points[0].focus.y
  yMax = points[0].focus.y

  points.forEach(point => {
    xMin = Math.min(point.focus.x, xMin)
    xMax = Math.max(point.focus.x, xMax)
    yMin = Math.min(point.focus.y, yMin)
    yMax = Math.max(point.focus.y, yMax)
  })

  if (position === 'left') {
    return {
      x: xMin,
      y: (yMin + yMax) / 2,
    }
  }
  if (position === 'right') {
    return {
      x: xMax,
      y: (yMin + yMax) / 2,
    }
  }
  if (position === 'top') {
    return {
      x: (xMin + xMax) / 2,
      y: yMin,
    }
  }
  if (position === 'bottom') {
    return {
      x: (xMin + xMax) / 2,
      y: yMax,
    }
  }
  // Center
  return {
    x: (xMin + xMax) / 2,
    y: (yMin + yMax) / 2,
  }
}

function getClosestPoint (position, points) {
  let closestDistance = Infinity
  let closestPoint = points[0] || {}
  points.forEach(p => {
    const distance = Math.sqrt(
      Math.pow(p.focus.x - position.x, 2) + Math.pow(p.focus.y - position.y, 2)
    )
    if (distance < closestDistance) {
      closestDistance = distance
      closestPoint = p
    }
  })
  return closestPoint
}

function normalizeComponent (Comp, params = {}, fallback = Comp) {
  return typeof Comp === 'function'
    ? Object.getPrototypeOf(Comp).isReactComponent
        ? <Comp {...params} />
        : Comp(params)
    : fallback
}

function materializeStyles (style = {}, defaults = {}) {
  style = {
    ...style,
    fill: style.fill || style.color || defaults.fill || defaults.color,
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
  }
  ;['area', 'line', 'rectangle', 'circle'].forEach(type => {
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
  return (d, i) => get(d, getter)
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
  } catch (e) {}
  return typeof val !== 'undefined' ? val : def
}

function mapValues (obj, cb) {
  const newObj = {}
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = cb(obj[prop], prop, obj)
    }
  }
  return newObj
}

function uniq (arr) {
  return arr.filter((d, i) => arr.filter(dd => dd === d).length === 1)
}

function groupBy (xs, key) {
  return xs.reduce((rv, x, i) => {
    const resKey = typeof key === 'function' ? key(x, i) : x[key]
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : []
    rv[resKey].push(x)
    return rv
  }, {})
}

function orderBy (arr, funcs, dirs = []) {
  funcs = isArray(funcs) ? funcs : [funcs]
  return arr.sort((a, b) => {
    for (let i = 0; i < funcs.length; i++) {
      const comp = funcs[i]
      const ca = comp(a)
      const cb = comp(b)
      const desc = dirs[i] === false || dirs[i] === 'desc'
      if (ca > cb) {
        return desc ? -1 : 1
      }
      if (ca < cb) {
        return desc ? 1 : -1
      }
    }
    return dirs[0] ? a.__index - b.__index : b.__index - b.__index
  })
}

function isArray (a) {
  return Array.isArray(a)
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

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
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr)
    }
  }
  return newArr
}
