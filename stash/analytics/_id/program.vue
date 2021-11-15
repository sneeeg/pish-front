<template>
  <div class="organization-program">
    <div>
      <Section tag="div" class="_mb-0">
        <Breadcrumbs :items="breadcrumbs" />
      </Section>

      <Section :title="lang['analytics.program']">
        <template #prehead>
          <div class="organization-program__name">
            {{ organization.shortName }}
          </div>
        </template>

        <template #default>
          <ProgramComponent />
        </template>
      </Section>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Section from '~/components/layout/Section'
import Breadcrumbs from '~/components/Breadcrumbs'
import ProgramComponent from '~/components/ProgramComponent'

export default {
  name: 'Program',
  components: { Section, Breadcrumbs, ProgramComponent },
  mixins: [pageHead, pageDefault],
  async asyncData({ store, route, $nuxt, $api }) {
    try {
      const [{ data }] = await Promise.all([
        $api.pages.analytics(),
        store.dispatch('organization/getOrganization', { id: route.params.id }),
      ])

      return {
        parent: data,
      }
    } catch (e) {
      return $nuxt.error({ statusCode: 404, message: 'Organization not found' })
    }
  },
  computed: {
    ...mapState('organization', { organization: 'data' }),
    ...mapState('default', ['lang']),
    page() {
      return {
        title: `${this.lang['analytics.program']} ${this.organization.shortName} ${this.lang['base.additionTabLabel']}`,
        metaTitle: `${this.lang['analytics.program']} ${this.organization.name}`,
        metaDescription: `${this.lang['analytics.program']} ${this.organization.name}`,
      }
    },
    breadcrumbs() {
      return [
        {
          text: this.parent.pageTitle,
          to: '/analytics',
        },
        {
          text: this.organization.shortName,
          to: `/analytics/${this.$route.params.id}/about`,
          force: true,
        },
        {
          text: this.lang['analytics.program'],
          to: '',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.organization-program {
  &__name {
    @include h5;
    margin-bottom: 2.4rem;
    color: $color_grey_text;

    font-weight: normal;
  }
}
</style>
