const CODES = {
  A: 65,
  Z: 90,
}

function toCell() {
  return `
  <div class="cell" contenteditable="true">
  </div>
  `
}

function createRow(content, index = '') {
  return `
  <div class= "row">
    <div class = "row-info">${index}</div>
    <div class = "row-data">${content}</div>
  </div>`
}

function toColumn(element) {
  return `
  <div class="column">${element}</div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols1 = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')

  rows.push(createRow(cols1))

  const cols2 = new Array(colsCount).fill('').map(toCell).join('')

  for (let i = 1; i <= rowCount; i++) {
    rows.push(createRow(cols2, i))
  }

  return rows.join('')
}
