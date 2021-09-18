export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case 'RESIZE_TABLE':
      prevState = state.colState || {}
      prevState[action.data.id] = action.data.value
      return { ...state, colState: { ...prevState } }

    default:
      return state
  }
}
