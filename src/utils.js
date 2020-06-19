/**
 * UUID
 * https://ja.wikipedia.org/wiki/UUID
 */
export const generateUuid = () => {
  return (
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      // toString(16)   16進表記に変換。
      .replace(/x/g, () => Math.floor(Math.random() * 16).toString(16))
      // 規格により y は16進表記で8、9、A、Bのいずれかとなる。
      .replace(/y/g, () => (Math.floor(Math.random() * 4) + 8).toString(16))
  )
}


