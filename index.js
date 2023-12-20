import alfy from 'alfy'

async function doTrans() {
  const url = `https://dict.youdao.com/suggest?num=5&ver=3.0&doctype=json&cache=false&le=en&q=${encodeURIComponent(alfy.input)}`
  await alfy.fetch(url, {
    transform: data => {
      if(data.result.code === 200) {
        const entries = data.data.entries
        const items = entries.map(entry => ({
            title: entry.explain,
            subtitle: entry.entry,
            quicklookurl: `https://dict.youdao.com/result?word=${encodeURIComponent(alfy.input)}&lang=en`,
            arg: entry.explain,
          }))
        alfy.output(items)
      } else {
        alfy.output([{
          title: data.result.msg,
          subtitle: `Failed to translate ${alfy.input}`,
          quicklookurl: `https://dict.youdao.com/result?word=${encodeURIComponent(alfy.input)}&lang=en`,
          arg: alfy.input,
        }])
      }
    }
  })
}

doTrans()
