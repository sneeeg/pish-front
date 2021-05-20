<template>
  <NuxtLink v-if="type === 'nuxt'" :to="localePath(to)">
    <slot />
  </NuxtLink>
  <a
    v-else-if="type === 'external'"
    :href="to"
    target="_blank"
    rel="noopener"
    @click="makeEvents"
  >
    <slot />
  </a>
  <a v-else :href="to" @click.prevent="goToAnchor">
    <slot />
  </a>
</template>

<script>
import VueScrollTo from 'vue-scrollto'

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

    if (this.to[0] === '#') {
      this.type = 'anchor'
    } else if (this.to.match(externalExp) || this.to.match(fileExp)) {
      this.type = 'external'
    }
  },
  methods: {
    goToAnchor() {
      const target = this.to.substring(1, this.to.length)

      VueScrollTo.scrollTo(`.${target}`, 500, {
        easing: 'ease-out',
        cancelable: true,
        offset: -125,
      })
    },
    makeEvents(e) {},
  },
}
</script>

<style lang="scss"></style>
