import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
    })
  }

  toHTML() {
    return (
      '<input type="type/text" class="input" value="New table" />' +
      '<div class="but_left">' +
      ' <div class="button">' +
      '<i class="material-icons"> exit_to_app </i>' +
      '</div>' +
      ' <div class="button">' +
      ' <i class="material-icons"> delete_forever </i>' +
      ' </div>'
    )
  }

  onInput() {
    console.log(this.$root)
    console.log('Header On Input: ', event.target)
  }

  onClick() {
    console.log('Header click ', event.target)
  }
}
