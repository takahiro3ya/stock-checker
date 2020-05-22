import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const ItemDelete = () => {
  const handleClickDeleteButton = () => {
    // if (condition) {
    //   // メールアドレスが""またはnullの場合、警告。
    // }
    const result = window.confirm(`●● を削除しますか？`)
    if (result) {
      console.log('delete')
    }
  }

  return (
    <>
      <IconButton
        aria-label="delete"
        size="small"
        onClick={handleClickDeleteButton}
      >
        <DeleteIcon />
      </IconButton>
    </>
  )
}

export default ItemDelete

