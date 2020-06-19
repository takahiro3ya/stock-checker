/**
 * Material-UI / Responsive drawer
 * https://material-ui.com/components/drawers/#responsive-drawer
 */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import YouTubeIcon from '@material-ui/icons/YouTube'

import logo from './images/logo-Stock-Checker.png'

const drawerWidth = 185

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: `#383838`,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo: {
    width: `100%`,
    height: `100%`,
    textAlign: `center`,
    '& img': {
      height: `43px`,
      marginTop: `5px`
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}))

const ResponsiveDrawer = props => {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()
  // drawerのリンク管理
  const handleDrawerLink = path => {
    // モバイルサイズの時のみdrawerを閉じる。
    if (document.body.clientWidth < 960) {
      setMobileOpen(!mobileOpen)
    }
    history.push(path)
  }

  const drawer = (
    <div>
      <List>
        <ListItem button onClick={() => handleDrawerLink('/')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary='ホーム' />
        </ListItem>
      </List>
      <Divider variant="middle" />
      <List>
        <ListItem button onClick={() => handleDrawerLink('/preferences')}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary='設定' />
        </ListItem>
        <ListItem button onClick={() => handleDrawerLink('/Manual')}>
          <ListItemIcon><YouTubeIcon /></ListItemIcon>
          <ListItemText primary='マニュアル' />
        </ListItem>
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logo}>
            <img
              src={logo}
              alt="Stock Checker"
              onClick={() => history.push('/')}
              style={{ cursor: 'pointer' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="menus">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* App.jsでwrapしたコンテンツ */}
        {props.children}
      </main>
    </div>
  )
}

export default ResponsiveDrawer
