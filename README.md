## Stock Checker とは？

食品や日用品の、過不足ない計画的な備蓄をサポートする Web アプリケーションです。<br />
JavaScript ライブラリの React で作成しました。

Stock Checker<br />
https://stock-checker-38k.web.app/

操作マニュアル動画<br />
https://stock-checker-38k.web.app/Manual

## 使用技術

### 全体構成

React: https://ja.reactjs.org/<br />
Create React App: https://create-react-app.dev/

### 状態管理

React / Hooks: https://ja.reactjs.org/docs/hooks-intro.html<br />
Redux: https://redux.js.org/<br />
※ Redux は、Hooks で作成した複数の reducer を combineReducers() でまとめるために使用しています。

### デザイン

Material-UI: https://material-ui.com/

### 画面遷移

React Router: https://reacttraining.com/react-router/web/guides/quick-start

### ホスティング

Firebase / Hosting: https://firebase.google.com/docs/hosting?hl=ja

### メール送信

Firebase / Cloud Functions: https://firebase.google.com/docs/functions?hl=ja

### データ管理

localStorage: https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage

＜補足事項＞<br />
セキュリティの観点から、Firebase に関わるコードは GitHub に公開していません。

## アプリケーションの仕様

1. Stock Checker は localStorage（ブラウザへのデータ保存機能）によって登録データを管理します。よって、同一端末の同一ブラウザにおいて登録データが保持されます。

1. localStorage はブラウザごとに容量の上限が決まっています。<br />
他のアプリケーションによって容量が逼迫していると、Stock Checker のデータを保存できない場合があります。

1. localStorage に保持期間の制限はありません。ただし、一部のブラウザ（Safari Mobile など）では、OS の指示で localStorage データが掃除されるケースもあるようです。<br />
データの永続性が保証されないこと、ご留意ください。

1. Stock Checker の機能である「すべてのデータを削除」を実行すると、本アプリケーションに関わる localStorage データをすべて削除します。

<br />
<br />
※以降は、Create React App にデフォルトで記載されている README.md の内容です。

***

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
