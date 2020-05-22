import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import ResponsiveDrawer from './ResponsiveDrawer'
import Items from './Items'
import Preferences from './Preferences'
import Manual from './Manual'

const App = () => {
  return (
    <Router>
      {/* ResponsiveDrawerコンポーネントでwrapすることで、
          内部コンテンツをprops.childrenとして取得し、
          ResponsiveDrawer.jsで指定箇所に埋めこむ。 */}
      <ResponsiveDrawer>
        <Switch>
          <Route path="/" exact>
            <Items />
          </Route>
          <Route path="/preferences" exact>
            <Preferences />
          </Route>
          <Route path="/Manual" exact>
            <Manual />
          </Route>
          {/* URLがヒットしないときにNot Found画面を表示 */}
          <Route>
            <p>指定のページは見つかりませんでした。</p>
          </Route>
        </Switch>
      </ResponsiveDrawer>
    </Router>
  )
}

export default App

