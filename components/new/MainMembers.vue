<template>
  <div class="members">
    <Tabs :sections="sections">
      <template #tabs__content>
        <div v-if="mapData" class="members__content">
          <div class="content__list">
            <SearchSelect
              multiple
              :placeholder="filterPlaceholders.region"
              :options="['Южный', 'Северо-Западный']"
              @input="activateFilter($event, 'region')"
            />
            <p>{{ mapData.length }} университет</p>
            <ul class="list">
              <li v-for="item in mapData" :key="item" class="list-item">
                <div class="list-item__logo">
                  <img src="i/new/members/logo-1.png" alt="logo" />
                </div>
                <div class="list-item__title">
                  <p>{{ item.shortName }}</p>
                  <p class="description">
                    {{ item.region }}, г.{{ item.city }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div class="content__map">
            <div class="map__header">
              <div class="header__item">
                <h4 class="header__value">{{ mapData.length }}</h4>
                <p class="header__title">университет</p>
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
            <MapFounders :items="mapData" />
          </div>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MapFounders from '~/components/new/MembersMap/MapFounders'
import Tabs from '~/components/new/Tabs'
import SearchSelect from '~/components/Controls/SearchSelect'

export default {
  name: 'MainMembers',
  components: { SearchSelect, Tabs, MapFounders },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    mapData: null,
    filterPlaceholders: {},
    selectableOptions: { region: [] },
    activeFilters: [],
  }),
  async fetch() {
    this.isLoading = true

    const [{ data }] = await Promise.all([this.$api.analytics.get()])
    this.mapData = data.participants_new
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
  created() {
    this.filterPlaceholders = {
      region: 'Регион',
      founder: 'Учредитель организации',
    }
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
  },
}
</script>

<style lang="scss" scoped>
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
}
</style>
