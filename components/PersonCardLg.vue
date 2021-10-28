<template>
  <div
    :style="{ background: !window.isMobileSize ? background : false }"
    class="person-card-lg"
  >
    <div class="person-card-lg__photo">
      <img :src="photoUrl" :alt="name" />
    </div>

    <div class="person-card-lg__content">
      <div class="person-card-lg__name _visually-h3">{{ name }}</div>

      <p v-if="text" class="person-card-lg__text">{{ text }}</p>
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
    photoUrl: {
      type: String,
      required: true,
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
  width: 100%;

  @include --mobile {
    flex-direction: column;
  }

  &__photo {
    flex-shrink: 0;
    width: 17.5rem;
    height: 21.5rem;

    img {
      @include box(100%);

      object-fit: cover;
    }

    @include --mobile {
      width: 12rem;
      height: 14.7rem;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 3.2rem;

    @include --mobile {
      margin-top: 2.4rem;
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
}
</style>
