
export default {
  get,
  mapValues
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
