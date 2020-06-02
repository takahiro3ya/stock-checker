import { createContext } from 'react'

/**
 * contextは、データを送る側のcomponentと、
 * 受け取る側のcomponentでそれぞれimporntして利用する。
 *   送る側    => provider: アプリケーションのトップレベルに配置することが多い。
 *   受け取る側 => consumer: providerにwrapされていればどこでもOK。
 */
const AppContext = createContext()

export default AppContext
