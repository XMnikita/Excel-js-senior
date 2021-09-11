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
      listeners: ['mousedown', 'click'],
    })
    this.selectTable = new TableSelection($root)
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    // console.log(this)
    resizeTable(event, this)
  }

  onClick(event) {
    if (event.target.dataset.cell === 'true') {
      // console.log(this.selectTable)
      this.selectTable.selectCol(event, event.target)
    }
  }
}
