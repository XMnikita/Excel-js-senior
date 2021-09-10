import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  toHTML() {
    return createTable(25)
  }

  onMousedown(event) {
    if (event.target.dataset.resize === 'col') {
      // Started const and elements
      const excelScrol = document.querySelector('.excel__table')
      const startX = event.pageX + excelScrol.scrollLeft
      const $resizer = $(event.target)
      const $column = $resizer.getClosestElement(
        '[data-parent_column = "parentColumn"]'
      )

      // Styles for resize like GoogleExcel
      $column.editStyle('position', 'inherit')
      $resizer.editStyle('zIndex', 2000)
      $resizer.editStyle('left', startX + 'px')

      document.onmousemove = (ev) => {
        const value = ev.pageX + excelScrol.scrollLeft + 'px'
        $resizer.editStyle('left', value)
      }

      document.onmouseup = (ev) => {
        document.onmousemove = null
        const currWidt = $column.$el.offsetWidth
        const value =
          currWidt + ev.pageX + excelScrol.scrollLeft - startX + 'px'
        $column.editStyle('width', value)

        // For resize all columns under HeaderColumn
        const colId = $column.$el.innerText.charCodeAt() - 64

        document
          .querySelectorAll(`[data-resize = "col${colId}"]`)
          .forEach((el) => (el.style.width = value))

        $column.editStyle('position', 'relative')
        $resizer.editStyle('left', 'auto')

        document.onmouseup = null
      }
    } else if (event.target.dataset.resize === 'row') {
      // Started const and elements
      const excelScrol = document.querySelector('.excel__table')
      const startY = event.pageY + excelScrol.scrollTop - 98
      const $resizer = $(event.target)
      const $parentRow = $resizer.getClosestElement(
        '[data-parent_row = "parentRow"]'
      )
      const $row = $resizer.getClosestElement('[data-parent_row="mainRow"]')

      // Styles for resize like GoogleExcel
      $parentRow.editStyle('position', 'inherit')
      $resizer.editStyle('zIndex', 2000)
      $resizer.editStyle('top', startY + 'px')

      document.onmousemove = (ev) => {
        const value = ev.pageY + excelScrol.scrollTop - 98 + 'px'
        $resizer.editStyle('top', value)
      }

      document.onmouseup = (ev) => {
        document.onmousemove = null
        const currHeight = $parentRow.$el.offsetHeight
        const value =
          currHeight + ev.pageY - 98 + excelScrol.scrollTop - startY + 'px'
        $row.editStyle('height', value)

        $parentRow.editStyle('position', 'relative')
        $resizer.editStyle('top', 'auto')

        document.onmouseup = null
      }
    }
  }
}
