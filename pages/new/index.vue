<template>
  <div>
    <MainFirstScreen2 :slides="page.firstScreen.slides" />
    <MainCells :cells="page.cells" class="_background" />

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
import Posts from '~/components/Posts'
// import TheHistory from '~/components/TheHistory'
import MainFirstScreen2 from '~/components/MainFirstScreen2'
import MainCells from '~/components/new/MainCells'

export default {
  components: {
    MainFirstScreen2,
    MainCells,
    Posts,
    Section,
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
