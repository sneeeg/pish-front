<template>
  <div v-if="window.isDesktopSize && !dv" class="participants-filter-map">
    <GraphicMap :regions="regions" class="members__map" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GraphicMap from '~/components/GraphicMap'
export default {
  name: 'MapFounders',
  components: { GraphicMap },
  props: {
    items: {
      type: Array,
      required: true,
    },

    dv: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filter: { region: [] },
      options: { region: [] },
      selectableOptions: { region: [] },
      filterPlaceholders: {},
      activeFilters: [],
    }
  },
  computed: {
    ...mapState('responsive', ['window']),

    locations() {
      return [
        ...new Set(
          this.items.reduce((acc, item) => {
            if (this.filter.region.includes(item.region)) {
              acc.push(item.location)
            }

            return acc
          }, [])
        ),
      ]
    },

    filtersAreEmpty() {
      return !Object.keys(this.filter).find((key) => !!this.filter[key].length)
    },

    regions() {
      return this.selectedItems.reduce(
        (acc, item) => {
          acc[item.regionCode] += 1

          return acc
        },
        {
          central: 0,
          north: 0,
          south: 0,
          kavkaz: 0,
          volga: 0,
          ural: 0,
          siberia: 0,
          vostok: 0,
        }
      )
    },

    selectedItems() {
      const result = this.items.reduce((acc, item) => {
        const matched = Object.keys(this.filter).reduce((acc, key) => {
          const filter = this.filter[key]
          const isMatched =
            !filter.length ||
            (typeof item[key] === 'string'
              ? filter.includes(item[key])
              : item[key].filter((val) => filter.includes(val)).length)

          if (isMatched) {
            acc += 1
          }

          return acc
        }, 0)

        if (matched === Object.keys(this.filter).length) {
          acc.push(item)
        }

        return acc
      }, [])

      return result
    },
  },
  created() {
    this.filterPlaceholders = {
      region: 'Федеральный округ',
      location: 'Субъект РФ',
      group: 'Группа критериев',
      founder: 'Учредитель организации',
      direction: 'Направление гранта',
    }

    this.getOptions()
    this.getOptions(true)
  },
  methods: {
    filterLocation(filterName) {
      if (filterName !== 'region') return

      this.filter.location = this.filter.location.filter(
        (item) =>
          this.filter.region.length &&
          this.selectableOptions.location.includes(item)
      )
    },
    activateFilter(e, filterName) {
      const index = this.activeFilters.findIndex((item) => item === filterName)

      if (!e.length && index !== -1) {
        this.activeFilters.splice(index, 1)
      } else if (index === -1) {
        this.activeFilters.push(filterName)
      }
    },
    getOptions(selectable = false) {
      Object.keys(this.selectableOptions).forEach((filterName) => {
        const itemsArr = !selectable ? this.items : this.selectedItems
        const result = itemsArr.reduce((acc, item) => {
          if (typeof item[filterName] === 'object') {
            acc = acc.concat(item[filterName])
          } else {
            acc.push(item[filterName])
          }

          return acc
        }, [])

        this[selectable ? 'selectableOptions' : 'options'][filterName] = [
          ...new Set(result),
        ]
      })
    },
    isOptionSelectable(filterName) {
      return (option) => this.selectableOptions[filterName].includes(option)
    },
  },
}
</script>

<style lang="scss">
.members__map {
  .graphic-map {
    width: 100%;

    &__content {
      svg {
        width: 80rem;
      }
    }
  }
}
</style>
