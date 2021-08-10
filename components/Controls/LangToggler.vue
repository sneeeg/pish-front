<template>
  <a
    href=""
    :class="['lang-toggler', { _en: $i18n.locale === 'en' }]"
    @click.prevent="$i18n.setLocale($i18n.locale === 'en' ? 'ru' : 'en')"
  >
    <span class="lang-toggler__item">Ру</span>
    <span class="lang-toggler__item">En</span>

    <span class="lang-toggler__btn"></span>
  </a>
</template>

<script>
export default {
  name: 'LangToggler',
}
</script>

<style lang="scss">
.lang-toggler {
  @include text-medium;
  position: relative;
  padding: 4px 1rem;
  border-radius: 3px;
  background-color: #e1e4e8;

  &__item {
    position: relative;
    z-index: 3;
    color: #b3b5b8;

    ._en & {
      color: #ffffff;
    }

    &:first-child {
      margin-right: 1.4rem;
      color: #ffffff;

      ._en & {
        color: #b3b5b8;
      }
    }
  }

  &__btn {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 50%;
    height: calc(100% - 2px);
    border-radius: 3px;
    background: $color_accent;
    transition: transform 0.3s ease;

    ._en & {
      transform: translateX(100%);
    }
  }
}
</style>
