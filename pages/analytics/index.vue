<template>
  <Loader v-if="isLoading" />

  <div v-else-if="data" class="analytics">
    <Section>
      <h1 class="council__title _visually-h2">{{ page.pageTitle }}</h1>

      <div v-if="data.files && !!data.files.length" class="analytics-files">
        <div class="analytics-files__title">
          {{ lang['base.files'] }}
        </div>

        <div class="analytics-files__items">
          <File
            v-for="(file, index) in data.files"
            :key="index"
            v-bind="file"
          />
        </div>
      </div>
    </Section>

    <Section small-head background :title="page.participants.title">
      <template #head>
        <Btn
          :text="lang['base.resetFilter']"
          :arrow="false"
          grey
          @click.native="resetFilter"
        />
      </template>

      <template #default>
        <ParticipantsFilter ref="filter" :items="data.participants" />
      </template>
    </Section>

    <Section small-head :title="page.summary.title">
      <Statistics :items="statistics"></Statistics>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import Section from '~/components/layout/Section'
import Loader from '~/components/Loader'
import File from '~/components/controls/File'
import Btn from '~/components/controls/Btn'
import ParticipantsFilter from '~/components/ParticipantsFilter'

import Statistics from '~/components/statistics/Statistics'

const GROUPS = [
  'Группа 1 - участники программы (основной трек)',
  'Группа 2 - университеты творческой направленности',
  'Группа 3 - кандидаты на участие в программе',
  'Группа 4 - участники программы (реорганизация)',
]

