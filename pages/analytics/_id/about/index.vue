<template>
  <div class="analytics-about">
    <Section background small-head :title="lang['analytics.participation']">
      <ProgramParticipation />
    </Section>

    <Statistics :sections="sections" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Section from '~/components/layout/Section'
import ProgramParticipation from '~/components/ProgramParticipation'
import Statistics from '~/components/statistics/Statistics'

export default {
  name: 'Index',

  components: { Statistics, ProgramParticipation, Section },

  asyncData({ route }) {
    console.log(route)
  },

  computed: {
    ...mapState('default', ['lang']),
    ...mapState('organization', { organization: 'data' }),
    ...mapGetters('organization', ['sections']),
  },
}
</script>

<style lang="scss">
.analytics-about {
  margin-top: 6rem;
}
</style>
