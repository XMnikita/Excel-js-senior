import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emiter = options.emiter

    this.store = options.store

    this.unsubscribers = []
    this.unsubStore = null

    this.prepare()
  }

  prepare() {}

  // Возвращает шаблон элемента
  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emiter.emit(event, ...args)
  }

  $sub(event, fn) {
    const unsub = this.emiter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatchStore(action) {
    this.store.dispatch(action)
  }

  $subscribeStore(fn) {
    this.unsubStore = this.store.subscribe(fn)
  }

  init() {
    this.initDOMListeners()
  }

  delete() {
    this.removeDOMListeners()

    this.unsubscribers.forEach((el) => el())
    this.unsubStore.unsubscribe()
  }
}
