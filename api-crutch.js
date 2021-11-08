console.log('back to static, again...')
console.log('creating json...')

const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')

require.context = (
  base = '.',
  scanSubDirectories = false,
  regularExpression = /\.js$/
) => {
  const files = {}

  function readDirectory(directory) {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file)

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) readDirectory(fullPath)

        return
      }

      if (!regularExpression.test(fullPath)) return

      files[fullPath] = true
    })
  }

  readDirectory(path.resolve(__dirname, base))

  function Module(file) {
    return require(file)
  }

  Module.keys = () => Object.keys(files)

  return Module
}

const handler = (siteName, pages) => {
  pages.keys().forEach((path) => {
    const pageName = require('path').basename(path).split('.')[0]
    const module = pages(path)

    fs.writeFileSync(
      `./static/json/${siteName}/${pageName}.json`,
      JSON.stringify(module)
    )
  })
}

rimraf.sync('./static/json')
fs.mkdirSync('./static/json')

fs.mkdirSync('./static/json/s1')
const pagesS1 = require.context('./server/collections/pages/s1', true, /\.js$/)
handler('s1', pagesS1)

fs.mkdirSync('./static/json/en')
const pagesEn = require.context('./server/collections/pages/en', true, /\.js$/)
handler('en', pagesEn)

console.log('done')
