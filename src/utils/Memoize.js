export default function Memo (changeFn, materializer) {
  let lastParams = []
  let value

  return state => {
    const newParams = changeFn(state)
    const recompute = () => {
      lastParams = newParams
      value = materializer(...lastParams)
      return value
    }

    if (newParams.length !== lastParams.length) {
      return recompute()
    }

    for (let i = 0; i < newParams.length; i++) {
      if (newParams[i] !== lastParams[i]) {
        return recompute()
      }
    }

    return value
  }
}
