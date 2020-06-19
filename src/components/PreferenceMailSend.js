// import React, { useContext, useState, useEffect } from 'react'
import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
// import Divider from '@material-ui/core/Divider'
import SendIcon from '@material-ui/icons/Send'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { lightGreen } from '@material-ui/core/colors'
// import Switch from '@material-ui/core/Switch'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import { withStyles } from '@material-ui/core/styles'

import AppContext from '../contexts/AppContext'
// import { AUTO_MAIL } from '../actions'

const useStyles = makeStyles((theme) => ({
  textGrid: {
    display: 'flex', // flex boxにより下記の配置を有効化
    alignItems: 'center',     // 上下中央揃え
    // textAlign: 'center', // 複数行になる場合、2行目以降も中央揃えにする。
    marginTop: 8 // ボタンとの高さ調整
  },
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
}))

/*
# 自動メール設定機能(サーバサイド未実装のためコメントアウト)

const GreenSwitch = withStyles({
  switchBase: {
    // color: lightGreen[300],
    '&$checked': {
      color: lightGreen[500], // ONのスイッチの色
    },
    '&$checked + $track': {
      backgroundColor: lightGreen[500], // ONのバーの色
    },
  },
  checked: {},
  track: {},
})(Switch)

 */

const PreferenceMailSend = () => {
  // const { state, dispatch } = useContext(AppContext)
  const { state } = useContext(AppContext)
  const classes = useStyles()
  const { mailAddress } = state.preferences
  const noMailAddress = Boolean(!mailAddress)
  // 自動メール設定機能(サーバサイド未実装のためコメントアウト)
  // const [autoMailChecked, setAutoMailChecked] = useState(state.preferences.autoMail)

  const handleSendMailAll = e => {
    e.preventDefault()

    const result = window.confirm('「' + mailAddress +
      '」宛にメールを送信しますか？\n対象アイテム:　すべて')
    if (result) {
      console.log(state.items)
      alert('送信しました。')
    }
  }

  const handleSendMailPicked = e => {
    e.preventDefault()

    const result = window.confirm('「' + mailAddress +
      '」宛にメールを送信しますか？\n対象アイテム:　ストック数1以下 or 期限1週間後以内')
    if (result) {
      // filter()は、map()と同じで非破壊メソッド
      const itemsPickedStock = state.items.filter(item => item.stock < 2)
      itemsPickedStock.sort((a, b) => {
        // return が 0 未満      =>  a を先に表示
        //           0          =>  なにもしない
        //           0 より大きい =>  b を先に表示
        return (a.stock - b.stock)
      })
      // ストック数が1以下のアイテム
      console.log(itemsPickedStock)

      const baseDate = new Date()
      baseDate.setDate(baseDate.getDate() + 7)
      const itemsPickedDeadline = state.items.filter(
        item => new Date(item.selectedDate) < baseDate && item.selectedDate
      )
      itemsPickedDeadline.sort((a, b) => {
        return (new Date(a.selectedDate) - new Date(b.selectedDate))
      })
      // 期限が1週間後以内のアイテム
      console.log(itemsPickedDeadline)

      alert('送信しました。')
    }
  }
  /*
  # 自動メール設定機能(サーバサイド未実装のためコメントアウト)

  const handleAutoMail = e => {
    setAutoMailChecked(!autoMailChecked)
    dispatch({
      type: AUTO_MAIL,
      // プロパティ名を動的に決めるため、ブラケット表記で取得。
      [e.target.name]: e.target.checked
    })
  }

  // メールアドレスが未入力に変更されたらスイッチをoffにする。
  useEffect(() => {
    if (!mailAddress) {
      setAutoMailChecked(false)
    }
  }, [mailAddress])

   */

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="overline">
          メール通知
        </Typography>
      </Grid>

      <Grid item xs={8} sm={9} className={classes.textGrid}>
        <Typography variant="body1" gutterBottom>
          すべてのアイテム
        </Typography>
      </Grid>
      <Grid item xs={4} sm={3} className={classes.buttonGrid}>
        <Button
          disabled={noMailAddress}
          size="small"
          variant="contained"
          startIcon={<SendIcon />}
          className={classes.lightGreenButton}
          onClick={handleSendMailAll}
        >
          <strong>送信</strong>
        </Button>
      </Grid>

      <Grid item xs={8} sm={9} className={classes.textGrid}>
        <Typography variant="body1" gutterBottom>
          ストック数が1以下、または期限が1週間後以内のアイテム
        </Typography>
      </Grid>
      <Grid item xs={4} sm={3} className={classes.buttonGrid}>
        <Button
          disabled={noMailAddress}
          size="small"
          variant="contained"
          startIcon={<SendIcon />}
          className={classes.lightGreenButton}
          onClick={handleSendMailPicked}
        >
          <strong>送信</strong>
        </Button>
      </Grid>

      {/*
      # 自動メール設定機能(サーバサイド未実装のためコメントアウト)

      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={8} className={classes.textGrid}>
        <Typography variant="body1" gutterBottom>
          自動メール送信（毎日 9:00 AM）
            </Typography>
      </Grid>
      <Grid item xs={4} className={classes.buttonGrid}>
        <FormControlLabel
          control={
            <GreenSwitch
              disabled={noMailAddress}
              checked={autoMailChecked}
              onChange={handleAutoMail}
              name="autoMail"
            />
          }
          style={{ marginRight: 0 }}
        />
      </Grid>

       */}
    </>
  )
}

export default PreferenceMailSend

