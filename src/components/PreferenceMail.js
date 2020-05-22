import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import { lightGreen } from '@material-ui/core/colors'

import PreferenceMailAddressForm from './PreferenceMailAddressForm'
import PreferenceMailSend from './PreferenceMailSend'

const useStyles = makeStyles((theme) => ({
  back: {
    marginTop: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    // maxWidth: 700, // 最大幅はContainerコンポーネントのmaxWidthで設定
  },
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

const PreferenceMail = () => {
  const classes = useStyles()

  const [state, setState] = useState({
    checkedMail: false,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <>
      <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
        メール設定
      </Typography>

      <Paper elevation={2} className={classes.back}>
        <Grid container spacing={1}>
          <PreferenceMailAddressForm />
          <PreferenceMailSend />

          <Grid item xs={8} className={classes.textGrid}>
            <Typography variant="body1" gutterBottom>
              自動メール送信（毎日 9:00 AM）
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.buttonGrid}>
            <FormControlLabel
              control={<GreenSwitch
                checked={state.checkedMail}
                onChange={handleChange}
                name="checkedMail"
              />}
              style={{ marginRight: 0 }}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default PreferenceMail

