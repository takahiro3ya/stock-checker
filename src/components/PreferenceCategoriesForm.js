/**
 * Material-UI / Modal
 * https://material-ui.com/components/modal/#modal
 */
import React, { useContext, useState, useEffect } from 'react'
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

import AppContext from '../contexts/AppContext'
import { UPDATE_CATEGORIES } from '../actions'

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
    maxHeight: '95%', // 画面サイズが小さくてもはみ出ないよう設定
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #cecece',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    overflow: 'auto', // 必要に応じてscrollbarを表示
  },
  stringInfo: {
    display: 'block', // インライン要素<span>のため、指定してtextAlignを有効化。
    textAlign: 'right',
    marginBottom: 10,
  },
  form: {
    // form選択時の枠線の色を指定
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: lightGreen[500],
      },
    },
    marginBottom: 35,
  },
  updateButton: {
    backgroundColor: lightGreen[500],
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

const PreferenceCategoriesForm = () => {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const { state, dispatch } = useContext(AppContext)

  const initialLabelNames = [...state.categories].map(category => category.value)
  const [labelNames, setLabelNames] = useState(initialLabelNames)

  const initialHlpTxtAndErr = []
  for (let index = 0; index < 10; index++) {
    const obj = {helperText: '', error: false}
    initialHlpTxtAndErr.push(obj)
  }
  const [hlpTxtAndErr, setHlpTxtAndErr] = useState(initialHlpTxtAndErr)

  const [updateBtnDisabled, setUpdateBtnDisabled] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setLabelNames(initialLabelNames)
    setOpen(false)
  }
  const handleUpdateCategoriesName = e => {
    e.preventDefault()

    dispatch({
      type: UPDATE_CATEGORIES,
      labelNames
    })

    setOpen(false)
  }

  useEffect(() => {
    // setHlpTxtAndErr(hlpTxtAndErr.map((obj, index) => {
    /**
     * useEffect()の第2引数の配列にhlpTxtAndErrを含んでいないため、上記コードの場合は
     * 下記の警告が発生する。
     * ++++----------------
     * React Hook useEffect has a missing dependency: 'hlpTxtAndErr'.
     * Either include it or remove the dependency array. You can ...
     * ----------------++++
     * しかし意図しない挙動となってしまうため、hlpTxtAndErrを第2引数に含むことはできない。
     * そこで、setHlpTxtAndErrに渡す関数の引数に、hlpTxtAndErrをprevHlpTxtAndErrとして
     * 設定することで、該当の警告が発生しなくなる。
     */
    setHlpTxtAndErr(prevHlpTxtAndErr => prevHlpTxtAndErr.map((obj, index) => {
      if (labelNames[index].length > 15) {
        obj.helperText = 'Hint: 15文字以内で入力してください。'
        obj.error = true
      } else if (!labelNames[index]) {
        obj.helperText = 'Hint: ラベル名を入力してください。'
        obj.error = true
      } else {
        obj.helperText = ''
        obj.error = false
      }
      return obj
    }))
  }, [labelNames])

  useEffect(() => {
    setUpdateBtnDisabled(() => {
      for (const obj of hlpTxtAndErr) {
        if (obj.error) return true
      }
      return false
    })
  }, [hlpTxtAndErr])

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6" style={{ marginBottom: 10 }}>
        ラベル名の変更
      </Typography>
      <Typography variant="caption" className={classes.stringInfo}>
        最大15文字
      </Typography>

      {state.categories.map(category => {
        const caIndex = category.categoryIndex
        const handleChange = e => {
          setLabelNames(labelNames.map((labelName, index) =>
            index === Number(caIndex) ? e.target.value : labelName
          ))
        }
        return (
          <TextField
            fullWidth
            multiline
            rowsMax={3}
            variant="outlined"
            key={caIndex}
            id={`label-${caIndex}`}
            className={classes.form}
            label={<LabelImportantIcon style={{ color: category.color }} />}
            value={labelNames[caIndex]}
            onChange={handleChange}
            helperText={hlpTxtAndErr[caIndex].helperText}
            error={hlpTxtAndErr[caIndex].error}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )
      })}

      <Button
        variant="contained"
        className={classes.updateButton}
        onClick={handleUpdateCategoriesName}
        disabled={updateBtnDisabled}
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
