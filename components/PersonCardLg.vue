<template>
  <div
    :style="{ background: !window.isMobileSize ? background : 'transparent' }"
    :class="['person-card-lg', { _outlined: outlined }]"
  >
    <div v-if="photoUrl" class="person-card-lg__photo">
      <img :src="photoUrl" :alt="name" />
    </div>

    <div class="person-card-lg__content">
      <div class="person-card-lg__name _visually-h3">{{ name }}</div>

      <p v-if="text" class="person-card-lg__text">{{ text }}</p>

      <p v-if="subText" class="person-card-lg__sub-text" v-html="subText"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PersonCardLg',
  props: {
    background: {
      type: String,
      default: 'white',
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: '',
    },
    subText: {
      type: String,
      default: '',
    },
    photoUrl: {
      type: String,
      required: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
}
</script>

<style lang="scss">
.person-card-lg {
  display: flex;

  &._outlined {
    @include --from-mobile {
      border: 1px solid #e1e4e8;
    }
  }

  @include --mobile {
    flex-direction: column;
  }

  &__photo {
    flex-shrink: 0;
    width: 17.5rem;
    height: 21.5rem;

    img {
      @include box(100%);

      display: block;
      object-fit: cover;
    }

    @include --mobile {
      width: 12rem;
      height: 14.7rem;
      margin-bottom: 2.4rem;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 3.2rem;

    @include --mobile {
      padding: 0;
    }
  }

  &__name {
    font-weight: 700;
  }

  &__text {
    margin: 1.6rem 0 0;

    @include --mobile {
      margin-top: 0.6rem;
    }
  }

  &__sub-text {
    margin: 4.8rem 0 0;

    @include --mobile {
      margin-top: 2.4rem;
    }
  }
}
</style>
