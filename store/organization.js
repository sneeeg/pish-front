import cloneObject from '~/assets/js/utils/clone-object'

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

export const getters = {
  program(state) {
    const program = cloneObject(state.data.program)

    const change = (items, parentId = '') => {
      items.forEach((item, index) => {
        item.id = (parentId ? `${parentId}__` : '') + `item_${index}`

        if (item.component === 'Title' && !item.props.title) {
          const title = item.title || ''
          item.title = ''
          item.props.title = title
        }

        if (item.component === 'Array' && item.props?.items) {
          change(item.props.items, item.id)
        }
      })
    }

    change(program)
    return program
  },

  programTitles(state, getters) {
    const result = getters.program.reduce((acc, item) => {
      if (item.component === 'Title') {
        const result = {
          id: item.id,
          text: item.title || item.props.title,
          children: [],
        }

        acc.push(result)
      } else if (item.title && acc[acc.length - 1]) {
        acc[acc.length - 1].children.push({
          id: item.id,
          text: item.title,
        })
      }

      return acc
    }, [])

    return result
  },

  sections(state) {
    return state.data.sections
  },
}
