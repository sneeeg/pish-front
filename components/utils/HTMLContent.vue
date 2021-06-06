<template>
  <div
    ref="HTMLContent"
    :class="['html-content', { _news: forNews }]"
    v-html="html"
  ></div>
</template>

<script>
import { mapMutations } from 'vuex'
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
    const $tables = this.$refs.HTMLContent.querySelectorAll('table')
    const $docLinks = this.$refs.HTMLContent.querySelectorAll('a.doc[title]')
    const wrapper = document.createElement('section')
    const parentWith = this.$refs.HTMLContent.offsetWidth

    $tables.forEach((el) => {
      const tableWidth = el.scrollWidth

      if (parentWith < tableWidth) {
        el.parentNode.insertBefore(wrapper, el)
        wrapper.classList.add('table-scroll-wrap')
        wrapper.appendChild(el)
      }
    })

    this.showDocInfo = this.showDocInfo.bind(this)
    $docLinks.forEach((link) => {
      link.addEventListener('click', this.showDocInfo)
    })
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
