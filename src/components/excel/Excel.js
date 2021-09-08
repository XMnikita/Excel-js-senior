import { $ } from '../../core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    // afterbegin, afterend, beforeend, beforebegin
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>Hello</h1>')
    this.$el.append(this.getRoot())

    // Добавляем события
    this.components.forEach((component) => {
      component.init()
    })

    // Удаляем события=========================
    // this.components.forEach((component) => {
    //   component.delete()
    // })
  }
}
