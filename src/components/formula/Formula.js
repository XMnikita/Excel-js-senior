import { ExcelComponent } from '../../core/ExcelComponent'
// import { tableInputText } from '../../redux/actions'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    })
  }

  toHTML() {
    return ` <div class="info">fx</div>
    <div class="input" contenteditable="true"></div>
    `
  }

  init() {
    super.init()

    this.$sub('table:input', (text) => {
      this.$root.find('.input').text(text)
    })

    // this.$subscribeStore((state) => {
    //   this.$root.find('.input').text(state.currentText)
    // })

    this.$sub('table:clickCell', (text) => {
      this.$root.find('.input').text(text)
    })

    this.$sub('table:switchCell', (text) => {
      this.$root.find('.input').text(text)
    })

    // this.$subscribeStore((state) => console.log('FormulaState: ', state))
  }

  onInput(event) {
    this.$emit('formula:input', event.target.textContent)

    // this.$dispatchStore(tableInputText(event.target.textContent))
  }

  onClick() {
    // console.log('Formula click ', event.target)
  }

  onKeydown(event) {
    const keysCode = [13, 9]

    if (keysCode.includes(event.keyCode)) {
      this.$emit('formula:enter')
      event.preventDefault()
    }
  }
}
