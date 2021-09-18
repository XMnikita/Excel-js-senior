export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' })

  let listeners = []

  return {
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach((element) => {
        element(state)
      })
    },

    subscribe(fn) {
      listeners.push(fn)

      return {
        unsubscribe() {
          listeners = listeners.filter((el) => el !== fn)
        },
      }
    },

    getState() {
      return state
    },
  }
}

// export class Store {
//   constructor(rootReducer) {
//     this.rootReducer = rootReducer
//     this.listeners = []
//     this.state = {}
//   }

//   dispatch(action) {
//     this.state = this.rootReducer(this.state, action)
//     this.listeners.forEach((el) => el(this.state))
//   }

//   subscribe(fn) {
//     this.listeners.push(fn)

//     return () => {
//       this.listeners = this.listeners.filter((el) => el !== fn)
//     }
//   }

//   getState() {
//     return this.state
//   }
// }
