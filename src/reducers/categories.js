import _ from 'lodash'

import { UPDATE_CATEGORIES, DELETE_ALL_CATEGORIES } from '../actions'
import categoriesJson from '../components/resources/categories.json'

const { defaultCategories } = categoriesJson

const categories = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return state.map((category, index) => {
        category.value = action.labelNames[index]
        return category
      })
    case DELETE_ALL_CATEGORIES:
      // stateがdefaultCategoriesに干渉しないよう、lodashによるディープコピーをreturnする。
      return _.cloneDeep(defaultCategories)
    default:
      return state
  }
}

export default categories
