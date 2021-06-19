<template>
  <div class="quotes">
    <div class="quotes__slider-block">
      <ul ref="slider" class="quotes__slider">
        <li
          v-for="{ id, content, author } in quotes"
          :key="id"
          class="quotes__slide"
        >
          <Blockquote :text="content" :author="author" />
        </li>
      </ul>
      <div class="controls">
        <button ref="prev" class="controls__btn controls__prev">
          <svg-icon name="arrow-slider" />
        </button>
        <button ref="next" class="controls__btn controls__next">
          <svg-icon name="arrow-slider" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Slider from '~/assets/js/modules/slider.js'

import Blockquote from '~/components/Blockquote'

export default {
  name: 'Quotes',
  components: { Blockquote },
  props: {
    quotes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      slider: null,
      currentSlideIndex: 0,
    }
  },
  computed: {
    ...mapState('responsive', ['window']),
  },
  mounted() {
    this.initSlider()

    this.$watch('window.isMobileSize', () => {
      this.updateSlider()
    })

    this.$watch('window.isTabletSize', () => {
      this.updateSlider()
    })
  },
  beforeDestroy() {
    this.destroySlider()
  },
  methods: {
    initSlider() {
      this.slider = new Slider(
        this.$refs.slider,
        {
          adaptiveHeight: true,
          watchCSS: true,
          fade: true,
        },
        {
          prevButton: this.$refs.prev,
          nextButton: this.$refs.next,
        }
      )
      // this.slider.flickity.on('change', (i) => {
      //   this.currentSlideIndex = i
      // })
      // this.slider.flickity.on('select', () => {
      //   this.manageSliderBtns()
      // })
    },
    updateSlider() {
      this.destroySlider()
      this.initSlider()
    },
    destroySlider() {
      this.slider && this.slider.destroy()
      this.slider = null
      this.sliderViewport = null
      this.sliderViewportHeight = null
    },
    selectSlide(index) {
      this.slider && this.slider.flickity.select(index)
    },
  },
}
</script>

<style lang="scss">
.quotes {
  &__slider-block {
    position: relative;

    > .controls {
      justify-content: flex-start;
      margin-top: 8rem;

      @include --tablet {
        margin-top: 6.4rem;
      }

      @include --mobile {
        margin-top: 4rem;
      }

      > *:not(:last-child) {
        margin-right: 2.4rem;
      }

      > .controls__btn {
        width: 1.6rem;
        height: 3.2rem;

        &:disabled {
          color: $color_black;
          cursor: auto;
          opacity: 0.2;
        }
      }

      &::after {
        display: block;
        flex: 1 1 auto;
        height: 1px;
        margin-left: 4.8rem;
        background-color: $color_grey_border;
        content: '';

        @include --mobile {
          margin-left: 3.2rem;
        }
      }
    }
  }

  &__slider {
    &::after {
      display: none;
      content: 'flickity';
    }

    .flickity-viewport {
      overflow: visible;
      transition: height 0.3s;
    }
  }

  &__slide {
    position: relative;
    width: 100%;
  }
}
</style>
