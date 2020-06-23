import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  infoBlock: {
    textAlign: 'center',
  },
  infoText: {
    margin: '20px 15px 20px',
    display: 'inline-block',
    textAlign: 'left', // infoBlockの'center'を取り消し
  },
  infoTypography: {
    textAlign: 'center',
  },
  infoOl: {
    paddingLeft: 20,
    '& li': {
      paddingBottom: 10,
    }
  },
}))

const Info = () => {
  const classes = useStyles()

  return (
    <div className={classes.infoBlock}>
      <div className={classes.infoText}>
        <Typography variant="body2" className={classes.infoTypography}>
          <strong>アプリケーションの仕様</strong>
        </Typography>
        <ol className={classes.infoOl}>
          <li>Stock Checker は localStorage（ブラウザへのデータ保存機能）によって登録データを管理します。よって、同一端末の同一ブラウザにおいて登録データが保持されます。</li>
          <li>localStorage はブラウザごとに容量の上限が決まっています。<br/>
            他のアプリケーションによって容量が逼迫していると、Stock Checker のデータを保存できない場合があります。</li>
          <li>localStorage に保持期間の制限はありません。ただし、一部のブラウザ（Safari Mobile など）では、OS の指示で localStorage データが掃除されるケースもあるようです。<br/>
            データの永続性が保証されないこと、ご留意ください。</li>
          <li>Stock Checker の機能である「すべてのデータを削除」を実行すると、本アプリケーションに関わる localStorage データをすべて削除します。</li>
        </ol>
      </div>
    </div>
  )
}

export default Info

