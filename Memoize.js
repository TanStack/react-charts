let id = 0
const selectors = {}

export default function Memo (getter) {
  const mid = id++
  selectors[mid] = {
    params: []
  }

  return (...params) => {
    const recompute = () => {
      selectors[mid].params = params
      selectors[mid].value = getter(...params)
      return selectors[mid].value
    }

    if (params.length !== selectors[mid].params.length) {
      return recompute()
    }

    for (var i = 0; i < params.length; i++) {
      if (params[i] !== selectors[mid].params[i]) {
        return recompute()
      }
    }

    return selectors[mid].value
  }
}

// Usage

// const computeStuff = Memo((a, b, c) => {
//   return {
//     a: a,
//     b: b + 2,
//     c: {
//       id: c
//     }
//   }
// })
//
// const a = computeStuff(1, 2, 3)
// const b = computeStuff(1, 2, 3)
// console.log(a === b) // true
// const c = computeStuff(3, 2, 1)
// console.log(b === c) // false
