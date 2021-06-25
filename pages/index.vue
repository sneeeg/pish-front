<template>
  <div>
    <MainFirstScreen
      :title="page.firstScreen.title"
      :subtitle="page.firstScreen.subtitle"
      :main-cell="page.firstScreen.mainCell"
      :cells="page.firstScreen.cells"
    />

    <Section is-layout>
      <Ads :items="page.ads" />
    </Section>

    <Section background is-layout>
      <Quotes :quotes="page.quotes" />
    </Section>

    <Section v-if="false" v-view="$utils.scrollCenterDetection">
      <PagesSection :pages="page.links" />
    </Section>

    <Section v-view="$utils.scrollCenterDetection" :title="page.newsTitle">
      <Posts />
    </Section>

    <!--    <Section v-view="$utils.scrollCenterDetection" :title="page.history.title">-->
    <!--      <TheHistory :events="page.history.events" />-->
    <!--    </Section>-->
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
import PagesSection from '~/components/PagesSection'
// import TheHistory from '~/components/TheHistory'
import MainFirstScreen from '~/components/MainFirstScreen'
import Ads from '~/components/Ads'

export default {
  components: {
    Ads,
    MainFirstScreen,
    PagesSection,
    Posts,
    Section,
    Quotes,
    // TheHistory,
  },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
  created() {},
}
</script>

<style></style>
