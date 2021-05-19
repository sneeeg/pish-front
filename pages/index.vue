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
  </div>
</template>

<script>
import Section from '~/components/layout/Section'
import TextBlock from '~/components/TextBlock'

export default {
  components: {
    TextBlock,
    Section,
  },
}
</script>

<style></style>
