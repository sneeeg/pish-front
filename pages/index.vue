<template>
  <div>
    <Section is-layout>
      <FirstScreen :title="page.mainScreenTitles[0]" link major />
    </Section>
    <Section background>
      <Blockquote :text="page.quote.content" :author="page.quote.author" />
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
    <Section v-view="$utils.scrollCenterDetection" :title="page.newsTitle">
      <Posts />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import Blockquote from '~/components/Blockquote'
import Posts from '~/components/Posts'
import Participation from '~/components/Participation'
import FirstScreen from '~/components/FirstScreen'
import TheCountdown from '~/components/TheCountdown'

export default {
  components: {
    FirstScreen,
    TheCountdown,
    Posts,
    Section,
    Blockquote,
    Participation,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style></style>
