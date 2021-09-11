<template>
  <a
    href="https://itfmsk.ru/"
    target="_blank"
    rel="noopener"
    class="itf-copyright"
  >
    <SvgIcon class="itf-copyright__logo" name="itf" />

    <div class="itf-copyright__link">
      <span v-if="$i18n.locale !== 'en'">ИТ Форвард</span>
      <span v-else>IT Forward</span>
      <SvgIcon name="link-external" />
    </div>
  </a>
</template>

<script>
export default {
  name: 'ITFCopyright',
}
</script>

<style lang="scss">
.itf-copyright {
  @include text-button-small;
  display: flex;
  align-items: center;

  &__logo {
    width: 2.5rem;
    height: 1.8rem;
    color: #a2a2a2;
  }

  &__link {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 1.6rem;
    color: #999999;

    span {
      @include underline(2px);
      position: relative;
    }

    svg {
      @include box(1.2rem);
      margin-left: 1rem;
    }
  }
}
</style>
