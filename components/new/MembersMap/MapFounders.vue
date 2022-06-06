<template>
  <div class="members__content">
    <div class="content__list">
      <SearchSelect
        v-for="(value, key) in filter"
        :key="key"
        :ref="key"
        v-model="filter[key]"
        multiple
        :placeholder="filterPlaceholders[key]"
        :options="options[key]"
        @input="activateFilter($event, key), getOptions(true)"
      />
      <p>
        {{ selectedItems.length }}
        {{ numUniversities(selectedItems.length) }}
      </p>
      <ul class="list">
        <li v-for="item in selectedItems" :key="item" class="list-item">
          <div class="list-item__logo">
            <img :src="item.logo" alt="logo" />
          </div>
          <div class="list-item__title">
            <p>{{ item.shortName }}</p>
            <p class="description">{{ item.region }}, г.{{ item.city }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="content__map">
      <div class="map__header">
        <div class="header__item">
          <h4 class="header__value">{{ items.length }}</h4>
          <p class="header__title">
            {{ numUniversities(items.length) }}
          </p>
        </div>
        <div class="header__item">
          <h4 class="header__value">46</h4>
          <p class="header__title">Регионов</p>
        </div>
        <div class="header__item">
          <h4 class="header__value">64%</h4>
          <p class="header__title">Доля региональных университетов</p>
        </div>
      </div>
      <GraphicMap :regions="regions" class="members__map" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchSelect from '~/components/controls/SearchSelect'
import GraphicMap from '~/components/GraphicMap'
export default {
  name: 'MapFounders',
  components: { GraphicMap, SearchSelect },
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
      filter: { founder: [] },
      options: { founder: [] },
      selectableOptions: { founder: [] },
      filterPlaceholders: {},
      activeFilters: [],
      numWords: ['университет', 'университета', 'университетов'],
    }
  },
  computed: {
    ...mapState('responsive', ['window']),

    locations() {
      return [
        ...new Set(
          this.items.reduce((acc, item) => {
            if (this.filter.founder.includes(item.founder)) {
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
      founder: 'Учредитель организации',
    }

    this.getOptions()
    this.getOptions(true)
  },
  methods: {
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
    numUniversities(num) {
      const cases = [2, 0, 1, 1, 1, 2]
      const word =
        this.numWords[
          num % 100 > 4 && num % 100 < 20
            ? 2
            : cases[num % 10 < 5 ? num % 10 : 5]
        ]
      return `${word}`
    },
  },
}
</script>

<style lang="scss">
.members {
  &__content {
    display: flex;

    .content {
      &__list {
        width: 316px;
        padding-right: 10px;
        border-right: 1px solid $color_grey_border;

        @include --tablet {
          width: 100%;
          padding-right: 0;
          border: none;
        }

        .list {
          @include scrollbar;
          align-items: flex-start;
          max-height: 550px;
          margin-top: 24px;
          overflow: auto;
        }

        .list-item {
          align-items: center;

          @include --tablet {
            width: 100%;
          }

          &:not(:first-child) {
            margin-top: 24px;
          }

          &__title {
            @include p;
            margin-left: 24px;

            .description {
              margin-top: 4px;
              color: $color_grey_text;
              font-size: 1.2rem;
              line-height: 1.5rem;
            }
          }
        }
      }

      &__map {
        margin-left: 48px;

        @include --tablet {
          display: none;
        }

        .map__header {
          display: flex;
          justify-content: space-between;

          .header {
            &__item {
              display: flex;
              flex: 292px;
              align-items: center;
            }

            &__value {
              font-weight: 700;
              font-size: 4.6rem;
              line-height: 48px;
            }

            &__title {
              margin-left: 12px;
              color: $color_grey_text;
            }
          }
        }
      }
    }
  }

  &__map {
    .graphic-map {
      width: 100%;

      &__content {
        svg {
          width: 80rem;
        }
      }
    }
  }
}
</style>
