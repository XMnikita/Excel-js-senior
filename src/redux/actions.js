import { TABLE_RESIZE_COL, TABLE_RESIZE_ROW } from './types'

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
