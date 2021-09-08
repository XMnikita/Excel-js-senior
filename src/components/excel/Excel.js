import { $ } from '../../core/dom'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components.forEach((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
    })

    return $root
  }

  render() {
    console.log(this.$el)
    // afterbegin, afterend, beforeend, beforebegin
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>Hello</h1>')
    this.$el.append(this.getRoot())
  }
}
