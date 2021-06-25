import { atom } from 'jotai'

import {
  AxisDimensions,
  ChartOffset,
  Datum,
  Pointer,
  PointerUnpressed,
} from './types'

// Pointer

const initialPointer: PointerUnpressed = {
  x: 0,
  y: 0,
  dragging: false,
  svgHovered: false,
}

export const pointerAtom = atom<Pointer>(initialPointer)

// ChartOffset

const initialChartOffset: ChartOffset = {
  left: 0,
  top: 0,
}

export const chartOffsetAtom = atom(initialChartOffset)

// AxisDimensions

const initialAxisDimensions: AxisDimensions = {
  left: {},
  right: {},
  top: {},
  bottom: {},
}

export const axisDimensionsAtom = atom(initialAxisDimensions)

// FocusedDatum

export const focusedDatumAtom = atom<Datum | null>(null)
