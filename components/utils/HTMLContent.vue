<template>
  <div
    ref="HTMLContent"
    :class="['html-content', { _news: forNews }]"
    v-html="html"
  ></div>
</template>

<script>
import { mapMutations } from 'vuex'
import Blockquote from '~/assets/js/modules/snippets/Blockquote'

export default {
  name: 'HTMLContent',
  props: {
    html: {
      type: String,
      default: '',
    },
    forNews: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$composables.removeEmptyNodes(this.$refs.HTMLContent)
    this.$composables.deleteLastBrs(this.$refs.HTMLContent)

    const blockquoteSnippets = this.$refs.HTMLContent.querySelectorAll(
      '.snippet-blockquote'
    )

    blockquoteSnippets.forEach((el) => {
      // eslint-disable-next-line no-new
      new Blockquote(el, this.$refs.HTMLContent)
    })

    this.$utils.wrapTable(this.$refs.HTMLContent)

    const $docLinks = this.$refs.HTMLContent.querySelectorAll('a.doc[title]')

    this.showDocInfo = this.showDocInfo.bind(this)
    $docLinks.forEach((link) => {
      link.addEventListener('click', this.showDocInfo)
    })

    this.$refs.HTMLContent.querySelectorAll('.snippet-years').forEach(
      (snippet) => {
        snippet.querySelectorAll('dd').forEach((dd) => {
          const dt = dd.previousElementSibling

          if (dt?.innerHTML) return

          snippet.removeChild(dt)
          dd.classList.add('_empty')
        })
      }
    )
  },
  methods: {
    ...mapMutations('default', ['changePopupState']),
    showDocInfo(e) {
      e.preventDefault()
      const link = e.target.closest('a')
      const title = link.textContent
      const text = link.getAttribute('title')
      const href = link.getAttribute('href')
      this.changePopupState({ isShow: true, title, text, href })
    },
  },
}
</script>

<style lang="scss"></style>
