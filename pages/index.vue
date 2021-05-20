<template>
  <div>
    <Section is-layout>
      <FirstScreen :title="page.mainScreenTitles[0]" link major />
    </Section>
    <Section background>
      <Blockquote :text="page.quote.content" :author="page.quote.author" />
    </Section>
    <Section :title="page.participation.title">
      <Participation
        :title="page.participation.subtitle"
        :text="page.participation.text"
        :href="page.participation.href"
      />
    </Section>
    <Section :title="page.newsTitle">
      <Posts />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import Blockquote from '~/components/Blockquote'
import Posts from '~/components/Posts'
import Participation from '~/components/Participation'
import FirstScreen from '~/components/FirstScreen'

export default {
  components: {
    FirstScreen,
    Posts,
    Section,
    Blockquote,
    Participation,
  },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style></style>
