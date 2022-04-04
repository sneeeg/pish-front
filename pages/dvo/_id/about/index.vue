<template>
  <div class="analytics-about">
    <Section small-head :title="lang['analytics.universityRector']" background>
      <div class="analytics-about-rector">
        <PersonCardLg
          :name="organization.rectorName"
          :photo-url="organization.rectorPhoto"
          outlined
          :text="organization.rectorPosition"
          :sub-text="applyDate"
        />
      </div>

      <template v-if="organization.biography">
        <h3 class="analytics-about-rector__title">
          {{ lang['analytics.biography'] }}
        </h3>

        <HTMLContent
          class="analytics-about-rector__content"
          :html="organization.biography"
        >
        </HTMLContent>
      </template>
    </Section>

    <Section small-head :title="lang['analytics.participation']">
      <ProgramParticipation padding />
    </Section>

    <Statistics background-reverse :sections="sections" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Section from '~/components/layout/Section'
import ProgramParticipation from '~/components/ProgramParticipation'
import Statistics from '~/components/statistics/Statistics'
import PersonCardLg from '~/components/PersonCardLg'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'Index',

  components: {
    HTMLContent,
    Statistics,
    ProgramParticipation,
    Section,
    PersonCardLg,
  },

  computed: {
    ...mapState('default', ['lang']),
    ...mapState('organization', { organization: 'data' }),
    ...mapGetters('organization', ['sections']),

    applyDate() {
      const str = this.organization.applyDate

      if (!str) return ''

      return `<strong>${this.lang['analytics.applied']}:</strong> ${str}`
    },
  },
}
</script>

<style lang="scss">
.analytics-about {
  margin-top: 6rem;
}

.analytics-about-rector {
  @include containerInnerSmall2;

  &__title {
    @include text-subtitle;

    margin-top: 6rem;
    color: #6b6b74;

    @include --mobile {
      margin-top: 4.2rem;
    }
  }

  &__content {
    margin-top: 3.2rem;

    @include --mobile {
      margin-top: 2.4rem;
    }
  }
}
</style>
