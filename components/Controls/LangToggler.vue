<template>
  <button class="lang-toggler" @click="toggleLang">
    <span
      v-for="lang in langs"
      :key="lang.key"
      class="lang-toggler__text"
      :class="{ _active: lang.key === activeLang }"
      >{{ lang.text }}</span
    >
    <span ref="substrate" class="lang-toggler__substrate"></span>
  </button>
</template>

<script>
import gsap from 'gsap'

export default {
  name: 'LangToggler',
  data() {
    return {
      activeLang: 'ru',
      langs: [
        { text: 'Ру', key: 'ru' },
        { text: 'En', key: 'en' },
      ],
    }
  },
  mounted() {
    if (this.$i18n.locale === 'en') {
      this.activeLang = 'en'
      gsap.set(this.$refs.substrate, { x: 3 + 'rem' })
    }
  },
  methods: {
    toggleLang() {
      const isRu = this.activeLang === 'ru'
      this.activeLang = isRu ? 'en' : 'ru'

      gsap.to(this.$refs.substrate, { x: 3 * isRu + 'rem', duration: 0.3 })
      this.$i18n.setLocale(this.activeLang)
    },
  },
}
</script>

<style lang="scss">
$toggle_border_rad: 3px;

.lang-toggler {
  @include btn-reset;
  position: relative;
  width: 6.8rem;
  height: 2.3rem;
  padding: 1px;
  border-radius: $toggle_border_rad;
  background-color: $color_background;

  &__text {
    position: absolute;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    height: 100%;
    color: rgba(0, 0, 0, 0.4);
    font-size: 1.6rem;
    line-height: 1.8rem;
    transition: color 0.3s ease;

    &._active {
      color: #fff;
    }

    &:nth-child(1) {
      left: 1rem;
    }

    &:nth-child(2) {
      right: 0.8rem;
    }
  }

  &__substrate {
    z-index: 1;
    display: block;
    width: 3.6rem;
    height: 2.1rem;
    border-radius: $toggle_border_rad;
    background-color: $color_accent;
  }
}
</style>
