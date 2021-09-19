const CODES = {
  A: 65,
  Z: 90,
}

// function toCell(_, index) {
//   return `
//   <div class="cell" contenteditable="true" data-resize = "col${++index}"
//   data-cell="true" data-selected="false">
//   </div>
//   `
// }

function toCell(i, cells = {}) {
  return function (_, col) {
    const content = cells[`${i}:${++col}`] ? cells[`${i}:${col}`] : ''
    return `
    <div class="cell" contenteditable="true" data-resize = "col${col}"  
    data-cell="true" data-selected="false" data-id="${i}:${col}">
    ${content}
    </div>
    `
  }
}

function createRow(content, index = '') {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  return `
  <div class= "row" data-parent_row="mainRow" data-rowId = "${index}">
    <div class = "row-info" data-parent_row="parentRow">${index}
      ${resizer}
    </div>
    <div class = "row-data">${content}</div>
  </div>`
}

function toColumn(element, index) {
  return `
  <div class="column" data-parent_column="parentColumn" 
  data-resize="col${++index}">
    ${element}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols1 = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(cols1))

  // const cols2 = new Array(colsCount).fill('').map(toCell).join('')

  for (let i = 1; i <= rowCount; i++) {
    const cols2 = new Array(colsCount)
      .fill('')
      .map(toCell(i, state.cellState))
      .join('')
    rows.push(createRow(cols2, i))
  }

  return rows.join('')
}
