import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import SettingsIcon from '@material-ui/icons/Settings'
import FullscreenIcon from '@material-ui/icons/Fullscreen'
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import InfoIcon from '@material-ui/icons/ErrorOutline'
import MoreVertIcon from '@material-ui/icons/MoreVert'

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
          動画の文字や映像が見づらい場合、以下の設定をお試しください。
        </Typography>

        <Typography variant="body2" className={classes.manualTypography}>
          <strong>全画面表示</strong>
        </Typography>
        <Typography variant="body2">
          下記画面を選択&ensp;→&ensp;
          <FullscreenIcon className={classes.iconWithText} />
          （画面右下）
        </Typography>

        <Typography variant="body2" className={classes.manualTypography}>
          <strong>画質変更</strong>
        </Typography>
        <Typography variant="body2">
          下記画面を選択&ensp;→&ensp;
          <SettingsIcon className={classes.iconWithText} />
          （画面右下）&ensp;→&ensp;「画質」&ensp;→「720p60」
        </Typography>

        <Typography variant="body2" className={classes.manualTypography}>
          <ReportProblemIcon className={classes.headIconWithText} />
          スマートフォンなどは&ensp;
          <SettingsIcon className={classes.iconWithText} />
          &ensp;が表示されず、画質変更できない場合があります。
        </Typography>
        <Typography variant="body2">
          そうした時は、以下の手順で画質変更が可能です。
        </Typography>

        <Typography variant="body2" className={classes.manualTypography}>
          <strong>画質変更(スマートフォンなど)</strong>
        </Typography>
        <Typography variant="body2">
          1.&ensp;下記画面を選択&ensp;→&ensp;「Stock Checker - manual」
          （画面左上）の文字を選択&ensp;→&ensp;YouTubeでこの動画が表示
        </Typography>
        <Typography variant="body2">
          2.&ensp;動画の画面を選択&ensp;→&ensp;
        <MoreVertIcon className={classes.iconWithText} />
          （画面右上）&ensp;→&ensp;「画質」&ensp;→「720p60」
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

      {/* 最下部スペース */}
      <div style={{ margin: 60 }}></div>
    </div>
  )
}

export default Manual

