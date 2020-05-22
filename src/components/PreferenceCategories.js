import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import { makeStyles } from '@material-ui/core/styles'

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

// ./ItemFormのリスト選択でも利用するためexport
export const categories = [
  {
    label: '1',
    color: '#2196f3',
    value: 'label 1',
  },
  {
    label: '2',
    color: '#f44336',
    value: 'label 2',
  },
  {
    label: '3',
    color: '#4caf50',
    value: 'label 3',
  },
  {
    label: '4',
    color: '#fdd835',
    value: 'label 4',
  },
  {
    label: '5',
    color: '#f06292',
    value: 'label 5',
  },
  {
    label: '6',
    color: '#8d6e63',
    value: 'label 6',
  },
  {
    label: '7',
    color: '#3f51b5',
    value: 'label 7',
  },
  {
    label: '8',
    color: '#ff9800',
    value: 'label 8',
  },
  {
    label: '9',
    color: '#8bc34a',
    value: 'あいうえおあいうえおあいうえお', // label 9
  },
  {
    label: '10',
    color: '#9e9e9e',
    value: 'label 10',
  },
]

const PreferenceCategories = () => {
  const classes = useStyles()

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
            <PreferenceCategoriesForm categories={categories} />
          </Grid>
          {categories.map(category => (
            <Grid item xs={12} key={category.label}>
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
