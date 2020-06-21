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
import { functions } from '../plugins/firebase'

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

  // Firebase Functionsに渡すkey(makeMsgBody()の条件分岐にも利用)
  const ALL_ITEMS = 'All Items'
  const PICKED_ITEMS = 'Picked Items'

  // Firebase Functionsに渡すメール本文
  const makeMsgBody = (key, items, items2 = {}) => {
    let msgBody = `本メールは、Webアプリケーション「Stock Checker」より通知したものです。
身に覚えのない方は、お手数ですが削除なさってください。

Stock Checker
https://stock-checker-38k.web.app/


`

    switch (key) {
      case ALL_ITEMS:
        msgBody = msgBody + `-------- 対象アイテム:　すべて --------

`
        if (items.length === 0) {
          msgBody = msgBody + `なし

`
        } else {
          for (const item of items) {
            msgBody = msgBody + `[ラベル]　${state.categories[item.categoryIndex].value}
[アイテム名]　${item.itemName}
[ストック数]　${item.stock}
[期限]　${item.selectedDate === null ? 'なし' : item.selectedDate}

`
          }
        }
        break

      case PICKED_ITEMS:
        msgBody = msgBody + `-------- 対象アイテム:　ストック数1以下 --------

`
        if (items.length === 0) {
          msgBody = msgBody + `なし

`
        } else {
          for (const item of items) {
            msgBody = msgBody + `[ラベル]　${state.categories[item.categoryIndex].value}
[アイテム名]　${item.itemName}
[ストック数]　${item.stock}
[期限]　${item.selectedDate === null ? 'なし' : item.selectedDate}

`
          }
        }
        msgBody = msgBody + `
-------- 対象アイテム:　期限1週間後以内 --------

`
        if (items2.length === 0) {
          msgBody = msgBody + `なし

`
        } else {
          for (const item of items2) {
            msgBody = msgBody + `[ラベル]　${state.categories[item.categoryIndex].value}
[アイテム名]　${item.itemName}
[ストック数]　${item.stock}
[期限]　${item.selectedDate === null ? 'なし' : item.selectedDate}

`
          }
        }
        break

      default:
        msgBody = msgBody + `対象アイテムが正しく選択されませんでした。

`
        break

    }
    msgBody = msgBody + `
本メールは送信専用メールアドレスより通知しました。ご返信いただいても返答できませんこと、ご了承ください。`
    return msgBody
  }

  const handleSendMailAll = e => {
    e.preventDefault()

    const result = window.confirm('「' + mailAddress +
      '」宛にメールを送信しますか？\n対象アイテム:　すべて')
    if (result) {
      const sendMail = functions.httpsCallable('sendMail')
      const data = {
        key: ALL_ITEMS,
        mailAddress: state.preferences.mailAddress,
        msgBody: makeMsgBody(ALL_ITEMS, state.items),
      }
      // console.log(data)
      sendMail(data)
      alert('送信しました。')
    }
  }

  const handleSendMailPicked = e => {
    e.preventDefault()

    const result = window.confirm('「' + mailAddress +
      '」宛にメールを送信しますか？\n対象アイテム:　ストック数1以下 or 期限1週間後以内')
    if (result) {
      const sendMail = functions.httpsCallable('sendMail')

      // filter()は、map()と同じで非破壊メソッド
      const itemsPickedStock = state.items.filter(item => item.stock < 2)
      itemsPickedStock.sort((a, b) => {
        // return が 0 未満      =>  a を先に表示
        //           0          =>  なにもしない
        //           0 より大きい =>  b を先に表示
        return (a.stock - b.stock)
      })
      // ストック数が1以下のアイテム
      // console.log(itemsPickedStock)

      const baseDate = new Date()
      baseDate.setDate(baseDate.getDate() + 7)
      const itemsPickedDeadline = state.items.filter(
        item => new Date(item.selectedDate) < baseDate && item.selectedDate
      )
      itemsPickedDeadline.sort((a, b) => {
        return (new Date(a.selectedDate) - new Date(b.selectedDate))
      })
      // 期限が1週間後以内のアイテム
      // console.log(itemsPickedDeadline)

      const data = {
        key: PICKED_ITEMS,
        mailAddress: state.preferences.mailAddress,
        msgBody: makeMsgBody(PICKED_ITEMS, itemsPickedStock, itemsPickedDeadline),
      }
      // console.log(data)
      sendMail(data)
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

