<template>
  <div>
    <Section is-layout>
      <FirstScreen
        :title="page.pageTitle"
        :lead="page.lead"
        :video-about="page.video"
        about
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

    <Section id="progress" background :title="page.progress.title">
      <Progress
        :year="page.progress.year"
        :active-stage="page.progress.activeStage"
        :items="page.progress.items"
      />
    </Section>

    <Section id="priority" :title="page.priorities.title">
      <PriorityBlock :priorities="page.priorities.items" />
    </Section>

    <Section id="tasks" background>
      <SupportBlock :title="page.tasks.title" :sections="page.tasks.sections" />
    </Section>

    <Section v-if="false">
      <PagesSection :pages="page.links" />
    </Section>

    <Section v-if="false" id="architecture" :title="page.architecture.title">
      <ArchitectureBlock :architecture="page.architecture" />
    </Section>

    <!--    <Section-->
    <!--      -->
    <!--      :title="page.documents.title"-->
    <!--    >-->
    <!--      <Documents  :documents="page.documents.items" />-->
    <!--    </Section>-->
    <Section v-if="false" :title="page.history.title">
      <TheHistory :events="page.history.events" />
    </Section>
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
import PagesSection from '~/components/PagesSection'
import TheHistory from '~/components/TheHistory'

export default {
  name: 'About',
  components: {
    RegistrationPreview,
    Section,
    PriorityBlock,
    FirstScreen,
    SupportBlock,
    ArchitectureBlock,
    Progress,
    PagesSection,
    TheHistory,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
