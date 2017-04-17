export default function Memo (...args) {
  let getParams = (...subArgs) => subArgs
  let fn = args[0]
  if (args.length > 1) {
    getParams = args[0]
    fn = args[1]
  }
  let params = []
  let value

  return (...p) => {
    const newParams = getParams(...p)
    const recompute = () => {
      params = newParams
      value = fn(...params)
      return value
    }

    if (newParams.length !== p.length) {
      return recompute()
    }

    for (var i = 0; i < newParams.length; i++) {
      if (newParams[i] !== p[i]) {
        return recompute()
      }
    }

    return value
  }
}
