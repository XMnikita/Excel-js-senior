import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
// import { $ } from '@core/dom'
import { resizeTable } from './table.resize'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  // static selectTable = new TableSelection(this.$root)

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'click', 'keydown'],
    })
    this.selectTable = new TableSelection($root)
  }

  toHTML() {
    return createTable(20)
  }

  init() {
    super.init()

    this.selectTable.selectCol(false, this.$root.find('[data-id="1:1"]').$el)
  }

  onMousedown(event) {
    // console.log(this)
    resizeTable(event, this)
  }

  onClick(event) {
    if (event.target.dataset.cell === 'true') {
      if (event.ctrlKey) {
        this.selectTable.selectCol(true, event.target)
      } else if (event.shiftKey) {
        this.selectTable.selectGroupCell(event.target)
      } else if (!event.ctrlKey) {
        this.selectTable.selectCol(false, event.target)
      }
    }
  }

  onKeydown(event) {
    this.selectTable.selectCellKey(event)
  }
}
