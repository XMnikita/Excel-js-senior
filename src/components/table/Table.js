import { ExcelComponent } from '../../core/ExcelComponent'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup', 'mousemove'],
    })
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    this.isMouseDown = false
    this.mouseXstart = 0
    // console.log(event.target.getAttribute('data-resize'))
    // console.log(event.target.dataset)
    if (event.target.dataset.resize === 'col') {
      this.isMouseDown = true
      this.target = event.target
      this.mouseXstart =
        event.pageX + document.querySelector('.excel__table').scrollLeft
      this.target.style.left = event.pageX - 2 + 'px'
      this.target.style.zIndex = 2000
      this.target.parentElement.style.position = 'inherit'

      // console.dir(this.target)
      // console.dir(event)
    } else {
      this.target = undefined
    }
  }

  onMousemove(event) {
    // event.target.dataset.resize === 'col'
    if (this.isMouseDown) {
      this.target.style.left =
        event.pageX -
        2 +
        document.querySelector('.excel__table').scrollLeft +
        'px'
      // console.dir(target)
      // console.dir(event)
    }
  }

  onMouseup(event) {
    if (!this.target) {
      return ''
    }
    this.isMouseDown = false

    const currWidt = this.target.parentElement.offsetWidth
    console.dir(event.target.parentElement)
    this.target.parentElement.style.width =
      currWidt +
      event.pageX +
      document.querySelector('.excel__table').scrollLeft -
      this.mouseXstart +
      'px'

    const colId = this.target.parentElement.innerText.charCodeAt() - 64

    const arr = []
    document
      .querySelectorAll(`[data-resize = "col${colId}"]`)
      .forEach((el, index) => (arr[index] = el))

    arr.map((el) => {
      el.style.width =
        currWidt +
        event.pageX +
        document.querySelector('.excel__table').scrollLeft -
        this.mouseXstart +
        'px'
    })

    this.target.parentElement.style.position = 'relative'
    this.target.style.left = 'auto'
  }
}
