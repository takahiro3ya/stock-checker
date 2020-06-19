/**
 * Material-UI / Modal
 * https://material-ui.com/components/modal/#modal
 */
import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import lightGreen from '@material-ui/core/colors/lightGreen'

import AppContext from '../contexts/AppContext'
import { UPDATE_ITEM } from '../actions'
import DatePickers from './DatePickers'

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
  paper: {
    position: 'absolute',
    width: '90%',
    maxHeight: '95%', // 画面サイズが小さくてもはみ出ないよう設定
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #cecece',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    overflow: 'auto', // 必要に応じてscrollbarを表示
  },
  requiredInfo: {
    display: 'block', // インライン要素<span>のため、指定してtextAlignを有効化。
    textAlign: 'right',
    color: 'red',
  },
  form: {
    // form選択時の枠線の色を指定
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: lightGreen[500],
      },
    },
  },
  formCategory: {
    display: 'flex', // flex boxにより下記の配置を有効化
    alignItems: 'center', // 上下中央揃え
  },
  updateButton: {
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

const ItemUpdateForm = ({ item }) => {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [categoryIndex, setCategoryIndex] = useState(item.categoryIndex)
  const [itemName, setItemName] = useState(item.itemName)
  const [stock, setStock] = useState(item.stock)
  const [selectedDate, setSelectedDate] = useState(item.selectedDate)
  const { itemId } = item

  // error propのtypeはBooleanなので、functionだとエラーになるので注意。
  const formCategoryError = Boolean(!categoryIndex)
  const formItemNameError = Boolean(!itemName) || itemName.length > 30 ||
    /^( |　)+$/.test(itemName)
  const formStockError = Boolean(!stock) || stock < 0 || stock > 99999 ||
    !Number.isInteger(Number(stock)) // 小数ならtrue
  const formItemNameHlpTxt = itemName.length > 30
    ? '1〜30文字　Hint: 30文字以内で入力してください。'
    : /^( |　)+$/.test(itemName)
    ? '1〜30文字　Hint: 空白のみの入力はできません。'
    : '1〜30文字'
  const formStockHlpTxt = stock < 0 || stock > 99999 ||
    !Number.isInteger(Number(stock)) ?
    '0〜99999（整数）　Hint: 範囲内の整数を入力してください。' :
    '0〜99999（整数）'
  const updateBtnDisabled = formCategoryError || formItemNameError
    || formStockError || new Date(selectedDate).toString() === 'Invalid Date'

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setCategoryIndex(item.categoryIndex)
    setItemName(item.itemName)
    setStock(item.stock)
    setSelectedDate(item.selectedDate)
  }
  const handleUpdateItem = e => {
    e.preventDefault()

    dispatch({
      type: UPDATE_ITEM,
      itemId,
      categoryIndex,
      itemName,
      stock,
      selectedDate,
    })

    setStock(String(Number(stock))) // '005'など、頭に0が付与されるのを抑止。
    setOpen(false)
  }

  /**
   * ストック数の左右にある[+],[-]アイコンが押されて再描画されると、
   * 本コンポーネントの stock と item.stock に差異が発生し、
   * Modalのストック数が正しく更新されない(item.stock は更新されるが、
   * stock は更新されないため)。
   * 差異を解消するために、再描画時に item.stock が更新された場合、
   * useEffect によって setStock を実行し、stock を更新する。
   */
  useEffect(() => {
    setStock(item.stock)
  }, [item.stock])

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6">
        アイテムの変更
      </Typography>
      <Typography variant="caption" className={classes.requiredInfo}>
        * 必須項目
      </Typography>

      {/* Material-UI Grid with breakpoints
          https://material-ui.com/components/grid/#grid-with-breakpoints */}
      <Grid container spacing={2}>
        {/* Material-UI Default breakpoints
            https://material-ui.com/customization/breakpoints/#default-breakpoints */}
        {/* Grid
            1行12列として考える。breakpointごとにサイズを設定可能。
            下記の設定だと、xsサイズ以上は12列(丸々1行)、smサイズ以上は6列(1行の半分)。
            TextFieldの場合、fullWidthを設定すると空白を埋められる。 */}
        <Grid item xs={12} sm={6}>
          {/* リストから選択 */}
          <TextField
            // autoFocus={true}
            // multiline   // 認識しない(selectリストのため?)
            // rowsMax={2} // 認識しない(selectリストのため?)
            required
            fullWidth
            select
            autoComplete="off"
            id="form-category"
            label="ラベル"
            value={categoryIndex}
            onChange={e => setCategoryIndex(e.target.value)}
            helperText="リストから選択"
            error={formCategoryError}
            InputLabelProps={{
              shrink: true,
              // style: { color: 'red' },
            }}
            margin="normal"
            variant="outlined"
            className={classes.form}
          >
            {/* 選択リストをmap()で編成 */}
            {state.categories.map(category => (
              <MenuItem key={category.categoryIndex} value={category.categoryIndex}>
                <div className={classes.formCategory}>
                  <LabelImportantIcon fontSize="small" style={{ color: category.color }} />
                  {category.value}
                </div>
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            multiline
            rowsMax={3}
            id="form-item-name"
            label="アイテム名"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            helperText={formItemNameHlpTxt}
            error={formItemNameError}
            InputLabelProps={{
              shrink: true,
              // style: { color: 'red' },
            }}
            margin="normal"
            variant="outlined"
            className={classes.form}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="form-stock"
            type="number"
            label="ストック数"
            value={stock}
            onChange={e => setStock(e.target.value)}
            helperText={formStockHlpTxt}
            error={formStockError}
            style={{ marginRight: 8 }}
            InputLabelProps={{
              shrink: true,
              // style: { color: 'red' },
            }}
            margin="normal"
            variant="outlined"
            className={classes.form}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* 期限を入力するためのコンポーネント */}
          <DatePickers selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        className={classes.updateButton}
        onClick={handleUpdateItem}
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
      <IconButton aria-label="edit" size="small" onClick={handleOpen} >
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="item-update-modal"
        aria-describedby="item-update-modal-desc"
      >
        {body}
      </Modal>
    </>
  )
}

export default ItemUpdateForm
