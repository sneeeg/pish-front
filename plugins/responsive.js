import { debounce } from 'throttle-debounce'
import { RESIZE_DEBOUNCE } from '~/assets/js/constants'

export default (context) => {
  context.store.commit('responsive/updateWindowParams')

  window.addEventListener(
    'resize',
    debounce(RESIZE_DEBOUNCE, () => {
      context.store.commit('responsive/updateWindowParams')
    })
  )
}
