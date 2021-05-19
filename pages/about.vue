<template>
  <div>
    <Section :title="page.tasks.title" background>
      <TaskAccordionBlock />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import TaskAccordionBlock from '~/components/TaskAccordionBlock'

export default {
  name: 'About',
  components: { TaskAccordionBlock, Section },
  mixins: [pageDataFetch, pageHead],
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
