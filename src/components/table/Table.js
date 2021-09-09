import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      // listeners: ['click', 'mousedown', 'mouseup', 'mousemove'],
    })
  }

  toHTML() {
    return createTable(20)
  }

  onClick() {
    console.log('table Click')
  }

  onMousedown() {
    console.log('table mouse Down')
  }

  onMousemove() {}

  onMouseup() {}
}
