<template>
  <div class="page">
    <Section is-layout>
      <FirstScreen adaptive-top :title="page.title" />
    </Section>
    <Section :title="page.steps.title" :has-overflow="false">
      <TheStages :stages="page.steps.sections"></TheStages>
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import FirstScreen from '~/components/FirstScreen'
import TheStages from '~/components/TheStages'

export default {
  name: 'Participation',
  components: { FirstScreen, Section, TheStages },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
