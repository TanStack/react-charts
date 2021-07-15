// Super fast physics simulations for JavaScript
// Copyright 2014 Ralph Thomas
// Licensed under the Apache License, Version 2.0
// https://github.com/iamralpht/gravitas.js

// Adapted to TypeScript and customized by Tanner Linsley (@tannerlinsley)

type Solution = {
  x: (num: number) => number
  dx: (num: number) => number
}

const epsilon = 0.001

function almostEqual(a: number, b: number) {
  return a > b - epsilon && a < b + epsilon
}

function almostZero(a: number) {
  return almostEqual(a, 0)
}

export class Spring {
  private _m: number
  private _k: number
  private _c: number
  private _solution: null | Solution
  private _startTime: number
  endPosition: number

  constructor(
    init: number,
    mass: number,
    springConstant: number,
    damping: number
  ) {
    this._m = mass
    this._k = springConstant
    this._c = damping
    this._solution = null
    this.endPosition = init
    this._startTime = 0
  }

  x(dt?: number) {
    if (dt === undefined) {
      dt = (new Date().getTime() - this._startTime) / 1000.0
    }
    return this._solution
      ? this.endPosition + this._solution.x(dt)
      : this.endPosition
  }

  private dx(dt?: number) {
    if (dt === undefined) {
      dt = (new Date().getTime() - this._startTime) / 1000.0
    }
    return this._solution ? this._solution.dx(dt) : 0
  }

  setEnd(x: number, immediate?: boolean) {
    if (immediate) {
      this._solution = null
      this.endPosition = x
      this._startTime = 0
      return
    }

    const t = new Date().getTime()

    let velocity = 0
    let position = this.endPosition
    if (this._solution) {
      // Don't whack incoming velocity.
      if (almostZero(velocity))
        velocity = this._solution.dx((t - this._startTime) / 1000.0)
      position = this._solution.x((t - this._startTime) / 1000.0)
      if (almostZero(velocity)) velocity = 0
      if (almostZero(position)) position = 0
      position += this.endPosition
    }
    if (this._solution && almostZero(position - x) && almostZero(velocity)) {
      return
    }
    this.endPosition = x
    this._solution = this._solve(position - this.endPosition, velocity)
    this._startTime = t
  }

  // snap(x: number) {
  //   this._startTime = new Date().getTime()
  //   this.endPosition = x
  //   this._solution = {
  //     x() {
  //       return 0
  //     },
  //     dx() {
  //       return 0
  //     },
  //   }
  // }

  done() {
    return almostEqual(this.x(), this.endPosition) && almostZero(this.dx())
  }

  // reconfigure(mass: number, springConstant: number, damping: number) {
  //   this._m = mass
  //   this._k = springConstant
  //   this._c = damping

  //   if (this.done()) {
  //     return
  //   }
  //   this._solution = this._solve(this.x() - this.endPosition, this.dx())
  //   this._startTime = new Date().getTime()
  // }

  // springConstant() {
  //   return this._k
  // }

  // damping() {
  //   return this._c
  // }

  private _solve(initial: number, velocity: number): Solution {
    const c = this._c
    const m = this._m
    const k = this._k
    // Solve the quadratic equation; root = (-c +/- sqrt(c^2 - 4mk)) / 2m.
    const cmk = c * c - 4 * m * k
    if (cmk === 0) {
      // The spring is critically damped.
      // x = (c1 + c2*t) * e ^(-c/2m)*t
      const r = -c / (2 * m)
      const c1 = initial
      const c2 = velocity / (r * initial)
      return {
        x(t) {
          return (c1 + c2 * t) * Math.pow(Math.E, r * t)
        },
        dx(t) {
          const pow = Math.pow(Math.E, r * t)
          return r * (c1 + c2 * t) * pow + c2 * pow
        },
      }
    } else if (cmk > 0) {
      // The spring is overdamped; no bounces.
      // x = c1*e^(r1*t) + c2*e^(r2t)
      // Need to find r1 and r2, the roots, then solve c1 and c2.
      const r1 = (-c - Math.sqrt(cmk)) / (2 * m)
      const r2 = (-c + Math.sqrt(cmk)) / (2 * m)
      const c2 = (velocity - r1 * initial) / (r2 - r1)
      const c1 = initial - c2

      return {
        x(t) {
          return c1 * Math.pow(Math.E, r1 * t) + c2 * Math.pow(Math.E, r2 * t)
        },
        dx(t) {
          return (
            c1 * r1 * Math.pow(Math.E, r1 * t) +
            c2 * r2 * Math.pow(Math.E, r2 * t)
          )
        },
      }
    } else {
      // The spring is underdamped, it has imaginary roots.
      // r = -(c / 2*m) +- w*i
      // w = sqrt(4mk - c^2) / 2m
      // x = (e^-(c/2m)t) * (c1 * cos(wt) + c2 * sin(wt))
      const w = Math.sqrt(4 * m * k - c * c) / (2 * m)
      const r = -((c / 2) * m)
      const c1 = initial
      const c2 = (velocity - r * initial) / w

      return {
        x(t) {
          return (
            Math.pow(Math.E, r * t) *
            (c1 * Math.cos(w * t) + c2 * Math.sin(w * t))
          )
        },
        dx(t) {
          const power = Math.pow(Math.E, r * t)
          const cos = Math.cos(w * t)
          const sin = Math.sin(w * t)
          return (
            power * (c2 * w * cos - c1 * w * sin) +
            r * power * (c2 * sin + c1 * cos)
          )
        },
      }
    }
  }
}
