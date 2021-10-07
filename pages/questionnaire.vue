<template>
  <div>
    <Section>
      <h1>
        {{ page.pageTitle }}
      </h1>
    </Section>

    <Section background>
      <QuestionnaireForm />
    </Section>
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Section from '~/components/layout/Section'
import QuestionnaireForm from '~/components/QuestionnaireForm'

export default {
  name: 'Questionnaire',
  components: { QuestionnaireForm, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
}
</script>

<style lang="scss"></style>
