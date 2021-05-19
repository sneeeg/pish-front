<template>
  <ul class="soc" :class="mod">
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
  props: {
    mod: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState('default', ['menus']),
  },
}
</script>
<style lang="scss">
.soc {
  display: flex;
  color: $color_dark_grey;

  &._header {
    color: $color_red;

    a {
      width: 1.6rem;
      height: 1.6rem;

      svg {
        width: 1.6rem;
        height: 1.6rem;

        &._icon-in {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
    }

    > :not(:last-child) {
      margin-right: 2rem;

      @include --mobile {
        margin-right: 1.2rem;
      }
    }
  }

  a {
    @include box(4.1rem);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #fff;
    transition: background-color 0.3s ease;

    @include hover {
      background-color: $color_light_grey;
    }

    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  > :not(:last-child) {
    margin-right: 1.7rem;
  }
}
</style>
