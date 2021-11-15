<template>
  <Loader v-if="isLoading" />

  <div v-else-if="data" class="analytics">
    <Section>
      <h1 class="analytics__title _visually-h2">{{ page.pageTitle }}</h1>

      <HTMLContent class="analytics__description" :html="page.description" />

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
      <Statistics no-sections :sections="page.summary.sections"></Statistics>
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
import HTMLContent from '~/components/utils/HTMLContent'

const GROUPS = [
  'Группа 1 - участники программы (основной трек)',
  'Группа 2 - университеты творческой направленности',
  'Группа 3 - кандидаты на участие в программе',
  'Группа 4 - участники программы (реорганизация)',
]

export default {
  name: 'Index',
  components: {
    HTMLContent,
    ParticipantsFilter,
    Btn,
    File,
    Loader,
    Section,
    Statistics,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  data() {
    return {
      isLoading: true,
      data: null,
      summary: null,
    }
  },
  async fetch() {
    this.isLoading = true

    const [{ data }] = await Promise.all([this.$api.analytics.get()])

    await this.$utils.delay(250)

    data.participants.forEach((participant) => {
      participant.group = GROUPS[+participant.group - 1]
      participant.direction = []

      if (participant.isBase) {
        participant.direction.push('Базовая часть')
      }

      if (participant.special) {
        participant.direction.push(participant.special)
      }
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
.analytics {
  &__description {
    @include containerInnerSmall2;
    @include text-small;

    margin-top: 3.2rem;

    @include --mobile {
      margin-top: 2.4rem;
    }
  }
}

.analytics-files {
  margin-top: 4.2rem;

  @include --mobile {
    margin-top: 3.2rem;
  }

  &__title {
    margin-bottom: 3.2rem;
    color: #000;

    @include --mobile {
      margin-bottom: 2.4rem;
    }
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
