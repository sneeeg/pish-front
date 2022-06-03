<template>
  <div>
    <Section>
      <MainFirstScreen2 :slides="page.firstScreen.slides" />
    </Section>
    <Section background>
      <MainCells :cells="page.cells" />
    </Section>
    <Section background>
      <MainPrograms :programs="page.programs" />
    </Section>

    <Section
      to="/calendar"
      :arrow-text="lang['events.all']"
      :title="page.sectionTitles.events"
    >
      <MainEvents :sections="page.events" />
    </Section>

    <Section
      to="/news"
      :arrow-text="lang['members.all']"
      :title="page.sectionTitles.members"
      background
    >
      <MainMembers :sections="page.members" />
    </Section>

    <Section
      to="/news"
      :arrow-text="lang['news.all']"
      :title="page.sectionTitles.news"
    >
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
import MainEvents from '~/components/new/MainEvents'
import MainMembers from '~/components/new/MainMembers'

export default {
  components: {
    MainMembers,
    MainEvents,
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
