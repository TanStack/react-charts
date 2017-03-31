export default {
  seriesStatus,
  datumStatus,
  getCenterPointOfSide,
  getClosestPoint,
  normalizeComponent,
  extractColor,
  normalizeGetter,
  normalizePathGetter,
  get,
  mapValues,
  uniq
}

function seriesStatus (series, hovered) {
  if (!hovered || !hovered.active || !hovered.series) {
    return {
      active: false,
      inactive: false
    }
  }
  const active = hovered.series.id === series.id

  return {
    active,
    inactive: !active
  }
}

function datumStatus (series, datum, hovered) {
  if (!hovered || !hovered.active || !hovered.datums || !hovered.datums.length) {
    return {
      active: false,
      inactive: false
    }
  }
  const active = hovered.datums.find(d => d.seriesID === series.id && d.index === datum.index)

  return {
    active,
    inactive: !active
  }
}

function getCenterPointOfSide (position, points) {
  let xMin, xMax, yMin, yMax

  xMin = points[0].x
  xMax = points[0].x
  yMin = points[0].y
  yMax = points[0].y

  points.forEach(point => {
    xMin = Math.min(point.x, xMin)
    xMax = Math.max(point.x, xMax)
    yMin = Math.min(point.y, yMin)
    yMax = Math.max(point.y, yMax)
  })

  if (position === 'center') {
    return {
      x: (xMin + xMax) / 2,
      y: (yMin + yMax) / 2
    }
  }
  if (position === 'left') {
    return {
      x: xMin,
      y: (yMin + yMax) / 2
    }
  }
  if (position === 'left') {
    return {
      x: xMax,
      y: (yMin + yMax) / 2
    }
  }
  if (position === 'top') {
    return {
      x: (xMin + xMax) / 2,
      y: yMin
    }
  }
  if (position === 'bottom') {
    return {
      x: (xMin + xMax) / 2,
      y: yMax
    }
  }
}

function getClosestPoint (point, points) {
  let closestDistance = Infinity
  let closestPoint = points.x
  points.forEach((p) => {
    const distance = Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2))
    if (distance < closestDistance) {
      closestDistance = distance
      closestPoint = p
    }
  })
  return closestPoint
}

function normalizeComponent (Comp, params = {}, fallback = Comp) {
  return typeof Comp === 'function' ? (
    Object.getPrototypeOf(Comp).isReactComponent ? (
      <Comp
        {...params}
      />
    ) : Comp(params)
  ) : fallback
}

function extractColor (style = {}) {
  if (style.color) {
    return {
      ...style,
      fill: style.fill || style.color,
      stroke: style.stroke || style.color
    }
  }
  return style
}

function normalizeGetter (getter) {
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

//
// // ########################################################################
// // Non-exported Helpers
// // ########################################################################
//

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

function isArray (a) {
  return Array.isArray(a)
}
