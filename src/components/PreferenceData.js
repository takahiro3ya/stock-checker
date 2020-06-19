import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { makeStyles } from '@material-ui/core/styles'
import { lightGreen } from '@material-ui/core/colors'

import AppContext from '../contexts/AppContext'
import {
  DELETE_ALL_ITEMS,
  DELETE_ALL_CATEGORIES,
  DELETE_MAIL_ADDRESS
 } from '../actions'

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

const PreferenceData = () => {
  const classes = useStyles()
  const { dispatch } = useContext(AppContext)

  const handleAllDelete = e => {
    e.preventDefault()

    const result1 = window.confirm(`すべてのデータを削除しますか？\nアイテム、メールアドレス、ラベル、すべて初期化されます。\n削除したデータは復元できません。`)
    if (result1) {
      const result2 = window.confirm(`最終確認です。本当にすべてのデータを削除しますか？`)
      if (result2) {
        dispatch({ type: DELETE_ALL_ITEMS })
        dispatch({ type: DELETE_ALL_CATEGORIES })
        dispatch({ type: DELETE_MAIL_ADDRESS })
        alert('削除しました。')
      }
    }
  }

  return (
    <>
      <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
        データ管理
      </Typography>

      <Paper elevation={2} className={classes.back}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="overline">
              データ削除
            </Typography>
          </Grid>

          <Grid item xs={8} className={classes.textGrid}>
            <Typography variant="body1" gutterBottom style={{ marginTop: 10 }}>
              すべてのデータを削除
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.buttonGrid}>
            <Button
              size="small"
              variant="contained"
              startIcon={<DeleteForeverIcon />}
              className={classes.lightGreenButton}
              onClick={handleAllDelete}
            >
              <strong>削除</strong>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default PreferenceData

