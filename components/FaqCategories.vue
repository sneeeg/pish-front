<template>
  <div class="faq-categories">
    <Cell
      v-for="item in categories"
      :key="item.id"
      :item="item"
      class="faq-categories__item"
    />
  </div>
</template>

<script>
import Cell from '~/components/Cell'
export default {
  name: 'FaqCategories',
  components: { Cell },
  data() {
    return {
      categories: [],
    }
  },
  async fetch() {
    this.categories = this.$utils.fillEmptyArray({}, 4)

    const categories = await this.$api.faq
      .getCategories()
      .then(({ data }) => data?.categories || [])

    this.categories = categories.reduce((acc, item) => {
      if (item.parent !== 0) return acc

      const itemFields = item.text.split('|')
      const category = {}

      category.id = item.id
      category.text = itemFields[0].trim()
      category.icon = itemFields[1].trim()
      category.href = `/faq/${item.id}`

      acc.push(category)
      return acc
    }, [])

    this.categories.push({
      href: '/instructions',
      icon: 'page-screen',
      text: 'Помощь в регистрации ',
    })
  },
}
</script>

<style lang="scss">
.faq-categories {
  @include flexGap(3rem);

  &__item {
    flex: 1 1 30%;

    @include --mobile {
      flex: 1 1 100%;
    }
  }
}
</style>
