import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { lightGreen, orange } from '@material-ui/core/colors'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'

import ItemsSort from './ItemsSort'
import ItemUpdateForm from './ItemUpdateForm'
import ItemDelete from './ItemDelete'
import ItemCreateForm from './ItemCreateForm'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex', // flex boxにより下記の配置を有効化
    justifyContent: 'center', // 左右中央揃え
    alignItems: 'center',     // 上下中央揃え
    textAlign: 'center', // 複数行になる場合、2行目以降も中央揃えにする。
  },
  itemHead: {
    padding: 7,
    backgroundColor: lightGreen[500],
    borderRadius: 8,
    color: 'white',
  },
  leftButton: {
    display: 'flex',
    justifyContent: 'flex-start', // 左寄せ
    alignItems: 'center',
  },
  rightButton: {
    display: 'flex',
    justifyContent: 'flex-end', // 右寄せ
    alignItems: 'center',
  },
  stockCount: {
    margin: 5,
  },
  scrollTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(9),
  },
  scrollTopButton: {
    backgroundColor: orange[600],
    '&:hover': {
      backgroundColor: orange[800],
    }
  }
}))

/**
 * Material-UI / App Bar / Scrolling
 * https://material-ui.com/components/app-bar/#back-to-top
 */
function ScrollTop(props) {
  const { children } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100, // ボタン表示の開始位置
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollTop}>
        {children}
      </div>
    </Zoom>
  )
}

