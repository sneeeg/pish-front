export const state = () => ({
  lockedModules: [],
  y: 0,
  savedY: 0,
  wayDown: true,
  up: false,
})

export const mutations = {
  updateScrollParams(state) {
    const scrollY = pageYOffset
    if (state.y >= scrollY) {
      state.wayDown = true
      state.up = false
    } else {
      state.wayDown = false
      state.up = true
    }

    state.y = scrollY
  },
  addLockedModule(state, moduleName) {
    state.lockedModules.push(moduleName)
  },
  removeLockedModule(state, moduleName) {
    const index = state.lockedModules.indexOf(moduleName)

    if (index > -1) {
      state.lockedModules.splice(moduleName, 1)
    }
  },
  setSavedY(state) {
    state.savedY = state.y
  },
}

export const actions = {
  lock({ state, commit, getters }, moduleName) {
    const hasModule = state.lockedModules.includes(moduleName)

    if (hasModule) {
      return
    }

    if (getters.isLocked) {
      commit('addLockedModule', moduleName)
      return
    }

    commit('addLockedModule', moduleName)
    commit('setSavedY')

    document.body.classList.add('_overflow-hidden')

    const isMobileSafari = false
    Object.assign(
      document.body.style,
      isMobileSafari
        ? {
            position: 'fixed',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }
        : {
            overflow: 'hidden',
          }
    )
  },
  unlock({ state, commit, getters }, moduleName) {
    commit('removeLockedModule', moduleName)

    if (!getters.isLocked) {
      document.body.classList.remove('_overflow-hidden')
      Object.assign(document.body.style, {
        position: '',
        overflow: '',
        width: '',
        height: '',
      })

      // if (isMobileSafari) {
      //   setTimeout(() => {
      //     window.scrollTo(0, this.savedScrollTop);
      //     this.savedScrollTop = 0;
      //   });
      // }
    }
  },
}

export const getters = {
  isLocked(state) {
    return state.lockedModules.length > 0
  },
}
