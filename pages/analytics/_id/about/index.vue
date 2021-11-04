<template>
  <div class="analytics-about">
    <Section background small-head :title="lang['analytics.participation']">
      <ProgramParticipation />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import ProgramParticipation from '~/components/ProgramParticipation'
export default {
  name: 'Index',

  components: { ProgramParticipation, Section },

  computed: {
    ...mapState('default', ['lang']),
    ...mapState('organization', { organization: 'data' }),
  },
}
</script>

<style lang="scss">
.analytics-about {
  margin-top: 6rem;
}
</style>
