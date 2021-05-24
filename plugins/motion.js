export default (context, inject) => {
  if (
    !context.store.state.responsive.browser.hasWebGLSupport ||
    context.store.state.responsive.browser.isIE
  ) {
    return inject('motion', null)
  }

  return import('~/assets/js/motion').then(({ default: Motion }) => {
    const motionInstance = new Motion(context)
    inject('motion', motionInstance)

    return motionInstance.changePreset(
      context.route.name
        ? context.$utils.getPageNameByRoute(context.route.name)
        : ''
    )
  })
}
