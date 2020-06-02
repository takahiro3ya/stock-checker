// import { UPDATE_MAIL_ADDRESS, AUTO_MAIL } from '../actions'
import { UPDATE_MAIL_ADDRESS } from '../actions'

const preferences = (state = [], action) => {
  switch (action.type) {
    case UPDATE_MAIL_ADDRESS:
      return Boolean(action.mailAddress) ?
        {...state, mailAdress: action.mailAddress} :
        {...state, mailAdress: action.mailAddress, autoMail: false}
    /*
    # 自動メール設定機能(サーバサイド未実装のためコメントアウト)
    case AUTO_MAIL:
      return {...state, autoMail: action.autoMail}
     */
    default:
      return state
  }
}

export default preferences
