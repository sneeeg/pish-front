<template>
  <div class="page">
    <Section>
      <h1>{{ page.title }}</h1>
    </Section>

    <Section background>
      <div class="yandex-form">
        <div class="yandex-form__item">
          <iframe
            ref="iframe"
            :src="`https://forms.yandex.ru/cloud/${page.id}/?iframe=1`"
            frameborder="0"
            :name="`ya-form-${page.id}`"
            width="650"
          ></iframe>
        </div>
      </div>
    </Section>
  </div>
</template>

<script>
import { YANDEX_FORMS } from '~/assets/js/constants'
import pageHead from '~/assets/js/vue-mixins/page-head'
import pageDefault from '~/assets/js/vue-mixins/page-default'
import Section from '~/components/layout/Section'

export default {
  name: 'Name',

  components: {
    Section,
  },
  mixins: [pageHead, pageDefault],

  async asyncData({ route, error, $api }) {
    let page

    try {
      const { data, errors } = await $api.forms.getBySlug(route.params.name)

      if (!data || errors?.length) {
        throw new Error('Page not found')
      }

      page = data

      return {
        page,
      }
    } catch (e) {
      page = YANDEX_FORMS.items.find((item) => item.slug === route.params.name)

      if (!page) {
        error({ statusCode: 404, message: 'Page not found.' })
      }

      return {
        page,
      }
    }
  },

  mounted() {
    if (document.querySelector('script[data-yandex-form]')) return

    const script = document.createElement('script')
    script.src = YANDEX_FORMS.module
    script.setAttribute('data-yandex-form', '')

    document.head.appendChild(script)
  },
}
</script>

<style lang="scss">
.yandex-form {
  iframe {
    width: 100%;
  }
}
</style>
