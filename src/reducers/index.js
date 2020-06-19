import { combineReducers } from 'redux'

import items from './items'
import categories from './categories'
import preferences from './preferences'

// combineReducersによって複数のreducerをひとつにまとめる。
export default combineReducers({
  items,
  categories,
  preferences
})
