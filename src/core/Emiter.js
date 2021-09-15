export class Emiter {
  constructor() {
    this.listeners = {}
  }

  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) return false
    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
    return true
  }

  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter((el) => el != fn)
    }
  }
}

// const emiter = new Emiter()

// emiter.subscribe('nikitos', (...data) =>
//   console.log('nikitos event:', ...data)
// )()
// emiter.subscribe('nikitos', (data) => console.log('NIKITOS event:', data))()

// emiter.emit('nikitos', 1, 23, 4, 5)
