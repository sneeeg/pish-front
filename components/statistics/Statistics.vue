<template>
  <div :class="['statistics', { _noSections: noSections }]">
    <div class="statistics__sections">
      <component
        :is="noSections ? 'div' : 'Section'"
        v-for="(section, sectionIndex) in sections"
        :key="sectionIndex"
        :small-head="!noSections"
        :title="!noSections ? section.name : false"
        :background="!noSections ? isBackground(sectionIndex) : false"
      >
        <div v-if="noSections && section.name" class="statistics__title">
          {{ section.name }}
        </div>

        <div class="statistics__rows">
          <div
            v-for="(row, index) in section.rows"
            :key="index"
            class="statistics__row"
          >
            <template v-for="(item, index) in processItems(row.models)">
              <div
                v-if="item.component === 'Categories'"
                :key="index"
                :class="[
                  'statistics__cards-wrapper',
                  {
                    _horizontal: item.props.horizontal && !window.isMobileSize,
                    _singleCard: item.props.singleCard,
                    _vertical:
                      item.props.singleCard &&
                      (!item.props.horizontal || window.isMobileSize),
                    _title: item.props.title,
                    _hasBorder: item.props.singleCard && hasBorder,
                  },
                ]"
              >
                <div
                  v-if="item.component === 'Categories' && item.props.title"
                  class="statistics__subtitle"
                >
                  {{ item.props.title }}
                </div>

                <div :class="['statistics__cards']">
                  <StatisticsCard
                    v-for="(itm, index) in item.props.items"
                    :key="index"
                    :reverse="itm.reverse"
                    :no-card-appearance="item.props.singleCard"
                    :class="['statistics__card', { _fluid: itm.fluid }]"
                    :has-border="hasBorder || isBackground(sectionIndex)"
                    :faint="item.props.faint"
                    :title="itm.label"
                    :list="{ icon: itm.icon, items: [{ label: itm.text }] }"
                  >
                  </StatisticsCard>
                </div>
              </div>

              <StatisticsCard
                v-else
                :key="index"
                :single="row.models.length === 1"
                class="statistics__card"
                :show-legend-value="
                  !item.indicator || item.indicator.type !== 'bar-group'
                "
                :has-border="
                  !noSections ? isBackground(sectionIndex) : hasBorder
                "
                :title="item.props.title"
                :subtitle="item.props.subtitle"
                :indicator="item.indicator"
                :list="
                  item.component === 'List'
                    ? { icon: item.props.icon, items: item.props.items }
                    : null
                "
              >
              </StatisticsCard>
            </template>

            <HTMLContent
              v-if="row.postContent"
              class="statistics__post-content"
              :html="row.postContent"
            />
          </div>
        </div>
      </component>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import StatisticsCard from '~/components/statistics/StatisticsCard'
import Section from '~/components/layout/Section'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'Statistics',
  components: {
    HTMLContent,
    StatisticsCard,
    Section,
  },

  props: {
    sections: {
      type: Array,
      default: () => [],
    },
    noSections: {
      type: Boolean,
      default: false,
    },
    hasBorder: {
      type: Boolean,
      default: false,
    },
    backgroundReverse: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapState('responsive', ['window']),
  },

  methods: {
    isBackground(sectionIndex) {
      return this.backgroundReverse ? !(sectionIndex % 2) : !!(sectionIndex % 2)
    },

    processItems(row) {
      return row.reduce((acc, item) => {
        const props = {}

        if (item.component !== 'Categories' && item.component !== 'List') {
          props.indicator = { ...item.props, ...{ serverType: item.component } }

          switch (item.component) {
            case 'ChartDoughnut':
              props.indicator.type = 'doughnut'

              break

            case 'Content':
              props.indicator.type = 'content'

              break

            case 'Banner':
              props.indicator.type = 'banner'

              break

            case 'ChartPie':
              props.indicator.type = 'doughnut'
              props.indicator.pie = true

              break

            case 'ChartLine':
              props.indicator.type = 'line'
              props.indicator.chartLabels = item.props.labels

              break

            case 'ChartBarGroup':
              props.indicator.type = 'bar-group'
              props.indicator.group = true
              props.indicator.horizontal = true
              props.indicator.chartLabels = item.props.labels

              break

            case 'ChartStacked':
              props.indicator.type = 'stacked-single'

              break

            case 'DataTable':
              props.indicator.type = 'data-table'

              break

            case 'Groups':
              props.indicator.type = 'groups'

              break

            case 'ChartRadar':
              props.indicator.type = 'radar'

              break
          }
        }
        acc.push({ ...item, ...props })

        return acc
      }, [])
    },
  },
}
</script>
<style lang="scss">
.statistics {
  &__sections {
    ._noSections & {
      > *:not(:last-child) {
        margin-bottom: 5.6rem;

        @include --mobile {
          margin-bottom: 4.2rem;
        }
      }
    }
  }

  &__title {
    @include text-subtitle;
    margin-bottom: 3.2rem;
    color: $color_dark_grey;

    @include --mobile {
      margin-bottom: 2.4rem;
    }
  }

  &__subtitle {
    @include text-small;
    margin-bottom: 4rem;

    @include --mobile {
      margin-bottom: 3.2rem;
    }
  }

  &__row,
  &__cards {
    @include flexGap(3rem);

    > * {
      flex: 1 1 40%;

      @include --tablet {
        flex: 1 1 100%;
      }
    }
  }

  &__cards-wrapper {
    &._singleCard {
      padding: 2.4rem;
      background: #fff;
    }

    &._hasBorder {
      border: 1px solid #e1e4e8;
    }
  }

  &__cards {
    height: calc(100% + 3rem);

    @include --tablet {
      height: auto;
    }

    ._horizontal & {
      height: auto;
      @include flexGap(2.4rem);

      > * {
        &:not(:nth-child(0n + 1)) {
          padding-left: 2.4rem;
          border-left: 1px solid $color_grey_border;
        }
      }
    }

    ._title & {
      height: auto;
    }

    ._vertical & {
      @include flexGap(2.6rem);

      @include --mobile {
        @include flexGap(2rem);
      }

      > * {
        &:not(:last-child) {
          padding-bottom: 2.6rem;
          border-bottom: 1px solid $color_grey_border;

          @include --mobile {
            padding-bottom: 2rem;
          }
        }
      }

      .statistics-card__header {
        margin-top: 0.8rem;
      }
    }

    > * {
      &:not(._fluid) {
        flex: 1 1 40%;
        max-width: calc(100% / 2 - 3rem);

        @include --mobile {
          flex: 1 1 100%;
          max-width: 100%;
        }

        ._horizontal & {
          flex: 1 1 30%;
          max-width: calc(100% / 3 - 2.4rem);

          @include --mobile {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }

        ._vertical & {
          flex: 1 1 100%;
          max-width: 100%;
        }
      }

      &._fluid {
        flex: 1 1 100%;
        max-width: 100%;
      }
    }
  }

  &__row {
    &:not(:last-child) {
      padding-bottom: 3rem;
    }
  }

  &__post-content {
    &:not(.fluid) {
      @include containerInnerSmall2;
    }

    > p {
      @include text-button-small;
      font-weight: normal;
      text-transform: none;
    }
  }
}
</style>
