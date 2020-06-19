import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

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
}))

const PreferenceMail = () => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h6" gutterBottom style={{ textAlign: 'center' }}>
        メール設定
      </Typography>

      <Paper elevation={2} className={classes.back}>
        <Grid container spacing={1}>
          <PreferenceMailAddressForm />
          <PreferenceMailSend />
        </Grid>
      </Paper>
    </>
  )
}

export default PreferenceMail

