<template>
  <div class="quote">
    <div class="quote__background"></div>
    <div class="quote__content">
      <SvgIcon name="quote2" />
      <figure>
        <blockquote v-html="content"></blockquote>
        <figcaption>
          {{ name }}
          <cite v-if="cite">{{ cite }}</cite>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quote',

  props: {
    content: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    cite: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.quote {
  position: relative;
  display: flex;
  justify-content: center;

  &__background {
    @include box(100%);

    position: absolute;
    top: 0;
    left: 0;
    background-image: url('/i/dna.jpg');
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;

    @include --mobile {
      display: none;
    }
  }

  &__content {
    @include container;
    @include padding-section;

    position: relative;
    z-index: 1;

    figure {
      @include h5;

      max-width: 79rem;
      font-weight: 500;
      line-height: 2.6rem;
    }

    > svg {
      width: 4rem;
      height: 2.7rem;
      margin-bottom: 2.4rem;

      @include --mobile {
        margin-bottom: 2rem;
      }
    }

    figcaption {
      margin-top: 4.8rem;
      color: $color_accent;

      @include --mobile {
        margin-top: 3.2rem;
      }
    }

    cite {
      @include text-button;
      display: block;
      margin-top: 0.6rem;
      color: $color_dark_grey;
      font-weight: 400;
      font-style: normal;

      text-transform: none;

      @include --mobile {
        margin-top: 4px;
      }
    }
  }
}
</style>
