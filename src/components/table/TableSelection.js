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
        this.selectCell(col, $col)
      }
    } else {
      if (col.dataset.selected === 'false' && this.group.length === 0) {
        this.selectCell(col, $col)
      } else if (this.group.length >= 1) {
        this.group.forEach((el) => {
          el.dataset.selected = 'false'
          $(el).removeClass(styleClass)
        })
        this.group = []
        this.selectCell(col, $col)
      }
    }
  }

  selectCell(cell, cellDom) {
    cellDom.addClass(styleClass)
    cell.dataset.selected = 'true'
    this.group.unshift(cell)
  }

  selectGroupCell(col) {
    const lastSelectedCell = this.group[this.group.length - 1]
    console.log(this.group)
    if (this.group.length > 1) {
      this.group.forEach((el) => {
        el.dataset.selected = 'false'
        $(el).removeClass(styleClass)
      })
      this.group = []
      this.selectCell(lastSelectedCell, $(lastSelectedCell))
    }

    const lastI = parseInt(lastSelectedCell.dataset.id.split(':')[0])
    const lastJ = parseInt(lastSelectedCell.dataset.id.split(':')[1])
    const newI = parseInt(col.dataset.id.split(':')[0])
    const newJ = parseInt(col.dataset.id.split(':')[1])
    if (newI <= lastI) {
      if (newJ <= lastJ) {
        for (let i = newI; i <= lastI; i++) {
          for (let j = newJ; j <= lastJ; j++) {
            const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
            // console.log($tempCol.$el)
            this.selectCell($tempCol.$el, $tempCol)
          }
        }
      } else if (newJ >= lastJ) {
        for (let i = newI; i <= lastI; i++) {
          for (let j = lastJ; j <= newJ; j++) {
            const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
            // console.log($tempCol.$el)
            this.selectCell($tempCol.$el, $tempCol)
          }
        }
      }
    } else if (newI >= lastI) {
      if (newJ <= lastJ) {
        for (let i = lastI; i <= newI; i++) {
          for (let j = newJ; j <= lastJ; j++) {
            const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
            // console.log($tempCol.$el)
            this.selectCell($tempCol.$el, $tempCol)
          }
        }
      } else if (newJ >= lastJ) {
        for (let i = lastI; i <= newI; i++) {
          for (let j = lastJ; j <= newJ; j++) {
            const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
            // console.log($tempCol.$el)
            this.selectCell($tempCol.$el, $tempCol)
          }
        }
      }
    }
  }
}
