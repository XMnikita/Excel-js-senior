import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
// import { $ } from '@core/dom'
import { resizeTable } from './table.resize'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  // static selectTable = new TableSelection(this.$root)

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown', 'input'],
      ...options,
    })
    this.selectTable = new TableSelection($root)
  }

  toHTML() {
    return createTable(20)
  }

  init() {
    super.init()

    this.selectTable.selectCol(false, this.$root.find('[data-id="1:1"]').$el)

    this.$sub('formula:input', (text) => {
      // console.log('Tablt text from formula: ', text)
      this.selectTable.current.textContent = text
    })
    this.$sub('formula:enter', () => {
      this.selectTable.current.focus()
    })

    this.$subscribeStore((state) => console.log('TableState: ', state))
  }

  onMousedown(event) {
    // console.log(this)
    resizeTable(event, this).then((data) => {
      this.$dispatchStore({ type: 'RESIZE_TABLE', data })
    })
  }

  onClick(event) {
    if (event.target.dataset.cell === 'true') {
      if (event.ctrlKey) {
        this.selectTable.selectCol(true, event.target)
      } else if (event.shiftKey) {
        this.selectTable.selectGroupCell(event.target)
      } else if (!event.ctrlKey) {
        this.selectTable.selectCol(false, event.target)
        this.$emit('table:clickCell', this.selectTable.current.textContent)
        // this.$dispatchStore({ type: '__TEST__' })
      }
    }
  }

  onKeydown(event) {
    this.selectTable.selectCellKey(event)

    const keys = [13, 9, 37, 38, 39, 40]

    const { keyCode } = event

    if (keys.includes(keyCode) && !event.shiftKey) {
      this.$emit('table:switchCell', this.selectTable.current.textContent)
    }
  }

  onInput(event) {
    this.$emit('table:input', this.selectTable.current.textContent)
  }
}
