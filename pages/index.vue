<template>
  <div>
    <Section has-overflow is-layout>
      <FirstScreen
        background="/3d/i/main.png"
        :titles="page.mainScreenTitles"
        link
        major
      />
    </Section>
    <Section background>
      <Quotes :quotes="page.quotes" />
    </Section>

    <Participation
      :title="page.participation.title"
      :subtitle="page.participation.subtitle"
      :text="page.participation.text"
      :href="page.participation.href"
    />

    <TheCountdown
      :section-title="page.request.title"
      :title="page.request.title"
      :subtitle="page.request.subtitle"
      :date-to="page.request.dateTo"
    ></TheCountdown>

    <RegistrationPreview
      :forehead="page.registration.forehead"
      :title="page.registration.title"
    />

    <Section>
      <PagesSection :pages="page.links" />
    </Section>

    <Section
      v-view="$utils.scrollCenterDetection"
      background
      :title="page.newsTitle"
    >
      <Posts colored />
    </Section>

    <Section v-view="$utils.scrollCenterDetection" :title="page.history.title">
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
import Quotes from '~/components/Quotes'
import Posts from '~/components/Posts'
import Participation from '~/components/Participation'
import FirstScreen from '~/components/FirstScreen'
import TheCountdown from '~/components/TheCountdown'
import RegistrationPreview from '~/components/RegistrationPreview'
import PagesSection from '~/components/PagesSection'
import TheHistory from '~/components/TheHistory'

export default {
  components: {
    PagesSection,
    RegistrationPreview,
    FirstScreen,
    TheCountdown,
    Posts,
    Section,
    Quotes,
    Participation,
    TheHistory,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
  created() {
    /* TODO */
    if (!this.page.registration) {
      this.page.registration = {
        forehead: 'Регистрация на мероприятие',
        title: 'Примите участие в очном мероприятии программы «ПРИОРИТЕТ-2О3О»',
      }
    }
  },
}
</script>

<style></style>
