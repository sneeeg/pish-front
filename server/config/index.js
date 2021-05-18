/* Settings */
import settings from '~/server/config/modules/settings'

/* Menus */
import socials from '~/server/config/modules/menus/socials'

// автоматический импорт всех json файлов в ./lang/
const langs = require.context('~/server/config/modules/lang', true, /\.json$/)
const langPaths = langs.keys()

// преобразование файлов в единый объект
// например ./lang/company.json вида
// { "address": "" }
// преобразуется в
// { "company.address": "" }
// и запишется в плоский объект lang
const lang = langPaths.reduce((accumulator, path) => {
  const name = path.split('/').pop().split('.').shift()
  const langFile = langs(path)
  const langFileKeys = Object.keys(langFile)

  langFileKeys.forEach((key) => {
    accumulator[`${name}.${key}`] = langFile[key]
  })

  return accumulator
}, {})

export default {
  settings,
  lang,
  menus: {
    socials,
  },
}
