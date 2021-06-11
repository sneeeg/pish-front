<template>
  <div>
    <Section is-layout>
      <FirstScreen
        :title="page.title"
        :lead="page.lead"
        background="/i/registration.png"
        registration
        :html-content="document"
      />
    </Section>

    <RegistrationForm />
  </div>
</template>

<script>
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import FirstScreen from '~/components/FirstScreen'
import RegistrationForm from '~/components/RegistrationForm'

export default {
  name: 'Registration',
  components: { RegistrationForm, FirstScreen, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
  computed: {
    document() {
      return `<a href="${this.page.document.href}" class="doc" rel="nofollow noopener" target="_blank"><span>${this.page.document.text}</span></a>`
    },
  },
}
</script>

<style scoped></style>
