let running = false
let scheduled = null
let subscribers = []

const schedule = cb => {
  const instance = setTimeout(cb, 20)
  return () => {
    clearTimeout(instance)
  }
}

const tick = () => {
  subscribers.forEach(s => s())
  if (running) {
    if (scheduled) {
      return
    }
    scheduled = schedule(() => {
      scheduled = false
      tick()
    })
  }
}

const onTick = fn => {
  subscribers.push(fn)

  if (!running) {
    running = true
    scheduled = schedule(() => {
      scheduled = false
      tick()
    })
  }

  return () => {
    subscribers = subscribers.filter(d => d !== fn)
    if (!subscribers.length) {
      running = false
      if (scheduled) {
        scheduled()
      }
    }
  }
}

export default function onResize(element, fn) {
  let hash
  const getHash = element => {
    const dims = element.getBoundingClientRect()
    return [dims.width, dims.height].join('')
  }
  const unsubscribe = onTick(() => {
    const newHash = getHash(element)
    if (newHash !== hash) {
      hash = newHash
      fn()
    }
  })

  return unsubscribe
}
