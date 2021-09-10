import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
// import { $ } from '@core/dom'
import { resizeTable } from './table.resize'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    // console.log(this)
    resizeTable(event, this)
  }
}
