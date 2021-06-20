<template>
  <HTMLContent v-scroll-element class="documents" :html="documentsHTML" />
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'Documents',
  components: { HTMLContent },
  props: {
    documents: {
      type: Array,
      required: true,
    },
  },
  computed: {
    documentsHTML() {
      const list = this.documents
        .reduce((acc, item) => {
          acc.push(
            `<li><a href="${item.href}" class="doc" rel="nofollow noopener" target="_blank"><span>${item.text}</span></a></li>`
          )

          return acc
        }, [])
        .join('')

      return `<ul>${list}</ul>`
    },
  },
}
</script>

<style lang="scss">
.documents {
  max-width: 70rem;

  ul {
    padding: 0 !important;

    li {
      &::before {
        display: none;
      }
    }
  }

  .doc {
    color: $color_grey_text;

    span {
      background-image: none;
    }
  }
}
</style>
