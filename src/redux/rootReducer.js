import * as type from './types'

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case type.TABLE_RESIZE_COL:
      prevState = state.colState || {}
      prevState[action.data.id] = action.data.value
      return { ...state, colState: { ...prevState } }

    case type.TABLE_RESIZE_ROW:
      prevState = state.rowState || {}
      prevState[action.data.id] = action.data.value
      return { ...state, rowState: { ...prevState } }
    default:
      return state
  }
}
