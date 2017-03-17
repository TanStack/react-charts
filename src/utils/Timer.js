import { now } from 'd3-timer'
import raf from 'raf'

// export default function Timer (cb, duration = 1000) {
//   let instance
//
//   const stop = () => {
//     instance && instance.stop()
//     instance = null
//   }
//
//   instance = timer((elapsed) => {
//     let progress = Math.min(elapsed / duration, 1)
//     cb(progress)
//     if (progress >= 1) {
//       stop()
//     }
//   })
//
//   return stop
// }

const timer = cb => {
  let running = true
  const startTime = now()

  let step = () => {
    let current = now()

    cb(current - startTime)

    if (running) {
      raf(step)
    }
  }
  step()
  return () => {
    running = false
  }
}

let uid = 0
let stopwatch
const subscribers = {}
const loop = () => {
  let keys = Object.keys(subscribers)
  keys.forEach(key => {
    let s = subscribers[key]
    if (!s) {
      return
    }
    let progress = Math.min((now() - s.startTime) / s.duration, 1)
    s.callback(progress, s)
    if (progress >= 1) {
      s.unsubscribe()
    }
  })
  let keyLeft = Object.keys(subscribers)
  if (!keyLeft.length) {
    stopwatch()
    stopwatch = null
  }
}

export default function subscribe (callback, duration) {
  const id = uid++
  const instance = {
    id,
    startTime: now(),
    callback,
    duration,
    unsubscribe: () => {
      delete subscribers[id]
    }
  }
  subscribers[id] = instance
  if (!stopwatch) {
    stopwatch = timer(loop)
  }
  return instance.unsubscribe
}
