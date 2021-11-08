<template>
  <div>
    <MainFirstScreen
      :title="page.firstScreen.title"
      :subtitle="page.firstScreen.subtitle"
      :main-cell="page.firstScreen.mainCell"
      :cells="page.firstScreen.cells"
    />

    <Section background is-layout>
      <Quotes :quotes="page.quotes" />
    </Section>

    <Section v-if="false">
      <PagesSection :pages="page.links" />
    </Section>

    <Section to="/news" :arrow-text="lang['news.all']" :title="page.newsTitle">
      <Posts />
    </Section>

    <!--    <Section :title="page.history.title">-->
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

export default {
  components: {
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
