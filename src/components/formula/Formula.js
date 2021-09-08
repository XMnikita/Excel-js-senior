import { ExcelComponent } from '../../core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    })
  }

  toHTML() {
    return ` <div class="info">fx</div>
    <div class="input" contenteditable="true"></div>
    `
  }

  onInput() {
    console.log(this.$root)
    console.log('Formula On Input: ', event.target)
  }

  onClick() {
    console.log('Formula click ', event.target)
  }
}
