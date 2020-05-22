/**
 * Material-UI / Modal
 * https://material-ui.com/components/modal/#modal
 */
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import { lightGreen } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  lightGreenButton: {
    backgroundColor: lightGreen[500],
    color: '#FFF',
    '&:hover': {
      backgroundColor: lightGreen[700],
    },
  },
  paper: {
    position: 'absolute',
    width: '90%',
    maxWidth: 660,
    maxHeight: '90%', // 画面サイズが小さくてもはみ出ないよう設定
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #cecece',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    overflow: 'auto', // 必要に応じてscrollbarを表示
  },
  form: {
    // form選択時の枠線の色を指定
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: lightGreen[500],
      },
    },
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: lightGreen[500],
    marginTop: 13,
    color: '#FFF',
    '&:hover': {
      backgroundColor: lightGreen[700],
    },
  },
  closeButton: {
    position: 'fixed',
    top: 7,
    right: 7,
  },
}))

const PreferenceCategoriesForm = props => {
  const { categories } = props
  const classes = useStyles()

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6" style={{ marginBottom: 25 }}>
        ラベル名の変更
      </Typography>

      {categories.map(category => (
        <TextField
          fullWidth
          variant="outlined"
          defaultValue={category.value}
          key={category.label}
          id={`label-${category.label}`}
          className={classes.form}
          label={<LabelImportantIcon style={{ color: category.color }} />}
        />
      ))}

      <Button
        variant="contained"
        className={classes.addButton}
        onClick={handleClose}
      >
        <strong>変更</strong>
      </Button>

      <IconButton
        aria-label="close"
        size="small"
        className={classes.closeButton}
        // size="small"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  )

  return (
    <>
      <Button
        size="small"
        variant="contained"
        className={classes.lightGreenButton}
        startIcon={<EditIcon />}
        onClick={handleOpen}
      >
        <strong>変更</strong>
      </Button>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="categories-form-modal"
          aria-describedby="categories-form-modal-desc"
        >
          {body}
      </Modal>
    </>
  )
}

export default PreferenceCategoriesForm
