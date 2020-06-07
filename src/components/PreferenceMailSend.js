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
  const noMailAddress = Boolean(!state.preferences.mailAdress)
  // const [autoMailChecked, setAutoMailChecked] = useState(state.preferences.autoMail)

  const handleSendMail = e => {
    e.preventDefault()

    const result = window.confirm(`「${state.preferences.mailAdress}」宛にメールを送信しますか？`)
    if (result) {
      console.log('send')
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
    if (!state.preferences.mailAdress) {
      setAutoMailChecked(false)
    }
  }, [state.preferences.mailAdress])

   */

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="overline">
          メール通知
        </Typography>
      </Grid>

      <Grid item xs={8} className={classes.textGrid}>
        <Typography variant="body1" gutterBottom style={{ marginTop: 10 }}>
          すべてのアイテム
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.buttonGrid}>
        <Button
          disabled={noMailAddress}
          size="small"
          variant="contained"
          startIcon={<SendIcon />}
          className={classes.lightGreenButton}
          onClick={handleSendMail}
        >
          <strong>送信</strong>
        </Button>
      </Grid>

      <Grid item xs={8} className={classes.textGrid}>
        <Typography variant="body1" gutterBottom style={{ marginTop: 10 }}>
          ストック数が1以下、または期限が1週間以内のアイテム
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.buttonGrid}>
        <Button
          disabled={noMailAddress}
          size="small"
          variant="contained"
          startIcon={<SendIcon />}
          className={classes.lightGreenButton}
          onClick={handleSendMail}
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

