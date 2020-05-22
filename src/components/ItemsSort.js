/**
 * Material-UI / MenuList composition
 * https://material-ui.com/components/menus/#menulist-composition
 */
import React, { useState, useRef, useEffect } from 'react'
import SortIcon from '@material-ui/icons/Sort'
import IconButton from '@material-ui/core/IconButton'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

const ItemsSort = () => {
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
                  <MenuItem onClick={handleClose}>ラベル</MenuItem>
                  <MenuItem onClick={handleClose}>アイテム名</MenuItem>
                  <MenuItem onClick={handleClose}>ストック数: 小</MenuItem>
                  <MenuItem onClick={handleClose}>ストック数: 大</MenuItem>
                  <MenuItem onClick={handleClose}>期限: 短</MenuItem>
                  <MenuItem onClick={handleClose}>期限: 長</MenuItem>
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

