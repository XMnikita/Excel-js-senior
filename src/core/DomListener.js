import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root for DOMListener')
    }
    this.listeners = listeners
    this.$root = $root
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      console.log(this.$root.$el)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} is not IN ${name} Component`)
      }
      // Еоже самое что и addEventListener
      this.$root.on(listener, this[method].bind(this))
    })
  }

  removeDOMListeners() {}
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
