// import { Table } from './Table'
import { $ } from '@core/dom'

const styleForSelectedCol = {
  border: 'none',
  outline: '1px solid blue',
  zIndex: 2,
}

const styleForUnSelectedCol = {
  outline: 'none',
  border: '1px solid #e2e3e3',
  borderTop: 'none',
  borderLeft: 'none',
}

export class TableSelection {
  constructor($root) {
    this.$root = $root
    this.group = []
  }

  selectCol(ev, col) {
    const $col = $(col)

    if (ev.ctrlKey) {
      if (col.dataset.selected === 'true' && ev.ctrlKey) {
        $col.css(styleForUnSelectedCol)
        col.dataset.selected = 'false'
        this.group.splice(
          this.group.findIndex((el) => el === col),
          1
        )
      } else if (col.dataset.selected === 'false' && ev.ctrlKey) {
        $col.css(styleForSelectedCol)
        col.dataset.selected = 'true'
        this.group.push(col)
      }
    } else {
      if (col.dataset.selected === 'false' && this.group.length === 0) {
        $col.css(styleForSelectedCol)
        col.dataset.selected = 'true'
        this.group.push(col)
      } else if (col.dataset.selected === 'false' && this.group.length > 0) {
        this.group.forEach((el) => {
          el.dataset.selected = 'false'
          $(el).css(styleForUnSelectedCol)
        })
        this.group = []
        $col.css(styleForSelectedCol)
        col.dataset.selected = 'true'
        this.group.push(col)
      }
    }
  }
}
