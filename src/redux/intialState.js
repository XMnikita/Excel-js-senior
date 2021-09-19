import { storage } from '../core/utils'

export function defaulState() {
  const state = storage('excel-state')
    ? storage('excel-state')
    : { colState: {}, rowState: {} }
  storage('excel-state', state)
  return state
}
