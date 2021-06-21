<template>
  <div>
    <Section is-layout>
      <FirstScreen
        :title="page.pageTitle"
        :lead="page.lead"
        background="/3d/i/background.jpg"
      />
    </Section>

    <RegistrationPreview
      v-if="false"
      :forehead="page.registration.forehead"
      :title="page.registration.title"
    />

    <Section v-if="false">
      <SupportBlock
        :title="page.support.title"
        :subtitle="page.support.subtitle"
        :sections="page.support.sections"
      />
    </Section>

    <Section
      id="progress"
      v-view="$utils.scrollCenterDetection"
      background
      :title="page.progress.title"
    >
      <Progress
        :year="page.progress.year"
        :active-stage="page.progress.activeStage"
        :items="page.progress.items"
      />
    </Section>

    <Section
      id="priority"
      v-view="$utils.scrollCenterDetection"
      :title="page.priorities.title"
    >
      <PriorityBlock :priorities="page.priorities.items" />
    </Section>

    <Section
      id="tasks"
      ref="tasks"
      v-view="$utils.scrollCenterDetection"
      background
      :title="page.tasks.title"
    >
      <Tasks :content="page.tasks.content" />
    </Section>

    <Section v-if="false" v-view="$utils.scrollCenterDetection">
      <PagesSection :pages="page.links" />
    </Section>

    <Section
      id="architecture"
      v-view="$utils.scrollCenterDetection"
      :title="page.architecture.title"
    >
      <ArchitectureBlock :architecture="page.architecture" />
    </Section>

    <!--    <Section-->
    <!--      v-view="$utils.scrollCenterDetection"-->
    <!--      :title="page.documents.title"-->
    <!--    >-->
    <!--      <Documents v-scroll-element :documents="page.documents.items" />-->
    <!--    </Section>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import PriorityBlock from '~/components/PriorityBlock'
import FirstScreen from '~/components/FirstScreen'
import SupportBlock from '~/components/SupportBlock'
import ArchitectureBlock from '~/components/ArchitectureBlock'
import Progress from '~/components/Progress'
import RegistrationPreview from '~/components/RegistrationPreview'
import Tasks from '~/components/Tasks'
import PagesSection from '~/components/PagesSection'
import scrollAnimation from '~/assets/js/composables/animations/scroll-animation'

export default {
  name: 'About',
  components: {
    Tasks,
    RegistrationPreview,
    Section,
    PriorityBlock,
    FirstScreen,
    SupportBlock,
    ArchitectureBlock,
    Progress,
    PagesSection,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
  mounted() {
    if (this.$route.hash === '#tasks') {
      scrollAnimation(this.$refs.tasks.$el)
    }
  },
}
</script>

<style lang="scss"></style>
