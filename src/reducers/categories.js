import { UPDATE_CATEGORIES, DELETE_ALL_CATEGORIES } from '../actions'

import { defaultCategories } from '../components/App'

const categories = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return state.map((category, index) => {
        category.value = action.labelNames[index]
        return category
      })
    case DELETE_ALL_CATEGORIES:
      return defaultCategories
    default:
      return state
  }
}

export default categories
