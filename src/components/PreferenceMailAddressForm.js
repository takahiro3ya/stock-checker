/**
 * Material-UI / Modal
 * https://material-ui.com/components/modal/#modal
 */
import React, { useContext, useState, useEffect } from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { lightGreen } from '@material-ui/core/colors'

import AppContext from '../contexts/AppContext'
import { UPDATE_MAIL_ADDRESS } from '../actions'

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
  buttonGrid: {
    display: 'flex',
    justifyContent: 'flex-end', // 右揃え
    alignItems: 'center',
  },
  lightGreenButton: {
    backgroundColor: lightGreen[500],
    color: '#FFF',
    '&:hover': {
      backgroundColor: lightGreen[700],
    },
  },
  mailAddress: {
    // maxWidth: docBodyWidth - 60, // コンポーネント内で管理
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  },
  paper: {
    position: 'absolute',
    width: '90%',
    maxWidth: 660,
    maxHeight: '85%', // 画面サイズが小さくてもはみ出ないよう設定
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

/**
 * 画面サイズの変更を検知するためのカスタムフック
 * ResponsiveDrawer内でstyle{ wordWrap: 'break-word' }を機能させるため、
 * 画面サイズを動的に検知するために使用。
 */
const useWindowWidth = () => {
  const getWindowWidth = () => {
    const { innerWidth: width } = window
    return { width } // {width: <width size>}
  }

  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(getWindowWidth())
    }
    window.addEventListener('resize', onResize)
    // 副作用内から関数を返してクリーンアップする。
    // https://ja.reactjs.org/docs/hooks-effect.html
    return () => window.removeEventListener('resize', onResize)
  }, [windowWidth]) // Only re-run the effect if windowWidth changes

  return windowWidth
}

const PreferenceMailAddressForm = () => {
  const { state, dispatch } = useContext(AppContext)
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false)
  const [mailAddress, setMailAddress] = useState('')
  const { width } = useWindowWidth()

  // メールアドレスformは、未入力またはメールアドレス形式の文字列のみ変更ボタンを有効化
  const reMailAddress = /^[\w.!#$%&'*+/=?^`{|}~-]+@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  const updateBtnDisabled = mailAddress === '' ? false :
    mailAddress.match(reMailAddress) === null || mailAddress.length > 256
  const formMailAddressHlpTxt = updateBtnDisabled ?
    mailAddress.length > 256 ?
      '最大256文字　Hint: 文字数の上限を超えています。' :
      '最大256文字　Hint: 未入力時、または正しい形式のメールアドレス入力時に変更ボタンが有効になります。' :
    '最大256文字'

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setMailAddress(state.preferences.mailAdress)
    setOpen(false)
  }
  const handleUpdateMailAddress = e => {
    e.preventDefault()

    dispatch({
      type: UPDATE_MAIL_ADDRESS,
      mailAddress
    })

    setOpen(false)
  }
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h6" style={{ marginBottom: 10 }}>
        メールアドレスの変更
      </Typography>

      <TextField
        autoFocus={true}
        // required
        fullWidth
        multiline
        rowsMax={4}
        id="form-mail-address"
        label="メールアドレス"
        type="email"
        value={mailAddress}
        onChange={e => setMailAddress(e.target.value)}
        helperText={formMailAddressHlpTxt}
        error={updateBtnDisabled}
        InputLabelProps={{
          shrink: true,
          style: { color: '#595959' },
        }}
        margin="normal"
        variant="outlined"
        className={classes.form}
      />

      <Button
        variant="contained"
        className={classes.addButton}
        onClick={handleUpdateMailAddress}
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
      <Grid item xs={8}>
        <Typography variant="overline">
          メールアドレス
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.buttonGrid}>
        <Button
          size="small"
          variant="contained"
          className={classes.lightGreenButton}
          startIcon={<EditIcon />}
          onClick={handleOpen}
        >
          <strong>変更</strong>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.mailAddress}
          style={{ maxWidth: width - 60 }}
        >
          {/* アドレスが undefined, '', null の場合は「未登録」と表示 */}
          {state.preferences.mailAdress || '未登録'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="mail-address-form-modal"
        aria-describedby="mail-address-form-modal-desc"
      >
        {body}
      </Modal>
    </>
  )
}

export default PreferenceMailAddressForm

