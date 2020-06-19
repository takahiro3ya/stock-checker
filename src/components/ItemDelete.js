import React, { useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import AppContext from '../contexts/AppContext'
import { DELETE_ITEM } from '../actions'

const ItemDelete = ({ item }) => {
  const { itemId } = item
  const { dispatch } = useContext(AppContext)

  const handleDeleteItem = e => {
    e.preventDefault()
    const result = window.confirm(`「${item.itemName}」を削除しますか？`)
    if (result) {
      dispatch({ type: DELETE_ITEM, itemId })
    }
  }

  return (
    <>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={handleDeleteItem}
      >
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default ItemDelete

