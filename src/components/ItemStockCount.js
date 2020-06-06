import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

import AppContext from '../contexts/AppContext'
import { STOCK_PLUS_ITEM, STOCK_MINUS_ITEM } from '../actions'

const ItemStockCount = ({ item }) => {
  const { itemId, categoryIndex, itemName, stock, selectedDate } = item
  const { dispatch } = useContext(AppContext)

  const handleStockPlus = e => {
    e.preventDefault()

    dispatch({
      type: STOCK_PLUS_ITEM,
      itemId,
      categoryIndex,
      itemName,
      stock,
      selectedDate,
    })
  }
  const handleStockMinus = e => {
    e.preventDefault()

    dispatch({
      type: STOCK_MINUS_ITEM,
      itemId,
      categoryIndex,
      itemName,
      stock,
      selectedDate,
    })
  }

  return (
    <>
      <IconButton
        aria-label="plus"
        size="small"
        onClick={handleStockPlus}
        disabled={stock === '99999' || false}
      >
        <AddIcon />
      </IconButton>
      <Typography variant="body2" style={{ margin: 6 }}>
        {stock}
      </Typography>
      <IconButton
        aria-label="minus"
        size="small"
        onClick={handleStockMinus}
        disabled={stock === '0' || false}
      >
        <RemoveIcon />
      </IconButton>
    </>
  )
}

export default ItemStockCount

