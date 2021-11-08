<template>
  <div v-view="$utils.scrollCenterDetection" class="progress">
    <div v-scroll-element class="progress__year">{{ year }}</div>
    <div class="progress__slider-block">
      <ul ref="slider" class="progress__slider">
        <li v-for="content in items" :key="content.id" class="progress__slide">
          <HTMLContent v-scroll-element="'right'" :html="content" />
        </li>
      </ul>
      <div class="controls">
        <button ref="prev" class="controls__btn controls__prev">
          <svg-icon name="arrow-slider" />
        </button>
        <ol v-if="window.isMobileSize" class="controls__dots">
          <li
            v-for="number in dotNumbers"
            :key="number"
            :class="[
              'controls__dot',
              { _selected: number === currentSlideIndex },
            ]"
            @click="selectSlide(number)"
          ></li>
        </ol>
        <button
          v-show="!window.isDesktopSize || items.length > 4"
          ref="next"
          class="controls__btn controls__next"
        >
          <svg-icon name="arrow-slider" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Slider from '~/assets/js/modules/slider.js'

import HTMLContent from '~/components/utils/HTMLContent'
export default {
  name: 'Progress',
  components: { HTMLContent },
  props: {
    year: {
      type: String,
      default: '',
    },
    activeStage: {
      type: Number,
      default: 1,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    const dotNumbers = this.items.map((item, i) => i)
    return {
      slider: null,
      currentSlideIndex: 0,
      dotNumbers,
      sliderViewport: null,
      sliderViewportHeight: null,
      sliderHeight: null,
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
          contain: true,
          adaptiveHeight: false,
          watchCSS: true,
          draggable: !this.window.isDesktopSize,
        },
        {
          prevButton: this.$refs.prev,
          nextButton: this.$refs.next,
        }
      )
      this.slider.flickity.cells.forEach((cell, i) => {
        cell.element.style.minHeight = 'calc(100% - 1.6rem)'
        if (i > this.activeStage - 1) return
        if (i === this.activeStage - 1) {
          cell.element.classList.add('_active')
          return
        }
        cell.element.classList.add('_complete')
      })

      this.manageSliderBtns()

      this.slider.flickity.on('change', (i) => {
        this.currentSlideIndex = i
      })
      this.slider.flickity.on('select', () => {
        this.manageSliderBtns()
      })
    },
    updateSlider() {
      this.destroySlider()
      this.initSlider()
    },
    destroySlider() {
      this.slider?.flickity.cells.forEach((cell) => {
        cell.element.style.minHeight = ''
      })
      this.slider && this.slider.destroy()
      this.slider = null
      this.sliderViewport = null
      this.sliderViewportHeight = null
    },
    selectSlide(index) {
      this.slider && this.slider.flickity.select(index)
    },
    manageSliderBtns() {
      const slider = this.slider.flickity
      let currentIndex = 0
      const count = Math.round(
        slider.element.offsetWidth / slider.cells[0].element.offsetWidth
      )

      if (slider.cells.length - count <= 0) {
        this.$refs.next.disabled = true
        this.$refs.prev.disabled = true
        return
      }

      for (let i = 0; i < slider.selectedIndex; i++) {
        currentIndex += slider.slides[i].cells.length
      }

      if (currentIndex >= slider.cells.length - count) {
        this.$refs.next.disabled = true
        slider.selectedIndex = slider.cells.length - count
      } else {
        this.$refs.next.disabled = false
      }
    },
  },
}
</script>

<style lang="scss">
.progress {
  @include --from-tablet {
    padding-bottom: 1.6rem;
  }

  a {
    display: block;
    @include hover-opacity;
    color: $color_black;
  }

  p {
    margin-top: 0;
  }

  &__year {
    margin-bottom: 4.8rem;
    color: $color_red;
    font-size: 13.5rem;
    line-height: 14.3rem;
    text-transform: uppercase;

    @include --mobile {
      margin-bottom: 3.4rem;
      font-size: 8rem;
      line-height: 8.3rem;
    }
  }

  &__slider-block {
    position: relative;

    > .controls {
      @include --from-mobile {
        position: absolute;
        top: 0;
        left: 50%;
        justify-content: space-between;
        width: calc(100% + 7rem);
        margin: 0;
        transform: translateX(-50%);

        > .controls__btn {
          width: 2rem;
          height: 4rem;

          @include --tablet {
            width: 1.6rem;
            height: 3.2rem;
          }

          &:disabled {
            cursor: auto;
            opacity: 0;
          }
        }
      }
    }
  }

  &__slider {
    position: relative;
    z-index: 1;

    &::after {
      display: none;
      content: 'flickity';
    }

    &::before {
      position: absolute;
      bottom: 1.6rem;
      left: 100%;
      width: 100vw;
      height: 2px;
      background-color: $color_grey_text;
      content: '';
    }

    @include --mobile {
      margin-bottom: 3rem;
    }

    > .flickity-viewport {
      @include --mobile {
        overflow: visible;

        //&::after {
        //  position: absolute;
        //  top: 0;
        //  left: 100%;
        //  z-index: 1;
        //  width: 2rem;
        //  height: 100%;
        //  background: linear-gradient(to left, $color_background, transparent);
        //  content: '';
        //}
      }
    }
  }

  &__slide {
    position: relative;
    width: 25%;
    min-height: 21rem;
    margin-bottom: 1.6rem;
    padding: 0 4rem 4rem 0;
    border-bottom: 2px solid $color_grey_text;

    &:last-child {
      @include --mobile {
        width: 100%;
        padding-right: 25%;
      }

      &::after {
        position: absolute;
        bottom: 0;
        left: 100%;
        width: 100vw;
        height: 2px;
        background: $color_grey_text;
        transform: translateY(100%);
        content: '';
      }
    }

    @include --tablet {
      width: 50%;
      padding: 0 2rem 4rem 0;
    }

    @include --mobile {
      width: 75%;
      min-height: 17rem;
    }

    > .html-content {
      color: rgba($color_black, 0.4);
    }

    &::before {
      @include box(1.2rem);
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 50%;
      background: $color_grey_text;
      transform: translateY(50%);
      content: '';
    }

    &._complete {
      border-color: $color_red;

      > .html-content {
        color: $color_black;
      }

      &::before {
        @include box(2.8rem);
        background: $color_red;
      }
    }

    &._active {
      &::before {
        background: $color_red;
      }

      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50%;
        height: 2px;
        background: linear-gradient(to right, $color_red, transparent);
        transform: translateY(100%);
        content: '';
      }
    }
  }
}
</style>
