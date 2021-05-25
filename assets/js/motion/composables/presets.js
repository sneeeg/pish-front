import { isMobile } from 'mobile-device-detect'

/**
 * Presets
 * equivalent to pages
 */
export default {
  main: !isMobile
    ? {
        name: 'main',
        modelsToLoad: [
          'david',
          'satellite',
          'numbers',
          'books',
          'molecule',
          'dna',
        ],
        vectorsToLoad: ['arrow'],
        videosToLoad: [],
      }
    : {
        name: 'main',
        modelsToLoad: ['dna'],
        vectorsToLoad: [],
        videosToLoad: [],
      },
  participation: {
    name: 'participation',
    modelsToLoad: [],
    vectorsToLoad: [],
    videosToLoad: ['/videos/arm2.mp4'],
  },
}
