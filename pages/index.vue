<template>
  <div>
    <TaskAccordionBlock title="Задачи программы" img="/tasks/2.png" />
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
import TextBlock from '~/components/TextBlock'
import TaskAccordionBlock from '~/components/TaskAccordionBlock'

export default {
  components: {
    TextBlock,
    TaskAccordionBlock,
  },
}
</script>

<style></style>
