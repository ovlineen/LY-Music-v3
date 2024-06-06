// 正则匹配 
const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parseLyric(lrcString) {
  const lyricInfos = []
  // 剔除出文本中的换行符号
  const lyricLines = lrcString.split('\n')
  for (const lineString of lyricLines) {
    // 注入正则
    const results = timeReg.exec(lineString)
    if (!results) continue
    // 将正则匹配出来的时间进行转换为毫秒数，并相加
    const minute = results[1] * 60 * 1000
    const second = results[2] * 1000
    const mSecond = results[3].length === 2 ? results[3] * 10 : results[3] * 1
    const time = minute + second + mSecond
    // 剔除正则匹配的时间，拿到歌词。
    const text = lineString.replace(timeReg, "")
    if (text === '') {
      continue
    } else {
      lyricInfos.push({
        time,
        text
      })
    }
  }
  return lyricInfos
}