<template>
  <div class="page">
    <div v-if="window.isDesktopSize" class="page__back">
      <ArrowLink
        v-if="routing.hasHistory"
        :text="lang['base.back']"
        to="/"
        arrow-left
        @click.native.prevent="$router.go(-1)"
      />
    </div>
    <Section :title="lang['search.title']" :has-overflow="false">
      <SearchModule />
    </Section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import pageHead from '~/assets/js/vue-mixins/page-head'
import ArrowLink from '~/components/controls/ArrowLink'
import SearchModule from '~/components/SearchModule'

export default {
  name: 'Search',
  components: {
    SearchModule,
    Section,
    ArrowLink,
  },
  mixins: [pageHead],
  data() {
    return {
      request: this.$route.query.request,
    }
  },
  computed: {
    ...mapState('default', ['lang', 'settings', 'routing']),
    ...mapState('responsive', ['window']),
    page() {
      const title = this.request
        ? `${this.request} - ${this.lang['search.title']} ${this.settings.siteName}`
        : `${this.lang['search.title']} - ${this.settings.siteName}`

      return { title, metaTitle: title }
    },
  },
}
</script>

<style></style>
