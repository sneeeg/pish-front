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

    <Section
      v-if="
        $i18n.locale !== 'en' &&
        page.councilMembers &&
        page.councilMembers.items &&
        page.councilMembers.items.length
      "
      to="/council"
      :arrow-text="lang['base.allList']"
      :title="page.councilMembers.title"
      background
    >
      <div class="persons-list">
        <PersonCard
          v-for="(member, index) in page.councilMembers.items"
          :key="index"
          class="persons-list__item"
          :avatar="{ src: member.image, alt: member.name }"
          :name="member.name"
          :description="member.description"
          grey
        />
      </div>
    </Section>

    <Section
      v-if="
        $i18n.locale !== 'en' &&
        page.commissionMembers &&
        page.commissionMembers.items &&
        page.commissionMembers.items.length
      "
      to="/commission"
      :arrow-text="lang['base.allList']"
      :title="page.commissionMembers.title"
    >
      <div class="persons-list">
        <PersonCard
          v-for="(member, index) in page.commissionMembers.items"
          :key="index"
          class="persons-list__item"
          :avatar="{ src: member.image, alt: member.name }"
          :name="member.name"
          :description="member.description"
        />
      </div>
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

    <Section id="steps" :title="page.steps.title" :has-overflow="false">
      <TheStages :stages="page.steps.sections"></TheStages>
    </Section>

    <Section v-if="false">
      <PagesSection :pages="page.links" />
    </Section>

    <Section
      v-if="false"
      id="architecture"
      background
      :title="page.architecture.title"
    >
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
import PersonCard from '~/components/PersonCard'
import TheStages from '~/components/TheStages'

export default {
  name: 'About',
  components: {
    PersonCard,
    RegistrationPreview,
    Section,
    PriorityBlock,
    FirstScreen,
    SupportBlock,
    ArchitectureBlock,
    Progress,
    PagesSection,
    TheHistory,
    TheStages,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
    isDev() {
      return process.env.NODE_ENV === 'development'
    },
  },
  created() {
    if (process.env.NODE_ENV !== 'production') {
      this.page.councilMembers.items = this.$utils.fillEmptyArray(
        {
          image: '/i/commission/example.jpg',
          name: 'Фальков Валерий Николаевич',
          description:
            'Министр науки и высшего образования Российской Федерации,председеталь комиссии программы Приоритет 2030',
        },
        2
      )

      this.page.commissionMembers.items = this.$utils.fillEmptyArray(
        {
          image: '/i/commission/example.jpg',
          name: 'Фальков Валерий Николаевич',
          description:
            'Министр науки и высшего образования Российской Федерации,председеталь комиссии программы Приоритет 2030',
        },
        4
      )
    }
  },
}
</script>

<style lang="scss">
.persons-list {
  @include flexGap(3rem);

  > * {
    flex: 1 1 45%;
    max-width: calc(100% / 2 - 3rem);

    @include --tablet {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
}
</style>
