/**
 * Material-UI / MenuList composition
 * https://material-ui.com/components/menus/#menulist-composition
 */
import React, { useState, useRef, useEffect, useContext } from 'react'
import SortIcon from '@material-ui/icons/Sort'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import AppContext from '../contexts/AppContext'
import {
  SORT_ITEMS_WITH_LABEL,
  SORT_ITEMS_WITH_ITEM_NAME,
  SORT_ITEMS_WITH_STOCK_FEW,
  SORT_ITEMS_WITH_STOCK_MANY,
  SORT_ITEMS_WITH_DEADLINE_SHORT,
  SORT_ITEMS_WITH_DEADLINE_LONG
 } from '../actions'

const ItemsSort = () => {
  const { dispatch } = useContext(AppContext)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }
  const handleSortLabel = e => {
    e.preventDefault()
    dispatch({ type: SORT_ITEMS_WITH_LABEL })
    handleClose(e)
  }
  const handleSortItemName = e => {
    e.preventDefault()
    dispatch({ type: SORT_ITEMS_WITH_ITEM_NAME })
    handleClose(e)
  }
  const handleSortStockFew = e => {
    e.preventDefault()
    dispatch({ type: SORT_ITEMS_WITH_STOCK_FEW })
    handleClose(e)
  }
  const handleSortStockMany = e => {
    e.preventDefault()
    dispatch({ type: SORT_ITEMS_WITH_STOCK_MANY })
    handleClose(e)
  }
  const handleSortDeadlineShort = e => {
    e.preventDefault()
    dispatch({ type: SORT_ITEMS_WITH_DEADLINE_SHORT })
    handleClose(e)
  }
  const handleSortDeadlineLong = e => {
    e.preventDefault()
    dispatch({ type: SORT_ITEMS_WITH_DEADLINE_LONG })
    handleClose(e)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <>
      <IconButton
        aria-label="sort"
        size="small"
        style={{ color: 'white' }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <SortIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition disablePortal
        style={{ zIndex: 2000 }} // drawer等と重なっても最前面に表示
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {/* <MenuItem disabled>並び替え</MenuItem> */}
                  <MenuItem onClick={handleSortLabel}>ラベル</MenuItem>
                  <MenuItem onClick={handleSortItemName}>アイテム名</MenuItem>
                  <MenuItem onClick={handleSortStockFew}>ストック数: 小</MenuItem>
                  <MenuItem onClick={handleSortStockMany}>ストック数: 大</MenuItem>
                  <MenuItem onClick={handleSortDeadlineShort}>期限: 短</MenuItem>
                  <MenuItem onClick={handleSortDeadlineLong}>期限: 長</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

export default ItemsSort

