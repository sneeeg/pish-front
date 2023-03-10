export default (context, inject) => {
  if (
    !context.store.state.responsive.browser.hasWebGLSupport ||
    context.store.state.responsive.browser.isIE ||
    context.route.query.prerender
  ) {
    return inject('motion', null)
  }

  return import('~/assets/js/motion').then(({ default: Motion }) => {
    const motionInstance = new Motion(context)
    inject('motion', motionInstance)

    return motionInstance.changePreset('main')
  })
}
