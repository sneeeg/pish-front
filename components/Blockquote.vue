<template>
  <blockquote v-view="$utils.scrollCenterDetection" class="blockquote">
    <!--    <img-->
    <!--      v-scroll-element-->
    <!--      class="blockquote__logo"-->
    <!--      src="/logo.svg"-->
    <!--      alt="Логотип"-->
    <!--    />-->
    <HTMLContent v-scroll-element class="blockquote__text" :html="text" />
    <footer v-scroll-element>
      <div class="blockquote__photo">
        <img :src="author.image" />
      </div>
      <div class="blockquote__author-block">
        <cite class="blockquote__name">{{ author.name }}</cite>
        <div v-if="author.position" class="blockquote__position">
          {{ author.position }}
        </div>
        <div v-if="author.source" class="blockquote__source">
          {{ author.source }}
        </div>
      </div>
    </footer>
  </blockquote>
</template>

<script>
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'Blockquote',
  components: { HTMLContent },
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
  padding: 3.2rem 0;

  @include --tablet {
    padding: 2.4rem 0;
  }

  @include --mobile {
    padding: 2.4rem 0;
  }

  &::before {
    position: absolute;
    top: 0;
    left: -10rem;
    z-index: 1;
    width: 12.8rem;
    height: 9.6rem;
    background: url('static/qoute.svg') no-repeat center / auto;
    content: '';

    @include --tablet {
      left: -5rem;
    }

    @include --mobile {
      left: -5rem;
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

  .html-content {
    max-width: none;
  }

  &__text {
    position: relative;
    z-index: 2;
    width: 100%;
    margin: 0 0 3.2rem;

    p {
      @include h4;
      font-weight: bold;

      @include --mobile {
        @include text;
      }
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

    @include --mobile {
      align-items: flex-start;
    }
  }

  &__photo {
    @include box(13rem);
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
    font-weight: bold;
    font-style: normal;

    &:not(:last-child) {
      margin-bottom: 0.8rem;

      @include --mobile {
        margin-bottom: 0.5rem;
      }
    }
  }

  &__position {
    &:not(:last-child) {
      margin-bottom: 1.6rem;

      @include --mobile {
        margin-bottom: 0.8rem;
      }
    }
  }

  &__source {
    @include text-small;
    color: $color_dark_grey;

    @include --mobile {
      font-size: 1.2rem;
      line-height: 1.4rem;
    }
  }
}
</style>
