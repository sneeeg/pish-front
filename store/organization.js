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
    const result = state.program.reduce((acc, item, index) => {
      if (item.component === 'Title') {
        const result = {
          id: `title_${index + 1}`,
          text: item.title || item.props.title,
          children: [],
        }

        acc.push(result)
      } else if (item.title && acc[acc.length - 1]) {
        acc[acc.length - 1].children.push({
          id: `title_${index + 1}`,
          text: item.title,
        })
      }

      return acc
    }, [])

    return result
  },
}
