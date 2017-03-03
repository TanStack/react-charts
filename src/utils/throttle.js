export default (func, time = 16) => {
  let timeout
  return (...args) => {
    if (timeout) return
    timeout = setTimeout(() => {
      func(...args)
      timeout = false
    }, time)
  }
}
