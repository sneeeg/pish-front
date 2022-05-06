import { getResponse } from '~/server/utils'
import { PAGES } from '~/assets/js/constants'

const pageModulesRu = require.context(
  '~/server/collections/pages/s1',
  true,
  /\.js$/
)

const pageModulesEn = require.context(
  '~/server/collections/pages/en',
  true,
  /\.js$/
)

const getPages = (modules) =>
  modules.keys().reduce((accumulator, path) => {
    const moduleName = require('path').basename(path).split('.')[0]
    accumulator[moduleName] = modules(path)
    return accumulator
  }, {})

const pages = {
  s1: getPages(pageModulesRu),
  en: getPages(pageModulesEn),
}

/**
 * Pages routes
 */
export default (pretender) => {
  PAGES.forEach((page) => {
    pretender.get(`/api/v2/pages/${page}`, (request) => {
      return [
        200,
        { 'Content-Type': 'application/json' },
        getResponse(pages[request.requestHeaders['X-Bitrix-Site-Id']][page]),
      ]
    })
  })
}
