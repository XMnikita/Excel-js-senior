import { $ } from '@core/dom'

export function resizeTable(event, tableObj) {
  return new Promise((resolve) => {
    if (event.target.dataset.resize === 'col') {
      // Started const and elements
      const excelScrol = tableObj.$root.$el
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

        tableObj.$root.$el
          .querySelectorAll(`[data-resize = "col${colId}"]`)
          .forEach((el) => (el.style.width = value))

        $column.editStyle('position', 'relative')
        $resizer.editStyle('left', 'auto')

        document.onmouseup = null

        resolve([{ id: colId, value }, 'col'])
      }
    } else if (event.target.dataset.resize === 'row') {
      // Started const and elements
      // const excelScrol = document.querySelector('.excel__table')
      const excelScrol = tableObj.$root.$el
      const startY = event.pageY + excelScrol.scrollTop - 98
      const $resizer = $(event.target)
      const $parentRow = $resizer.getClosestElement(
        '[data-parent_row = "parentRow"]'
      )
      const $row = $resizer.getClosestElement('[data-parent_row="mainRow"]')

      //============= ЗАДАНИЕ ВЛАДИЛЕНА ============================
      // $parentRow.css({
      //   width: '200px',
      //   height: '100px',
      //   background: 'red',
      //   position: 'absolute',
      //   top: '20px',
      //   left: '20px',
      // })

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

        resolve([{ id: $row.$el.dataset.rowid, value }, 'row'])
      }
    }
  })
  // console.log(this.$root)
}

export function resizeCol(id, width) {
  const col = document.querySelectorAll(`[data-resize = 'col${id}']`)
  col.forEach((el) => {
    el.style.width = width
  })
}

export function resizeRow(id, height) {
  const row = document.querySelector(`[data-rowid = '${id}']`)
  row.style.height = height
}
