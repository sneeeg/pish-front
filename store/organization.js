export const state = () => ({
  data: null,
  program: [],
})

export const mutations = {
  SET_ORGANIZATION_DATA(state, data) {
    state.data = data
  },
  SET_PROGRAM(state, program) {
    state.program = program
  },
}

export const actions = {
  async getOrganization({ commit }, { id } = {}) {
    const { data, errors } = await this.$api.analytics.getOrganizationById(id)

    if (errors.length) {
      throw new Error('Not found')
    } else {
      commit('SET_ORGANIZATION_DATA', data)
      commit('SET_PROGRAM', data.program)
    }
  },
}

export const getters = {
  programTitles(state) {
    return state.program.reduce((acc, item) => {
      if (item.component === 'Title') {
        acc.push(item)
      }

      return acc
    }, [])
  },
}
