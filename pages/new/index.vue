<template>
  <div>
    <MainFirstScreen2 :slides="page.firstScreen.slides" />
    <MainCells :cells="page.cells" class="_background" />
    <MainPrograms :programs="page.programs" class="_background" />

    <Section to="/news" :arrow-text="lang['news.all']" :title="page.newsTitle">
      <Posts :posts="page.posts" />
    </Section>

    <!--    <Section :title="page.history.title">-->
    <!--      <TheHistory :events="page.history.events" />-->
    <!--    </Section>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetchV2 from '~/assets/js/vue-mixins/page-data-fetch-v2'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/new/Section'
import Posts from '~/components/new/Posts'
import MainFirstScreen2 from '~/components/MainFirstScreen2'
import MainCells from '~/components/new/MainCells'
import MainPrograms from '~/components/new/MainPrograms'

export default {
  components: {
    MainPrograms,
    MainFirstScreen2,
    MainCells,
    Posts,
    Section,
  },

  mixins: [pageDataFetchV2, pageHead, pageDefault],
  computed: {
    ...mapState('default', ['lang']),
  },
  created() {},
}
</script>

<style></style>
