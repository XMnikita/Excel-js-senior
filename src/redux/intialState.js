import { storage } from '../core/utils'

const initial = {
  colState: {},
  rowState: {},
  currentText: '',
  cellState: {},
}

export function defaulState() {
  const state = storage('excel-state') ? storage('excel-state') : initial
  storage('excel-state', state)

  return state
}
