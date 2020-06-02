import React, { useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import { makeStyles } from '@material-ui/core/styles'

import AppContext from '../contexts/AppContext'
import PreferenceCategoriesForm from './PreferenceCategoriesForm'

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
}))

const PreferenceCategories = () => {
  const classes = useStyles()
  const { state } = useContext(AppContext)

  return (
    <>
      <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
        ラベル管理
      </Typography>

      <Paper elevation={2} className={classes.back}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Typography variant="overline">
              ラベル
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.buttonGrid}>
            <PreferenceCategoriesForm />
          </Grid>
          {state.categories.map(category => (
            <Grid item xs={12} key={category.categoryIndex}>
              <Typography variant="body1" className={classes.textGrid}>
                <LabelImportantIcon fontSize="small" style={{ color: category.color }} />
                &ensp;{category.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}

export default PreferenceCategories
