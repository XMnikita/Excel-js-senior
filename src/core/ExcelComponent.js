import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emiter = options.emiter

    this.unsubscribers = []

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

  init() {
    this.initDOMListeners()
  }

  delete() {
    this.removeDOMListeners()

    this.unsubscribers.forEach((el) => el())
  }
}
