<template>
  <Loader v-if="isLoading" />

  <div v-else-if="data" class="analytics">
    <Section>
      <h1 class="council__title _visually-h2">{{ page.pageTitle }}</h1>
    </Section>

    <Section background :title="page.participants.title"> </Section>

    <Section :title="page.candidates.title"></Section>

    <Section background :title="page.summary.title"></Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import Section from '~/components/layout/Section'
import Loader from '~/components/Loader'

export default {
  name: 'Commission',
  components: { Loader, Section },
  mixins: [pageDataFetch, pageHead, pageDefault],
  data() {
    return {
      isLoading: true,
      data: null,
      summary: null,
    }
  },
  async fetch() {
    this.isLoading = true

    // TODO добавить показаьели
    const [{ data }] = await Promise.all([this.$api.analytics.get()])

    await this.$utils.delay(500, true)

    this.data = data

    // TODO доюавить показаьели
    // this.summary = summary

    this.isLoading = false
  },
  computed: {
    ...mapState('default', ['lang']),
  },
}
</script>

<style lang="scss"></style>
