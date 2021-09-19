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

    case type.TABLE_INPUT_TEXT:
      // console.log(action)
      prevState = state.cellState || {}
      prevState[action.data.id] = action.data.value.trimLeft().trimRight()
        ? action.data.value
        : ''
      return {
        ...state,
        cellState: { ...prevState },
        currentText: action.data.value.trim() ? action.data.value : '',
      }
    default:
      return state
  }
}
