<template>
  <div>
    <Section :title="page.documents.title">
      <SingleTabs
        v-model="currentCategoryId"
        :items="categories"
        @change="show"
      />
      <div ref="list" class="documents-list">
        <DocumentsItem
          v-for="doc in processedDocs"
          :key="doc.id"
          class="documents-list__item"
          :document="doc"
        />
      </div>
    </Section>
  </div>
</template>

<script>
import pageDefault from '~/assets/js/vue-mixins/page-default'
import pageHead from '~/assets/js/vue-mixins/page-head'
import Section from '~/components/layout/Section'
import DocumentsItem from '~/components/DocumentsItem'
import SingleTabs from '~/components/SingleTabs'

export default {
  name: 'Documents',
  components: { SingleTabs, Section, DocumentsItem },
  mixins: [pageHead, pageDefault],
  async asyncData({ $api }) {
    const page = await $api.pages.documents().then(({ data }) => data)
    const data = await $api.posts.getDocs().then(({ data }) => data)

    return { page, docs: data.posts, categories: data.categories }
  },
  data() {
    return {
      currentCategoryId: -1,
    }
  },
  computed: {
    processedDocs() {
      const arr = this.docs.filter((item) => {
        return String(item.category.id) === String(this.currentCategoryId)
      })

      return arr
    },
  },
  created() {
    this.currentCategoryId = this.categories[0].id
  },
  methods: {},
}
</script>

<style lang="scss">
.documents-list {
  margin-top: 6.4rem;

  &__item {
    &:not(:last-child) {
      margin-bottom: 3.2rem;

      @include --mobile {
        margin-bottom: 2.4rem;
      }
    }
  }
}
</style>
