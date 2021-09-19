import { TABLE_INPUT_TEXT, TABLE_RESIZE_COL, TABLE_RESIZE_ROW } from './types'

export function tableResizeCol(data) {
  return {
    type: TABLE_RESIZE_COL,
    data,
  }
}

export function tableResizeRow(data) {
  return {
    type: TABLE_RESIZE_ROW,
    data,
  }
}

export function tableInputText(data) {
  return {
    type: TABLE_INPUT_TEXT,
    data,
  }
}
