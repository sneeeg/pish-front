<template>
  <Loader v-if="isLoading" />

  <div v-else-if="data" class="analytics">
    <Section>
      <h1 class="council__title _visually-h2">{{ page.pageTitle }}</h1>

      <div v-if="data.files && !!data.files.length" class="analytics-files">
        <div class="analytics-files__title">
          {{ lang['base.files'] }}
        </div>

        <div class="analytics-files__items">
          <File
            v-for="(file, index) in data.files"
            :key="index"
            v-bind="file"
          />
        </div>
      </div>
    </Section>

    <Section small-head background :title="page.participants.title">
      <template #head>
        <Btn :text="lang['base.resetFilter']" :arrow="false" small grey />
      </template>

      <template #default>
        <ParticipantsFilter />
      </template>
    </Section>

    <Section small-head :title="page.summary.title"></Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDataFetch from '~/assets/js/vue-mixins/page-data-fetch'
import Section from '~/components/layout/Section'
import Loader from '~/components/Loader'
import File from '~/components/utils/File'
import Btn from '~/components/controls/Btn'
import ParticipantsFilter from '~/components/ParticipantsFilter'

export default {
  name: 'Analytics',
  components: { ParticipantsFilter, Btn, File, Loader, Section },
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

<style lang="scss">
.analytics-files {
  margin-top: 5.6rem;

  &__items {
    @include flexGap(3rem);

    padding-top: 2.4rem;
  }
}
</style>