export default {
  name: 'Index',
  components: { ParticipantsFilter, Btn, File, Loader, Section, Statistics },
  mixins: [pageDataFetch, pageHead, pageDefault],
  data() {
    return {
      isLoading: true,
      data: null,
      summary: null,
      statistics: [
        {
          title:
            'Распределение университетов участников программы по соответствию группе критериев допуска к отбору:',
          indicator: {
            type: 'doughnut',
            summary: {
              value: 121,
              label: 'Всего университетов',
            },
            items: [
              {
                label: 'Группа 1 - участники программы (основной трек)',
                value: 100,
                // postfix: 'университетов',
              },
              {
                label: 'Группа 2 - университеты творческой направленности',
                value: 5,
                // postfix: 'университетов',
              },
              {
                label: 'Группа 3 - кандидаты на участие в программе',
                value: 15,
                // postfix: 'университетов',
              },
              {
                label: 'Группа 4 - участники программы (реорганизация)',
                value: 1,
                // postfix: 'университет',
              },
            ],
          },
        },
        {
          title:
            'Распределение университетов участников программы по ведомственной принадлежности:',
          list: {
            icon: 'build-2',
            items: [
              {
                label:
                  'Министерство науки и высшего образования Российской Федерации',
                value: 87,
              },
              {
                label: 'Министерство здравоохранения Российской Федерации',
                value: 14,
              },
              { label: 'Министерство культуры Российской Федерации', value: 5 },
              {
                label: 'Министерство сельского хозяйства Российской Федерации',
                value: 4,
              },
              {
                label: 'Министерство просвещения Российской Федерации',
                value: 3,
              },
              { label: 'Правительство Российской Федерации', value: 2 },
              {
                label:
                  'Департамент образования и молодежной политики Ханты-Мансийского автономного округа - Югры',
                value: 1,
              },
              {
                label: 'Департамент образования и науки города Москвы',
                value: 1,
              },
              {
                label: 'Министерство иностранных дел Российской Федерации',
                value: 1,
              },
              {
                label: 'Министерство транспорта Российской Федерации',
                value: 1,
              },
              { label: 'Министерство обороны Российской Федерации', value: 1 },
              {
                label: 'Федеральное агентство железнодорожного транспорта',
                value: 1,
              },
            ],
          },
        },
        {
          title:
            'Распределение университетов участников программы по типу гранта',
          indicator: {
            type: 'stacked-single',
            summary: {
              value: 121,
              label: 'университет участник программы',
            },
            items: [
              {
                label: 'Университетов кандидатов',
                value: 15,
              },
              {
                label: 'Получатель только базовой части гранта',
                value: 60,
              },
              {
                label:
                  'Получатель специальной части гранта (Территориальное лидерство) ',
                value: 28,
              },
              {
                label:
                  'Получатель специальной части гранта (Исследовательское лидерство)',
                value: 18,
              },
            ],
          },
        },
        {
          title:
            'Распределение обучающихся по уровням образования в университетах-участниках программы',
          indicator: {
            type: 'stacked-single',
            items: [
              {
                label: 'Бакалавриат',
                value: 55.9,
                postfix: '%',
              },
              {
                label: 'Магистратура',
                value: 21.2,
                postfix: '%',
              },
              {
                label: 'Специалитет',
                value: 17,
                postfix: '%',
              },
              {
                label:
                  'Программы подготовки кадров высшей квалификации, человек (аспирантура, адъюнктура, ассистентура)',
                value: 4.2,
                postfix: '%',
              },
              {
                label:
                  'Программы подготовки кадров высшей квалификации, человек (ординатура)',
                value: 1.7,
                postfix: '%',
              },
            ],
          },
        },
        {
          title:
            'Распределение университетов участников программы по соответствию группе критериев допуска к отбору:',
          indicator: {
            type: 'doughnut',
            items: [
              {
                label: 'Инженерные науки',
                value: 40.1,
                postfix: '%',
              },
              {
                label: 'Математические и естественные науки',
                value: 8.5,
                postfix: '%',
              },
              {
                label: 'Науки об обществе',
                value: 24.2,
                postfix: '%',
              },
              {
                label: 'Образование и педагогические науки',
                value: 5.5,
                postfix: '%',
              },
              {
                label: 'Гуманитарные науки',
                value: 5.2,
                postfix: '%',
              },
              {
                label: 'Сельскохозяйственные науки',
                value: 1.8,
                postfix: '%',
              },
              {
                label: 'Искусство и культура',
                value: 1.7,
                postfix: '%',
              },
              {
                label: 'Здравоохранение и медицинские науки',
                value: 13,
                postfix: '%',
              },
            ],
          },
        },
        {
          title: 'Сведения о профессорско-преподавательском составе',
          info: [
            {
              label:
                'ППС Российской Федерации работают в университетах участниках программы ',
              value: '45.1 %',
            },
            {
              label:
                'ППС РФ, имеющих степень доктора наук, работают в университетах участниках программы',
              value: '48.9 %',
            },
            {
              label:
                'ППС РФ, имеющих степень кандидата наук, работают в университетах участниках программы   ',
              value: '43.9 %',
            },
          ],
        },
        {
          title:
            'Научных работников Российской Федерации работают в университетах участниках программы',
          info: [
            {
              label:
                'Научных работников Российской Федерации работают в университетах участниках программы',
              value: '53.6 %',
            },
            {
              label:
                'Научных работников РФ, имеющих степень доктора наук, работают в университетах участниках программы ',
              value: '43.4 %',
            },
            {
              label:
                'Научных работников РФ, имеющих степень кандидата наук, работают в университетах участниках программы ',
              value: '67.8 %',
            },
          ],
        },
      ],
    }
  },
  async fetch() {
    this.isLoading = true

    const [{ data }] = await Promise.all([this.$api.analytics.get()])

    data.participants.forEach((participant) => {
      participant.group = GROUPS[+participant.group - 1]
    })

    this.data = data

    this.isLoading = false
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  methods: {
    resetFilter() {
      this.$refs.filter.resetFilter()
    },
  },
}
</script>

<style lang="scss">
.analytics-files {
  margin-top: 5.6rem;

  &__title {
    margin-bottom: 3.2rem;
    color: #000;
  }

  &__items {
    @include flexGap(3rem);

    @include --mobile {
      @include flexGap(2rem);

      > * {
        flex: 1 1 100%;
      }
    }
  }
}
</style>
