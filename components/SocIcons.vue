<template>
  <ul class="soc">
    <li v-for="({ text, href, icon }, index) in menus.socials" :key="index">
      <a :href="href" target="_blank" rel="nofollow noopener" :title="text"
        ><svg-icon :class="`_icon-${icon}`" :name="icon"></svg-icon
      ></a>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'SocIcons',
  computed: {
    ...mapState('default', ['menus']),
  },
}
</script>
<style lang="scss">
.soc {
  display: flex;
  color: #fff;

  &._header {
    color: $color_accent;

    a {
      width: auto;
      height: 2rem;

      @include hover {
        background-color: transparent;
      }
    }

    > :not(:last-child) {
      margin-right: 2rem;

      @include --mobile {
        margin-right: 1.2rem;
      }
    }
  }

  li {
    display: flex;
  }

  a {
    display: flex;
    width: auto;
    height: auto;
    margin: auto;

    svg {
      width: 2rem;
      height: 1.6rem;
      margin: auto;

      &._icon-in {
        width: 1.5rem;
        height: 1.4rem;
      }
    }
  }

  > :not(:last-child) {
    margin-right: 1.7rem;
  }
}
</style>
