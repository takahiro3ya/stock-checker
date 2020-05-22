import React from 'react'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import SendIcon from '@material-ui/icons/Send'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { lightGreen } from '@material-ui/core/colors'


const useStyles = makeStyles((theme) => ({
  textGrid: {
    display: 'flex', // flex boxにより下記の配置を有効化
    alignItems: 'center',     // 上下中央揃え
    textAlign: 'center', // 複数行になる場合、2行目以降も中央揃えにする。
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

const PreferenceMailSend = () => {
  const classes = useStyles()

  const handleClickSendButton = () => {
    // if (condition) {
    //   // メールアドレスが""またはnullの場合、警告。
    // }
    const result = window.confirm(`xxeafeagrgijojoixxxxx.yyyyyy777asdkjfiqoaewhfgq@yahoo.co.jp 宛にメールを送信しますか？`)
    if (result) {
      console.log('send')
    }
  }

  return (
    <>
      <Grid item xs={8} className={classes.textGrid}>
        <Typography variant="body1" gutterBottom>
          いますぐメールを送信
        </Typography>
      </Grid>
      <Grid item xs={4} className={classes.buttonGrid}>
        <Button
          size="small"
          variant="contained"
          startIcon={<SendIcon />}
          className={classes.lightGreenButton}
          onClick={handleClickSendButton}
        >
          <strong>送信</strong>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </>
  )
}

export default PreferenceMailSend

