<template>
  <div>
    <Section title="test">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
      animi assumenda consequuntur, debitis magni maiores minima minus odio
      odit, officia quae qui quis ratione rem rerum sequi! Blanditiis, possimus.
    </Section>
    <Section title="test" background>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
      animi assumenda consequuntur, debitis magni maiores minima minus odio
      odit, officia quae qui quis ratione rem rerum sequi! Blanditiis, possimus.
    </Section>
    <TextBlock title="text-content"></TextBlock>
    <Section background>
      <Blockquote :text="page.quote.content" :author="page.quote.author" />
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
import TextBlock from '~/components/TextBlock'
import Blockquote from '~/components/Blockquote'
import Posts from '~/components/Posts'

export default {
  components: {
    Posts,
    TextBlock,
    Section,
    Blockquote,
  },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style></style>
