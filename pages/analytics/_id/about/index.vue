<template>
  <div class="analytics-about">
    <Section background small-head :title="lang['analytics.participation']">
      <ProgramParticipation />
    </Section>

    <div class="analytics-about__sections">
      <Section
        v-for="(section, sectionIndex) in sections"
        :key="sectionIndex"
        small-head
        :title="section.name"
        :background="!!(sectionIndex % 2)"
      >
        <div class="analytics-about__rows">
          <div
            v-for="(row, index) in section.rows"
            :key="index"
            class="analytics-about__row"
          >
            <template v-for="(item, index) in processItems(row.models)">
              <div
                v-if="item.component === 'Categories'"
                :key="index"
                class="analytics-about__cards-wrapper"
              >
                <div
                  :class="[
                    'analytics-about__cards',
                    { _fluid: item.props.fillWidth },
                  ]"
                >
                  <StatisticsCard
                    v-for="(itm, index) in item.props.items"
                    :key="index"
                    class="analytics-about__card"
                    :has-border="!!(sectionIndex % 2)"
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
                class="analytics-about__card"
                :has-border="!!(sectionIndex % 2)"
                :title="item.props.title"
                :indicator="item.indicator"
              >
              </StatisticsCard>
            </template>
          </div>
        </div>
      </Section>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Section from '~/components/layout/Section'
import ProgramParticipation from '~/components/ProgramParticipation'
import StatisticsCard from '~/components/statistics/StatisticsCard'

export default {
  name: 'Index',

  components: { ProgramParticipation, Section, StatisticsCard },

  computed: {
    ...mapState('default', ['lang']),
    ...mapState('organization', { organization: 'data' }),
    ...mapGetters('organization', ['sections']),
  },

  methods: {
    processItems(row) {
      return row.reduce((acc, item) => {
        const props = {}

        if (item.component !== 'Categories') {
          props.indicator = { ...item.props, ...{ serverType: item.component } }

          switch (item.component) {
            case 'ChartDoughnut':
              props.indicator.type = 'doughnut'

              break

            case 'Content':
              props.indicator.type = 'content'

              break

            case 'ChartPie':
              props.indicator.type = 'doughnut'
              props.indicator.pie = true

              break

            case 'ChartLine':
              props.indicator.type = 'line'
              props.indicator.chartLabels = item.props.labels

              break

            case 'ChartStacked':
              props.indicator.type = 'stacked-single'

              break

            case 'DataTable':
              props.indicator.type = 'data-table'

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
.analytics-about {
  margin-top: 6rem;

  &__row,
  &__cards {
    @include flexGap(3rem);
  }

  &__row {
    &:not(:last-child) {
      padding-bottom: 3rem;
    }
  }

  &__card {
    &:not(._fluid) {
      flex: 1 1 40%;
      //max-width: calc(100% / 2 - 3rem);

      @include --tablet {
        flex: 1 1 100%;
        max-width: 100%;
      }
    }

    //&._fluid {
    //  flex: 1 1 100%;
    //  max-width: 100%;
    //}
  }
}
</style>
