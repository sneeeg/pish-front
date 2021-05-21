<template>
  <NuxtLink v-if="type === 'nuxt'" :to="localePath(to)">
    <slot />
  </NuxtLink>
  <a v-else-if="type === 'external'" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'SmartLink',
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {
      type: 'nuxt',
    }
  },
  created() {
    if (!this.to || typeof this.to === 'object') return

    const externalExp = /^(http(s)?|ftp):\/\//
    const fileExp = /\.[0-9a-z]+$/i

    if (this.to.match(externalExp) || this.to.match(fileExp)) {
      this.type = 'external'
    }
  },
}
</script>

<style lang="scss"></style>
