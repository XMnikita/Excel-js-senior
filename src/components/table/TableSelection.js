// import { Table } from './Table'
import { $ } from '@core/dom'

// const styleForSelectedCol = {
//   border: 'none',
//   outline: '1px solid blue',
//   zIndex: 2,
// }

// const styleForUnSelectedCol = {
//   outline: 'none',
//   border: '1px solid #e2e3e3',
//   borderTop: 'none',
//   borderLeft: 'none',
// }

const styleClass = 'selected'

export class TableSelection {
  constructor($root) {
    this.$root = $root
    this.group = []
  }

  selectCol(isCtrl, col) {
    const $col = $(col)

    if (isCtrl) {
      if (col.dataset.selected === 'true' && this.group.length === 1) {
        return
      } else if (col.dataset.selected === 'true') {
        $col.removeClass(styleClass)
        col.dataset.selected = 'false'
        this.group.splice(
          this.group.findIndex((el) => el === col),
          1
        )
      } else if (col.dataset.selected === 'false') {
        $col.addClass(styleClass)
        col.dataset.selected = 'true'
        this.group.push(col)
      }
    } else {
      if (col.dataset.selected === 'false' && this.group.length === 0) {
        // this.group.pop()
        $col.addClass(styleClass)
        col.dataset.selected = 'true'
        this.group.push(col)
      } else if (col.dataset.selected === 'false' && this.group.length >= 1) {
        this.group.forEach((el) => {
          el.dataset.selected = 'false'
          $(el).removeClass(styleClass)
        })
        this.group = []
        $col.addClass(styleClass)
        col.dataset.selected = 'true'
        this.group.push(col)
      }
    }
  }
}
