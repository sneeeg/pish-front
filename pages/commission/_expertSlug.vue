<template>
  <div class="expert-detail">
    <Section tag="div" class="_mb-0">
      <Breadcrumbs :items="breadcrumbs" />
    </Section>
    <Section>
      <div class="expert-detail-hero">
        <div v-if="page.picture" class="expert-detail-hero__img">
          <img :src="page.picture" :alt="page.name" />
        </div>
        <div class="expert-detail-hero__content">
          <div class="expert-detail-hero__head">
            <h1
              class="expert-detail-hero__title _visually-h2"
              v-html="page.name"
            ></h1>
            <p
              v-if="page.position"
              class="expert-detail-hero__subtitle"
              v-html="page.position"
            ></p>
          </div>

          <p
            v-if="page.description"
            class="expert-detail-hero__description"
            v-html="page.description"
          ></p>
        </div>
      </div>
    </Section>
  </div>
</template>

<script>
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Breadcrumbs from '~/components/Breadcrumbs'
import Section from '~/components/layout/Section'

export default {
  name: 'ExpertSlug',

  components: {
    Breadcrumbs,
    Section,
  },

  mixins: [pageHead, pageDefault],

  async asyncData({ $api, route, error }) {
    try {
      const { data: page, errors } = await $api.commission.getExpertBySlug(
        route.params.expertSlug || ''
      )

      if (!page || errors?.length) {
        throw new Error('Page not found')
      }

      page.title = page.metaTitle = page.name

      return {
        page,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found.' })
    }
  },

  data() {
    return {
      breadcrumbs: [],
    }
  },

  created() {
    this.breadcrumbs = [
      {
        to: '/about',
        text: 'О программе',
      },
      {
        to: '/commission',
        text: 'Комиссия Минобрнауки РФ по отбору в программу',
      },
      {
        to: '',
        text: this.page.name,
      },
    ]
  },
}
</script>
