<template>
  <div class="participants-filter">
    <div class="participants-filter__filters">
      <SearchSelect
        v-for="(value, key) in filter"
        :key="key"
        :ref="key"
        v-model="filter[key]"
        multiple
        grey-arrow
        :disabled="key === 'location' && !filter.region.length"
        :options="key === 'location' ? locations : options[key]"
        :placeholder="filterPlaceholders[key]"
        @input="
          activateFilter($event, key), getOptions(true), filterLocation(key)
        "
      />
    </div>

    <div v-if="window.isDesktopSize" class="participants-filter-map">
      <GraphicMap :regions="regions" />
    </div>

    <Divider class="participants-filter__divider" />

    <ParticipantsList
      :items="selectedItems"
      class="participants-filter__list"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchSelect from '~/components/controls/SearchSelect'
import GraphicMap from '~/components/GraphicMap'
import Divider from '~/components/Divider'
import ParticipantsList from '~/components/ParticipantsList'
export default {
  name: 'ParticipantsFilter',
  components: { ParticipantsList, Divider, GraphicMap, SearchSelect },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filter: {
        region: [],
        location: [],
        group: [],
        founder: [],
        direction: [],
      },
      options: {
        region: [],
        location: [],
        group: [],
        founder: [],
        direction: ['Базовая часть', 'Специальная часть'],
      },
      selectableOptions: {
        region: [],
        location: [],
        group: [],
        founder: [],
        direction: [],
      },
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
        item.direction = this.options.direction.reduce((acc, i, index) => {
          if (item.isBase && !index) {
            acc.push(i)
          }

          if (item.isSpecial && index === 1) {
            acc.push(i)
          }

          return acc
        }, [])

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

    resetFilter() {
      this.filter = {
        region: [],
        location: [],
        group: [],
        founder: [],
        direction: [],
      }

      this.getOptions(true)
      this.activeFilters = []
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
        if (filterName === 'direction') return

        const itemsArr = !selectable ? this.items : this.selectedItems
        const result = itemsArr.reduce((acc, item) => {
          acc.push(item[filterName])

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
.participants-filter {
  &__filters {
    @include flexGap(1.6rem);

    > * {
      flex: 1 1 30%;
      max-width: calc(100% / 3 - 2.8rem);

      @include --tablet {
        flex: 1 1 100%;
        max-width: 100%;
      }
    }
  }

  &__divider,
  &__list {
    margin-top: 5.6rem;

    @include --mobile {
      margin-top: 4.2rem;
    }
  }
}

.graphic-map {
  width: 100%;
  margin-top: 4rem;
}
</style>
