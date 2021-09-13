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
    if (this.group.length > 1) {
      this.group.forEach((el) => {
        el.dataset.selected = 'false'
        $(el).removeClass(styleClass)
      })
      this.group = []
      this.selectCell(lastSelectedCell, $(lastSelectedCell))
    }

    let lastI = parseInt(lastSelectedCell.dataset.id.split(':')[0])
    let lastJ = parseInt(lastSelectedCell.dataset.id.split(':')[1])
    let newI = parseInt(col.dataset.id.split(':')[0])
    let newJ = parseInt(col.dataset.id.split(':')[1])

    if (newI < lastI) [lastI, newI] = [newI, lastI]

    if (newJ < lastJ) [lastJ, newJ] = [newJ, lastJ]

    for (let i = lastI; i <= newI; i++) {
      for (let j = lastJ; j <= newJ; j++) {
        const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
        // console.log($tempCol.$el)
        this.selectCell($tempCol.$el, $tempCol)
      }
    }

    // ==============ГОВНОКОДИЩЕ==================================
    // if (newI <= lastI) {
    //   if (newJ <= lastJ) {
    //     for (let i = newI; i <= lastI; i++) {
    //       for (let j = newJ; j <= lastJ; j++) {
    //         const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
    //         // console.log($tempCol.$el)
    //         this.selectCell($tempCol.$el, $tempCol)
    //       }
    //     }
    //   } else if (newJ >= lastJ) {
    //     for (let i = newI; i <= lastI; i++) {
    //       for (let j = lastJ; j <= newJ; j++) {
    //         const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
    //         // console.log($tempCol.$el)
    //         this.selectCell($tempCol.$el, $tempCol)
    //       }
    //     }
    //   }
    // } else if (newI >= lastI) {
    //   if (newJ <= lastJ) {
    //     for (let i = lastI; i <= newI; i++) {
    //       for (let j = newJ; j <= lastJ; j++) {
    //         const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
    //         // console.log($tempCol.$el)
    //         this.selectCell($tempCol.$el, $tempCol)
    //       }
    //     }
    //   } else if (newJ >= lastJ) {
    //     for (let i = lastI; i <= newI; i++) {
    //       for (let j = lastJ; j <= newJ; j++) {
    //         const $tempCol = this.$root.find(`[data-id = "${i}:${j}"]`)
    //         // console.log($tempCol.$el)
    //         this.selectCell($tempCol.$el, $tempCol)
    //       }
    //     }
    //   }
    // }
  }

  clear() {
    this.group.forEach((el) => {
      el.dataset.selected = 'false'
      $(el).removeClass(styleClass)
    })
    this.group = []
  }

  switchCell(cell, event) {
    event.preventDefault()
    cell.$el.focus()
    this.clear()
    this.selectCell(cell.$el, cell)
  }

  selectCellKey(event) {
    if (event.shiftKey) return
    const keyCode = event.keyCode
    const lastSelectedCell = this.group[this.group.length - 1]

    let nextCell
    let i = parseInt(lastSelectedCell.dataset.id.split(':')[0])
    let j = parseInt(lastSelectedCell.dataset.id.split(':')[1])
    try {
      switch (keyCode) {
        case 13:
          nextCell = this.$root.find(`[data-id = "${++i}:${j}"]`)
          this.switchCell(nextCell, event)
          break

        case 9:
          nextCell = this.$root.find(`[data-id = "${i}:${++j}"]`)
          this.switchCell(nextCell, event)
          break

        case 37:
          nextCell = this.$root.find(`[data-id = "${i}:${--j}"]`)
          this.switchCell(nextCell, event)
          break

        case 38:
          nextCell = this.$root.find(`[data-id = "${--i}:${j}"]`)
          this.switchCell(nextCell, event)
          break

        case 39:
          nextCell = this.$root.find(`[data-id = "${i}:${++j}"]`)
          this.switchCell(nextCell, event)
          break

        case 40:
          nextCell = this.$root.find(`[data-id = "${++i}:${j}"]`)
          this.switchCell(nextCell, event)
          break

        default:
          break
      }
    } catch (error) {
      return
    }
  }
}
