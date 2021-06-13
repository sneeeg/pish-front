<template>
  <blockquote v-view="$utils.scrollCenterDetection" class="blockquote">
    <p v-scroll-element class="blockquote__text">{{ text }}</p>
    <footer>
      <div v-scroll-element="'left'" class="blockquote__photo">
        <img :src="author.image" />
      </div>
      <div class="blockquote__author-block">
        <cite v-scroll-element class="blockquote__name">{{ author.name }}</cite>
        <div v-scroll-element class="blockquote__position">
          {{ author.position }}
        </div>
      </div>
    </footer>
  </blockquote>
</template>

<script>
export default {
  name: 'Blockquote',
  components: {},
  props: {
    text: {
      type: String,
      default: '',
    },
    author: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.blockquote {
  position: relative;
  margin: 0 auto;
  padding: 4rem 10.4rem 0;

  @include --tablet {
    padding: 2.4rem 2.4rem 0;
  }

  @include --mobile {
    padding: 1.6rem 1.6rem 0;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 12.8rem;
    height: 9.6rem;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 117 89' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M96.14 44.85c4.01 1.17 7.66 3.39 10.96 6.66 3.3 3.27 4.95 8.17 4.95 14.71 0 6.55-2.24 12.03-6.72 16.47-4.47 4.2-10.01 6.31-16.6 6.31-6.84 0-12.62-2.22-17.33-6.66-4.48-4.44-6.71-10.04-6.71-16.82 0-5.6.82-10.4 2.47-14.36 1.89-3.97 4.24-8.41 7.07-13.32L95.79 0H117L96.14 44.85zm-64.68 0c4 1.17 7.66 3.39 10.96 6.66 3.3 3.27 4.95 8.17 4.95 14.71 0 6.55-2.24 12.03-6.72 16.47C36.17 86.9 30.63 89 24.04 89c-6.84 0-12.61-2.22-17.32-6.66C2.24 77.9 0 72.3 0 65.52c0-5.6.82-10.4 2.47-14.36 1.89-3.97 4.25-8.41 7.07-13.32L31.11 0h21.2L31.46 44.85z' fill='%23F4F4F6'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    content: '';

    @include --tablet {
      left: -5rem;
    }

    @include --mobile {
      top: -1rem;
    }
  }

  &__logo {
    width: 45rem;
    height: 4.8rem;
    margin-bottom: 10.3rem;

    @include --tablet {
      margin-bottom: 8rem;
    }

    @include --mobile {
      width: 24rem;
      height: 2.56rem;
      margin-bottom: 4rem;
    }
  }

  &__text {
    @include text-big;
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 100rem;
    margin: 0 0 7.2rem;

    @include --tablet {
      margin-bottom: 4.8rem;
    }

    @include --mobile {
      margin-bottom: 2.4rem;
    }
  }

  > footer {
    @include text-small;
    display: inline-flex;
    align-items: center;
    margin: 0;
  }

  &__photo {
    @include box(17.5rem);
    flex: 0 0 auto;
    margin-right: 3.6rem;
    border-radius: 50%;
    overflow: hidden;

    @include --tablet {
      @include box(12rem);
      margin-right: 2.4rem;
    }

    @include --mobile {
      @include box(8rem);
      margin-right: 1.8rem;
    }

    > img {
      @include adaptiveImg();
    }
  }

  &__author-block {
    @include text;
    max-width: 50%;

    @include --tablet {
      max-width: 65%;
    }

    @include --mobile {
      max-width: none;
    }
  }

  &__name {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-style: normal;
  }
}
</style>
