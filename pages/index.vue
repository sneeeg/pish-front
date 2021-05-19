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
  </div>
</template>

<script>
import TextBlock from '~/components/TextBlock'
import BlockquoteBlock from '~/components/BlockquoteBlock'

export default {
  components: {
    TextBlock,
    BlockquoteBlock,
  },
}
</script>

<style></style>