const Items = (props) => {
  const classes = useStyles()

  return (
    <>
      <div id="back-to-top-anchor"></div>
      {/* Item ヘッダー */}
      {/* Item リストのブロック数と一致するよう、値なしのブロックを配置。 */}
      <Grid container spacing={0} className={classes.itemHead}>
        <Grid item xs={2} sm={1} className={classes.leftButton}></Grid>

        <Grid item xs={8} sm={6} lg={3} className={classes.root}>
          <Typography variant="body2">
            <strong>ラベル</strong>
          </Typography>
        </Grid>

        <Hidden only={['xs', 'lg', 'xl']}>
          <Grid item sm={4} className={classes.root}>
            <Typography variant="body2">
              <strong>期限</strong>
            </Typography>
          </Grid>
        </Hidden>

        <Hidden lgUp>
          <Grid item xs={2} sm={1} className={classes.rightButton}>
            <ItemsSort />
          </Grid>
        </Hidden>

        {/* 2段表示時の2段目調整のブロック */}
        <Hidden only={['xs', 'lg', 'xl']}>
          <Grid item sm={1} className={classes.root}></Grid>
        </Hidden>

        <Grid item xs={12} sm={6} lg={4} className={classes.root}>
          <Typography variant="body2">
            <strong>アイテム名</strong>
          </Typography>
        </Grid>

        <Grid item xs={6} sm={4} lg={2} className={classes.root}>
          <Typography variant="body2">
            <strong>ストック数</strong>
          </Typography>
        </Grid>

        <Hidden only={['sm', 'md']}>
          <Grid item xs={6} lg={1} className={classes.root}>
            <Typography variant="body2">
              <strong>期限</strong>
            </Typography>
          </Grid>
        </Hidden>

        <Hidden mdDown>
          <Grid item lg={1} className={classes.rightButton}>
            <ItemsSort />
          </Grid>
        </Hidden>

        {/* 2段表示時の2段目調整のブロック */}
        <Hidden only={['xs', 'lg', 'xl']}>
          <Grid item sm={1} className={classes.root}></Grid>
        </Hidden>
      </Grid>

      {/* Item リスト */}
      <Grid container spacing={0}>
        <Grid item xs={2} sm={1} className={classes.leftButton}>
          <ItemUpdateForm />
        </Grid>

        <Grid item xs={8} sm={6} lg={3} className={classes.root}>
          <Typography variant="body2">
            かきくけこかきくけこかきくけこかきくけこ
          </Typography>
        </Grid>

        <Hidden only={['xs', 'lg', 'xl']}>
          <Grid item sm={4} className={classes.root}>
            <Typography variant="body2">
              2020/12/31
            </Typography>
          </Grid>
        </Hidden>

        <Hidden lgUp>
          <Grid item xs={2} sm={1} className={classes.rightButton}>
            <ItemDelete />
          </Grid>
        </Hidden>

        {/* 2段表示時の2段目調整のブロック */}
        <Hidden only={['xs', 'lg', 'xl']}>
          <Grid item sm={1} className={classes.root}></Grid>
        </Hidden>

        <Grid item xs={12} sm={6} lg={4} className={classes.root}>
          <Typography variant="body2">
            あいうえおあいうえおあいうえおあいうえおあいうえおあいうえお
          </Typography>
        </Grid>

        <Grid item xs={6} sm={4} lg={2} className={classes.root}>
          <IconButton aria-label="plus" size="small">
            <AddIcon />
          </IconButton>
          <Typography variant="body2" className={classes.stockCount}>
            99999
          </Typography>
          <IconButton aria-label="minus" size="small">
            <RemoveIcon />
          </IconButton>
        </Grid>

        <Hidden only={['sm', 'md']}>
          <Grid item xs={6} lg={1} className={classes.root}>
            <Typography variant="body2">
              2020/12/31
            </Typography>
          </Grid>
        </Hidden>

        <Hidden mdDown>
          <Grid item lg={1} className={classes.rightButton}>
            <ItemDelete />
          </Grid>
        </Hidden>

        {/* 2段表示時の2段目調整のブロック */}
        <Hidden only={['xs', 'lg', 'xl']}>
          <Grid item sm={1} className={classes.root}></Grid>
        </Hidden>
      </Grid>
      <Divider />

      {[...Array(60).keys()].map(count => {
        return (
          // Item リスト
          <div key={count}>
            <Grid container spacing={0}>
              <Grid item xs={2} sm={1} className={classes.leftButton}>
                <ItemUpdateForm />
              </Grid>
              <Grid item xs={8} sm={6} lg={3} className={classes.root}>
                <Typography variant="body2">
                  {count}_日用品
                </Typography>
              </Grid>
              <Hidden only={['xs', 'lg', 'xl']}>
                <Grid item sm={4} className={classes.root}>
                  <Typography variant="body2">
                    -
                  </Typography>
                </Grid>
              </Hidden>
              <Hidden lgUp>
                <Grid item xs={2} sm={1} className={classes.rightButton}>
                  <ItemDelete />
                </Grid>
              </Hidden>
              {/* 2段表示時の2段目調整のブロック */}
              <Hidden only={['xs', 'lg', 'xl']}>
                <Grid item sm={1} className={classes.root}></Grid>
              </Hidden>
              <Grid item xs={12} sm={6} lg={4} className={classes.root}>
                <Typography variant="body2">
                  トイレットペーパー
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} lg={2} className={classes.root}>
                <IconButton aria-label="plus" size="small">
                  <AddIcon />
                </IconButton>
                <Typography variant="body2" className={classes.stockCount}>
                  12
                </Typography>
                <IconButton aria-label="minus" size="small">
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Hidden only={['sm', 'md']}>
                <Grid item xs={6} lg={1} className={classes.root}>
                  <Typography variant="body2">
                    -
                  </Typography>
                </Grid>
              </Hidden>
              <Hidden mdDown>
                <Grid item lg={1} className={classes.rightButton}>
                  <ItemDelete />
                </Grid>
              </Hidden>
              {/* 2段表示時の2段目調整のブロック */}
              <Hidden only={['xs', 'lg', 'xl']}>
                <Grid item sm={1} className={classes.root}></Grid>
              </Hidden>
            </Grid>
            <Divider />
          </div>
        )
      })}

      {/* 最下部スペース */}
      <div style={{ margin: 60 }}></div>

      {/* topへ戻るボタン */}
      <ScrollTop {...props}>
        <Fab
          color="secondary"
          size="small"
          aria-label="scroll back to top"
          className={classes.scrollTopButton}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <ItemCreateForm />
    </>
  )
}

export default Items

