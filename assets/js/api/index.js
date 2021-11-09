/**
 * Require all modules from './modules
 */
const APIModules = require.context('~/assets/js/api/modules/', true, /\.js$/)

export default ($axios) =>
  APIModules.keys().reduce(
    /**
     * Assign modules in object
     * @param accumulator - initial object
     * @param path - path to modules
     * @returns {*}
     */
    (accumulator, path) => {
      const moduleName = require('path').basename(path).split('.')[0]
      accumulator[moduleName] = APIModules(path).default($axios)
      return accumulator
    },
    {}
  )
