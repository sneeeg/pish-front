import { getResponse } from '~/server/utils'

const modules = require.context('~/server/collections/pages_new', true, /\.js$/)

const pages = modules.keys().reduce((accumulator, path) => {
  const moduleName = require('path').basename(path).split('.')[0]
  accumulator[moduleName] = modules(path)
  return accumulator
}, {})

export default (pretender) => {
  pretender.get(`/api/v2/pages/:page`, (request) => {
    const { page } = request.params

    return [
      200,
      { 'Content-Type': 'application/json' },
      getResponse(pages[page]),
    ]
  })
}
