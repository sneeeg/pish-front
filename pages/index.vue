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
    <BlockquoteBlock />
    <Section :title="page.newsTitle">
      <Posts />
    </Section>
  </div>
</template>

<script>
import Section from '~/components/layout/Section'
import TextBlock from '~/components/TextBlock'
import BlockquoteBlock from '~/components/BlockquoteBlock'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Posts from '~/components/Posts'

export default {
  components: {
    Posts,
    TextBlock,
    Section,
    BlockquoteBlock,
  },
  mixins: [pageDataFetch, pageHead],
}
</script>

<style></style>
