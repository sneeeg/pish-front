<template>
  <blockquote v-view="$utils.scrollCenterDetection" class="blockquote">
    <img
      v-scroll-element
      class="blockquote__logo"
      src="/logo.svg"
      alt="Логотип"
    />
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
// import HTMLContent from '~/components/utils/HTMLContent'

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
  padding: 0 10.4rem;

  @include --tablet {
    padding: 0 2.4rem;
  }

  @include --mobile {
    padding: 0 1.6rem;
  }

  &::before {
    position: absolute;
    top: 21.5rem;
    left: 0;
    z-index: 1;
    width: 12.8rem;
    height: 9.6rem;
    background: url('static/qoute.svg') no-repeat center / auto;
    content: '';

    @include --tablet {
      top: 12.2rem;
      left: -5rem;
    }

    @include --mobile {
      top: 6.4rem;
      left: -3rem;
      width: 9.6rem;
      height: 7.2rem;
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
    display: inline-flex;
    align-items: center;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2rem;
  }

  &__photo {
    @include box(17.5rem);
    flex: 0 0 auto;
    margin-right: 3.6rem;
    border-radius: 50%;
    overflow: hidden;

    @include --tablet {
      @include box(14rem);
      margin-right: 2.4rem;
    }

    @include --mobile {
      @include box(10rem);
      margin-right: 1.6rem;
    }

    > img {
      @include adaptiveImg();
    }
  }

  &__author-block {
    max-width: 50%;
    font-size: 2rem;
    line-height: 2.4rem;

    @include --tablet {
      max-width: 65%;
    }

    @include --mobile {
      max-width: none;
      font-size: 1.2rem;
      line-height: 1.5rem;
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
