import {
  isMobile,
  isMobileOnly,
  isTablet,
  isWindows,
  isMacOs,
  isAndroid,
  isWinPhone,
  isIOS,
  mobileVendor,
  mobileModel,
  isChrome,
  isFirefox,
  isSafari,
  isOpera,
  isIE,
  isEdge,
  isYandex,
  isChromium,
  isMobileSafari,
  browserVersion,
  browserName,
} from 'mobile-device-detect'
import { TABLET_WIDTH, MOBILE_WIDTH } from '~/assets/js/constants'
import isWebGLAvailable from '~/assets/js/utils/is-webgl-available'

export const state = () => ({
  window: {
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    ratio: 0,
    isDesktopSize: false,
    isTabletSize: false,
    isMobileSize: false,
    positionHorizontal: false,
  },
  device: {
    isDesktop: !isMobile,
    isWindows,
    isMacOs,
    isAdaptive: isMobile,
    isTablet,
    isMobile: isMobileOnly,
    isAndroid,
    isWinPhone,
    isIOS,
    mobileVendor,
    mobileModel,
    pixelRatio: window.devicePixelRatio,
    hasTouchscreen: (() => 'ontouchstart' in document.documentElement)(),
  },
  browser: {
    isChrome,
    isFirefox,
    isSafari,
    isOpera,
    isIE,
    isEdge,
    isYandex,
    isChromium,
    isMobileSafari,
    browserVersion,
    browserName,
    hasWebpSupport: false,
    hasWebGLSupport: isWebGLAvailable(),
  },
})

export const mutations = {
  updateWindowParams(state) {
    const width = window.innerWidth
    const height = window.innerHeight

    state.window.width = width
    state.window.height = height

    state.window.centerX = width / 2
    state.window.centerY = height / 2

    state.window.ratio = width / height

    state.window.isDesktopSize = width > TABLET_WIDTH

    state.window.isTabletSize = width <= TABLET_WIDTH
    state.window.isMobileSize = width <= MOBILE_WIDTH

    state.window.positionHorizontal =
      state.device.isAdaptive && state.window.ratio > 1
  },
}
