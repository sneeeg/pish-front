export const state = () => ({
  data: null,
})

export const mutations = {
  SET_ORGANIZATION_DATA(state, data) {
    state.data = data
  },
}

export const actions = {
  async getOrganization({ commit }, { id } = {}) {
    const { data, errors } = await this.$api.analytics.getOrganizationById(id)

    if (errors.length) {
      throw new Error('Not found')
    } else {
      commit('SET_ORGANIZATION_DATA', data)
    }
  },
}
