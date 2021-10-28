<template>
  <div class="organization">
    <Section tag="div" class="_mb-0">
      <Breadcrumbs :items="breadcrumbs" />
    </Section>

    <Section tag="div" class="_mb-0">
      <OrganizationHead />

      <div class="organization__view">
        <SingleTabs v-model="currentTab" :items="tabs" @change="changeTab" />
      </div>
    </Section>

    <NuxtChild />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Breadcrumbs from '~/components/Breadcrumbs'
import Section from '~/components/layout/Section'
import OrganizationHead from '~/components/OrganizationHead'
import SingleTabs from '~/components/SingleTabs'

export default {
  name: 'Id',
  components: { SingleTabs, OrganizationHead, Section, Breadcrumbs },
  mixins: [pageHead, pageDefault],
  async asyncData({ store, route, $nuxt, $api }) {
    try {
      const [{ data }] = await Promise.all([
        $api.pages.analytics(),
        store.dispatch('organization/getOrganization'),
      ])

      return {
        parent: data,
      }
    } catch (e) {
      return $nuxt.error({ statusCode: 404, message: 'Organization not found' })
    }
  },
  data() {
    return {
      currentTab:
        this.$route.matched[1]?.path.split('/').slice(-1)[0] || 'about',
    }
  },
  computed: {
    ...mapState('organization', { organization: 'data' }),
    ...mapState('default', ['lang']),
    page() {
      return {
        title:
          this.organization.shortName +
          ' ' +
          this.lang['base.additionTabLabel'],
        metaTitle: this.organization.name,
        metaDescription: this.organization.name,
      }
    },
    tabs() {
      return [
        {
          id: 'about',
          text: this.lang['analytics.about'],
        },
        {
          id: 'program',
          text: this.lang['analytics.program'],
        },
        {
          id: 'indicators',
          text: this.lang['analytics.indicators'],
        },
      ]
    },
    breadcrumbs() {
      return [
        {
          text: this.parent.pageTitle,
          href: '/analytics',
        },
        {
          text: this.organization.shortName,
          href: '',
        },
      ]
    },
  },
  methods: {
    changeTab(id) {
      this.$router.push(
        this.localeRoute({
          name: `analytics-id${id === 'about' ? '' : `-${id}`}`,
          params: { id: this.$route.params.id },
        })
      )
    },
  },
}
</script>

<style lang="scss">
.organization {
  &__view {
    margin-top: 8rem;

    @include --tablet {
      margin-top: 4rem;
    }
  }
}
</style>
