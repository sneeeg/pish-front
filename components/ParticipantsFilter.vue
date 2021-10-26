<template>
  <div class="participants-filter">
    <div class="participants-filter__filters">
      <SearchSelect
        v-for="(value, key) in filter"
        :key="key"
        v-model="filter[key]"
        multiple
        :options="filterOptions[key]"
        :placeholder="filterPlaceholders[key]"
        @change="setFirstFilterName($event, key), getFilterOptions()"
      />
    </div>
  </div>
</template>

<script>
import SearchSelect from '~/components/controls/SearchSelect'
export default {
  name: 'ParticipantsFilter',
  components: { SearchSelect },
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
      filterOptions: {
        region: [],
        location: [],
        group: [],
        founder: [],
        direction: [],
      },
      firstFilterName: '',
      filterPlaceholders: {},
    }
  },
  computed: {
    filtersAreEmpty() {
      return !Object.keys(this.filter).find((key) => !!this.filter[key].length)
    },

    selectedItems() {
      const result = this.items.reduce((acc, item) => {
        Object.keys(this.filter).forEach((key) => {
          const filter = this.filter[key]
          const matched = !filter.length || filter.includes(item[key])
          const hasDuplicate = acc.find((i) => i.id === item.id)

          if (matched && !hasDuplicate) {
            acc.push(item)
          }
        })

        return acc
      }, [])

      return result
    },
  },
  created() {
    this.filterPlaceholders = {
      region: 'Федеральный округ',
      location: 'Область нахождения организации',
      group: 'Группа критериев',
      founder: 'Учредитель организации',
      direction: 'Направление гранта',
    }

    this.getFilterOptions()
  },
  methods: {
    setFirstFilterName(e, filterName) {
      if (this.filtersAreEmpty) {
        this.firstFilterName = filterName
      }
    },
    getFilterOptions() {
      Object.keys(this.filterOptions).forEach((filterName) => {
        const itemsArr =
          this.filtersAreEmpty || this.firstFilterName === filterName
            ? this.items
            : this.selectedItems

        const result = itemsArr.reduce((acc, item) => {
          acc.push(item[filterName])

          return acc
        }, [])

        this.filterOptions[filterName] = [...new Set(result)]
      })
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
    }
  }
}
</style>
