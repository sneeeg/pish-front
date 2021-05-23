<template>
  <div>
    <Section is-layout>
      <FirstScreen :title="page.title" :lead="page.lead" />
    </Section>
    <Section :title="page.tasks.title" background>
      <AccordionBlock :tasks="page.tasks.items" />
    </Section>
    <Section :title="page.priorities.title" background>
      <PriorityBlock :priorities="page.priorities.items" />
    </Section>
    <Section>
      <SupportBlock
        :title="page.support.title"
        :subtitle="page.support.subtitle"
        :sections="page.support.sections"
      />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import AccordionBlock from '~/components/AccordionBlock'
import PriorityBlock from '~/components/PriorityBlock'
import FirstScreen from '~/components/FirstScreen'
import SupportBlock from '~/components/SupportBlock'

export default {
  name: 'About',
  components: {
    AccordionBlock,
    Section,
    PriorityBlock,
    FirstScreen,
    SupportBlock,
  },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
