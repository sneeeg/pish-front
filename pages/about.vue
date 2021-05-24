<template>
  <div>
    <Section is-layout>
      <FirstScreen
        :title="page.title"
        :lead="page.lead"
        background="/3d/i/background.jpg"
      />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.tasks.title"
      background
    >
      <AccordionBlock :tasks="page.tasks.items" />
    </Section>
    <Section>
      <SupportBlock
        :title="page.support.title"
        :subtitle="page.support.subtitle"
        :sections="page.support.sections"
      />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.priorities.title"
      background
    >
      <PriorityBlock :priorities="page.priorities.items" />
    </Section>
    <Section v-view="$utils.scrollCenterDetection" :title="page.progress.title">
      <Progress
        :year="page.progress.year"
        :active-stage="page.progress.activeStage"
        :items="page.progress.items"
      />
    </Section>
    <Section
      v-view="$utils.scrollCenterDetection"
      :title="page.architecture.title"
      background
    >
      <ArchitectureBlock :architecture="page.architecture" />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import AccordionBlock from '~/components/AccordionBlock'
import PriorityBlock from '~/components/PriorityBlock'
import FirstScreen from '~/components/FirstScreen'
import SupportBlock from '~/components/SupportBlock'
import ArchitectureBlock from '~/components/ArchitectureBlock'
import Progress from '~/components/Progress'

export default {
  name: 'About',
  components: {
    AccordionBlock,
    Section,
    PriorityBlock,
    FirstScreen,
    SupportBlock,
    ArchitectureBlock,
    Progress,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
