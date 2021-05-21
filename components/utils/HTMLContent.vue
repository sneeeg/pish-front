<template>
  <div ref="HTMLContent" class="html-content" v-html="html"></div>
</template>

<script>
export default {
  name: 'HTMLContent',
  props: {
    html: {
      type: String,
      default: '',
    },
  },
  mounted() {
    const $tables = this.$refs.HTMLContent.querySelectorAll('table')
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
  },
}
</script>

<style lang="scss"></style>
