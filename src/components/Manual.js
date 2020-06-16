import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import InfoIcon from '@material-ui/icons/ErrorOutline'

const useStyles = makeStyles((theme) => ({
  manualBlock: {
    textAlign: 'center',
  },
  manualText: {
    margin: '20px 15px 20px',
    maxWidth: 960,
    display: 'inline-block',
    textAlign: 'left', // manualBlockの'center'を取り消し
  },
  manualTypography: {
    marginTop: 10,
  },
  iconWithText: {
    position: 'relative',
    top: 4,
    left: 1,
    fontSize: 19,
  },
  headIconWithText: {
    position: 'relative',
    top: 4,
    left: -3,
    fontSize: 19,
  },
  manualYoutube: {
    position: 'relative',
    width: '100%',
    height: 0,
    // 垂直方向のpaddingは、%指定すると要素の幅に対して相対的となる。
    marginTop: 20,
    paddingTop: '56.25%', // widthに対して16:9のアスペクト比を設定
  },
  manualYoutubeIframe: {
    position: 'absolute',
    top: 0,
    // left、width、rightがauto以外、かつmargin-leftとmargin-rightがauto => 中央表示
    left: 0,
    right: 0,
    margin: 'auto',
    width: '100%',
    maxWidth: 960, // maxWidth:maxHeight === 16:9
    height: '100%',
    maxHeight: 540, // maxWidth:maxHeight === 16:9
  }
}))

const Manual = () => {
  const classes = useStyles()

  return (
    <div className={classes.manualBlock}>
      <div className={classes.manualText}>
        <Typography variant="body2">
          動画の文字や映像が見づらい場合、下記手順で画質を変更できます。
        </Typography>
        <Typography variant="body2" className={classes.manualTypography}>
          下記の動画を選択&ensp;→&ensp;
          <SettingsIcon className={classes.iconWithText} />
          &ensp;→&ensp;「画質」&ensp;→「720p60」
        </Typography>
        <Typography variant="body2" className={classes.manualTypography}>
          スマートフォンなど&ensp;
          <SettingsIcon className={classes.iconWithText} />
          &ensp;が表示されない場合は、下記のどちらかで&ensp;
          <SettingsIcon className={classes.iconWithText} />
          &ensp;を表示できます。
        </Typography>
        <Typography variant="body2" className={classes.manualTypography}>
          1&ensp;下記の動画を選択&ensp;→&ensp;
          <FullscreenIcon className={classes.iconWithText} />
          &ensp;(フルスクリーン)
        </Typography>
        <Typography variant="body2">
          2&ensp;下記の動画を選択&ensp;→&ensp;YouTubeロゴ&ensp;(youtube.com で視聴する)
        </Typography>
        <Typography variant="body2" className={classes.manualTypography}>
          <InfoIcon className={classes.headIconWithText} />
          これらの設定はYouTubeの仕様により変更される可能性があります。
        </Typography>
      </div>

      <div className={classes.manualYoutube}>
        <iframe
          title="Stock Checker - manual"
          className={classes.manualYoutubeIframe}
          width="560"
          height="315"
          /**
           * srcのカスタムコード()
           * URL末尾に?をつけて表記。2つ目以降は&で連結。
           * rel=0   再生した動画と同じチャンネルから関連動画を表示(一時停止時も他チャンネルの
           *         動画を表示しない)。
           * https://developers.google.com/youtube/player_parameters#Parameters
           */
          src="https://www.youtube.com/embed/UVg4Zz0aS1U?rel=0"
          frameBorder={0}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default Manual

