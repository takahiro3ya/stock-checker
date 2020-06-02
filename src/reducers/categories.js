import { UPDATE_CATEGORIES } from '../actions'

const categories = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return state.map((category, index) => {
        category.value = action.labelNames[index]
        return category
      })
    default:
      return state
  }
}

export default categories
