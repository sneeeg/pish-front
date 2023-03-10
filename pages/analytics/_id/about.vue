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
  name: 'About',
  components: { SingleTabs, OrganizationHead, Section, Breadcrumbs },

  mixins: [pageHead, pageDefault],

  middleware({ app, route, $utils, redirect }) {
    app.router.afterEach((to, from) => {
      window.scrollTo({
        top: 0,
      })
    })
  },

  async asyncData({ store, route, error, $api }) {
    try {
      const { data } = await $api.pages.analytics()
      await store.dispatch('organization/getOrganization', {
        id: route.params.id,
        parent: data,
      })

      return {
        parent: data,
      }
    } catch (e) {
      return error({ statusCode: 404, message: 'Organization not found' })
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
          to: '/analytics',
        },
        {
          text: this.organization.shortName,
          to: '',
        },
      ]
    },
  },
  methods: {
    changeTab(id) {
      this.$router.push(
        this.localeRoute({
          name: `analytics-id-about${id === 'about' ? '' : `-${id}`}`,
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
