import { useRef } from 'use-react-hooks'

import deepEqual from './deepEqual'

export default {
  getStatus,
  getStatusStyle,
  getMultiAnchor,
  getClosestPoint,
  normalizeGetter,
  isValidPoint,
  getAxisByAxisID,
  getAxisIndexByAxisID,
  sumObjBy,
  translateX,
  translateY,
  translate,
  identity,
  hash,
  useDeepMemo,
  useWhen
  // usePrevious,
  // useDidChange,
}

function getStatus(item, focused, selected) {
  const status = {
    selected: false,
    focused: false,
    otherSelected: false,
    otherFocused: false
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
    if (focused && focused.datums) {
      for (let i = 0; i < focused.datums.length; i++) {
        d = focused.datums[i]
        if (d.seriesID === item.series.id && d.index === item.index) {
          status.focused = true
          break
        }
      }
      status.otherFocused = !status.focused
    }
  } else {
    if (selected && selected.active && selected.series) {
      status.selected = selected.series.id === item.id
      status.otherSelected = !status.selected
    }
    if (focused && focused.series) {
      status.focused = focused.series.id === item.id
      status.otherFocused = !status.focused
    }
  }

  return status
}

function getStatusStyle(item, status, decorator, defaults) {
  if (item.series) {
    defaults = {
      ...defaults,
      ...item.series.style
    }
  }

  return materializeStyles(
    decorator({
      ...item,
      ...status
    }),
    defaults
  )
}

function getMultiAnchor({ anchor, points, gridWidth, gridHeight }) {
  const invalid = () => {
    throw new Error(
      `${JSON.stringify(
        anchor
      )} is not a valid tooltip anchor option. You should use a single anchor option or 2 non-conflicting anchor options.`
    )
  }

  let x
  let y

  let xMin = points[0].anchor.x
  let xMax = points[0].anchor.x
  let yMin = points[0].anchor.y
  let yMax = points[0].anchor.y

  points.forEach(point => {
    xMin = Math.min(point.anchor.x, xMin)
    xMax = Math.max(point.anchor.x, xMax)
    yMin = Math.min(point.anchor.y, yMin)
    yMax = Math.max(point.anchor.y, yMax)
  })

  if (anchor.length > 2) {
    return invalid()
  }

  anchor = anchor.sort(a =>
    a.includes('center') || a.includes('Center') ? 1 : -1
  )

  for (let i = 0; i < anchor.length; i++) {
    const anchorPart = anchor[i]

    // Horizontal Positioning
    if (['left', 'right', 'gridLeft', 'gridRight'].includes(anchorPart)) {
      if (typeof x !== 'undefined') {
        invalid()
      }
      if (anchorPart === 'left') {
        x = xMin
      } else if (anchorPart === 'right') {
        x = xMax
      } else if (anchorPart === 'gridLeft') {
        x = 0
      } else if (anchorPart === 'gridRight') {
        x = gridWidth
      } else {
        invalid()
      }
    }

    // Vertical Positioning
    if (['top', 'bottom', 'gridTop', 'gridBottom'].includes(anchorPart)) {
      if (typeof y !== 'undefined') {
        invalid()
      }
      if (anchorPart === 'top') {
        y = yMin
      } else if (anchorPart === 'bottom') {
        y = yMax
      } else if (anchorPart === 'gridTop') {
        y = 0
      } else if (anchorPart === 'gridBottom') {
        y = gridHeight
      } else {
        invalid()
      }
    }

    // Center Positioning
    if (['center', 'gridCenter'].includes(anchorPart)) {
      if (anchorPart === 'center') {
        if (typeof y === 'undefined') {
          y = (yMin + yMax) / 2
        }
        if (typeof x === 'undefined') {
          x = (xMin + xMax) / 2
        }
      } else if (anchorPart === 'gridCenter') {
        if (typeof y === 'undefined') {
          y = gridHeight / 2
        }
        if (typeof x === 'undefined') {
          x = gridWidth / 2
        }
      } else {
        invalid()
      }
    }

    // Auto center the remainder if there is only one anchorPart listed
    if (anchor.length === 1) {
      if (anchor[0].includes('grid')) {
        anchor.push('gridCenter')
      } else {
        anchor.push('center')
      }
    }
  }

  return { x, y }
}

function getClosestPoint(position, datums) {
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

function normalizeColor(style, defaults) {
  return {
    ...style,
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color
  }
}

function materializeStyles(style = {}, defaults = {}) {
  style = normalizeColor(style, defaults)
  ;['area', 'line', 'rectangle', 'circle'].forEach(type => {
    style[type] = style[type] ? materializeStyles(style[type], defaults) : {}
  })
  return style
}

function normalizeGetter(getter) {
  if (typeof getter === 'function') {
    return getter
  }
  return d => get(d, getter)
}

function get(obj, path, def) {
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

function makePathArray(obj) {
  return flattenDeep(obj)
    .join('.')
    .replace('[', '.')
    .replace(']', '')
    .split('.')
}

function flattenDeep(arr, newArr = []) {
  if (!Array.isArray(arr)) {
    newArr.push(arr)
  } else {
    for (let i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr)
    }
  }
  return newArr
}

function isValidPoint(d) {
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

function getAxisByAxisID(axes, AxisID) {
  return axes.find(d => d.id === AxisID) || axes[0]
}

function getAxisIndexByAxisID(axes, AxisID) {
  const index = axes.findIndex(d => d.id === AxisID)
  return index > -1 ? index : 0
}

function sumObjBy(obj, str) {
  return Object.keys(obj)
    .map(key => obj[key])
    .reduce((prev, curr) => prev + curr[str] || 0, 0)
}

function translateX(x) {
  return `translate3d(${x}px, 0, 0)`
}

function translateY(y) {
  return `translate3d(0, ${y}px, 0)`
}

function translate(x, y) {
  return `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`
}

function identity(d) {
  return d
}

function hash(obj) {
  let hash = ''
  const unwrap = item => {
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        unwrap(item[i])
      }
      return
    } else if (typeof item === 'object') {
      item = Object.values(item)
      for (let i = 0; i < item.length; i++) {
        unwrap(item[i])
      }
      return
    }
    hash += item
  }
  unwrap(obj)
  return hash
}

function useDeepMemo(fn, obj) {
  const watchRef = useRef()
  const valueRef = useRef()

  const changed = !deepEqual(watchRef.current, obj)
  if (changed) {
    watchRef.current = obj
    valueRef.current = fn()
  }
  return valueRef.current
}

function useWhen(obj, when) {
  const ref = useRef()
  if (when) {
    ref.current = obj
  }
  return ref.current
}

// function usePrevious(item) {
//   const ref = useRef()
//   useEffect(() => {
//     ref.current = item
//   })
//   return ref.current
// }

// function useDidChange(obj) {
//   const prev = usePrevious(obj)
//   const changed = {}
//   Object.keys(obj).forEach(key => {
//     const prevVal = prev ? prev[key] : undefined
//     const val = obj ? obj[key] : undefined
//     if (prevVal !== val) {
//       changed[key] = [prevVal, val]
//     }
//   })
//   return changed
// }
