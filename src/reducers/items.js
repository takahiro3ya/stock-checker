import {
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  STOCK_PLUS_ITEM,
  STOCK_MINUS_ITEM,
  SORT_ITEMS_WITH_LABEL,
  SORT_ITEMS_WITH_ITEM_NAME,
  SORT_ITEMS_WITH_STOCK_FEW,
  SORT_ITEMS_WITH_STOCK_MANY,
  SORT_ITEMS_WITH_DEADLINE_SHORT,
  SORT_ITEMS_WITH_DEADLINE_LONG
} from '../actions'
import { generateUuid } from '../utils'

const items = (state = [], action) => {
  // console.log('reducer')
  // console.log(state)
  switch (action.type) {
    case CREATE_ITEM:
      const createItem = {
        categoryIndex: action.categoryIndex,
        itemName: action.itemName,
        stock: action.stock,
        selectedDate: action.selectedDate,
      }
      const itemId = generateUuid()
      // { itemId, ...createItem }は{ itemId: itemId, ...createItem }のshorthand
      return [{ itemId, ...createItem }, ...state]

    case UPDATE_ITEM:
      const updateItem = {
        itemId: action.itemId,
        categoryIndex: action.categoryIndex,
        itemName: action.itemName,
        stock: action.stock,
        selectedDate: action.selectedDate
      }
      // const otherState = state.filter(item => item.itemId !== action.itemId)
      // return state.length <= 1 ? [updateItem] : [updateItem, ...otherState]
      // 上記codeだとitemの並びが変わってしまうため下記に変更。
      return state.map(
        item => item.itemId === action.itemId ? updateItem : item
      )

    case DELETE_ITEM:
      return state.filter(item => item.itemId !== action.itemId)

    case STOCK_PLUS_ITEM:
      const plusStock = String(Number(action.stock) + 1)
      const stockPlusItem = {
        itemId: action.itemId,
        categoryIndex: action.categoryIndex,
        itemName: action.itemName,
        stock: plusStock,
        selectedDate: action.selectedDate
      }
      return state.map(
        item => item.itemId === action.itemId ? stockPlusItem : item
      )
    case STOCK_MINUS_ITEM:
      const minusStock = String(Number(action.stock) - 1)
      const stockMinusItem = {
        itemId: action.itemId,
        categoryIndex: action.categoryIndex,
        itemName: action.itemName,
        stock: minusStock,
        selectedDate: action.selectedDate
      }
      return state.map(
        item => item.itemId === action.itemId ? stockMinusItem : item
      )

    case SORT_ITEMS_WITH_LABEL:
      return [...state].sort((a, b) => (
        a.categoryIndex < b.categoryIndex ? -1 : 1
      ))
    case SORT_ITEMS_WITH_ITEM_NAME:
      return [...state].sort((a, b) => (
        a.itemName < b.itemName ? -1 : 1
      ))
    case SORT_ITEMS_WITH_STOCK_FEW:
      return [...state].sort((a, b) => (
        Number(a.stock) < Number(b.stock) ? -1 : 1
      ))
    case SORT_ITEMS_WITH_STOCK_MANY:
      return [...state].sort((a, b) => (
        Number(a.stock) > Number(b.stock) ? -1 : 1
      ))
    case SORT_ITEMS_WITH_DEADLINE_SHORT:
      return [...state].sort((a, b) => {
        // nullは末尾になるよう条件分岐
        return (
          // a NOT null  b null      結果 -1(true)  確定
          // a null      b NOT null  結果  1(true)  確定
          // a null      b null      結果  0(false)
          // a NOT null  b NOT null  結果  0(false)
          (a.selectedDate === null) - (b.selectedDate === null) ||
          // a null      b null             結果 0(false)
          // a NOT null  b NOT null  a > b  結果 1(true)  確定
          //                         a < b  結果 0(false)
          +(a.selectedDate > b.selectedDate) ||
          // a null      b null             結果  0(false) => 最終的に return 0
          // a NOT null  b NOT null  a < b  結果 -1(true)  確定
          -(a.selectedDate < b.selectedDate)
        )
      })
    case SORT_ITEMS_WITH_DEADLINE_LONG:
      return [...state].sort((a, b) => {
        // nullは末尾になるよう条件分岐(SORT_ITEMS_WITH_DEADLINE_SHORTの降順)
        return (
          (a.selectedDate === null) - (b.selectedDate === null) ||
          -(a.selectedDate > b.selectedDate) ||
          +(a.selectedDate < b.selectedDate)
        )
      })

    default:
      return state
  }
}

export default items
