<template>
  <component
    :is="tag"
    :class="[
      'person-card',
      { _vertical: vertical || window.isMobileSize, _grey: grey },
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div v-if="avatar" class="person-card__avatar">
      <img :src="avatar.src" :alt="avatar.alt" />
    </div>

    <div class="person-card__text">
      <div v-if="name" class="person-card__name">{{ name }}</div>

      <p class="person-card__description" v-html="description"></p>
    </div>
  </component>
</template>

<script>
import { mapState } from 'vuex'
import SmartLink from '~/components/utils/SmartLink'

export default {
  name: 'PersonCard',

  components: { SmartLink },

  inheritAttrs: false,

  props: {
    avatar: {
      type: Object,
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    grey: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss">
.person-card {
  display: flex;
  background-color: $color_white;

  &._grey {
    background-color: $color_light_grey;
  }

  &._vertical {
    flex-direction: column;
  }

  &__avatar {
    @include box(20.7rem);
    flex-shrink: 0;

    ._vertical & {
      width: 100%;
      height: 27.8rem;

      @include --mobile {
        height: auto;
      }
    }

    img {
      @include box(100%);
      object-fit: cover;

      @include --mobile {
        height: auto;
      }
    }
  }

  &__text {
    padding: 2.4rem 4rem 2.4rem 2.4rem;

    ._vertical & {
      padding: 2rem;
    }
  }

  &__name {
    margin-bottom: 1.6rem;
    font-weight: bold;
  }

  p {
    @include text-small;
    margin: 0;
  }
}
</style>
