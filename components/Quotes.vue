<template>
  <div class="quotes">
    <div>
      <div v-if="quotes.length > 5" ref="container">
        <MarqueeText
          class="ticker"
          :paused="window.isDesktopSize && isPaused"
          :repeat="20"
          :duration="80"
          @mouseover="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <div class="ticker__items">
            <div
              v-for="({ id, author }, i) in quotes"
              :key="id"
              class="ticker__item hover-opacity"
              @click="selectSlide(i)"
            >
              <div class="ticker__photo">
                <img :src="author.image" />
              </div>
              <p class="ticker__name">{{ author.name }}</p>
            </div>
          </div>
        </MarqueeText>
      </div>

      <div v-else class="_ticker-container">
        <div class="ticker _chips">
          <div
            v-for="({ id, author }, i) in quotes"
            :key="id"
            class="ticker__item hover-opacity"
            @click="selectSlide(i)"
          >
            <div class="ticker__photo">
              <img :src="author.image" />
            </div>
            <p class="ticker__name">{{ author.name }}</p>
          </div>
        </div>
      </div>
    </div>

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
import MarqueeText from 'vue-marquee-text-component'
import Impetus from 'impetus'
import gsap from 'gsap'
import Slider from '~/assets/js/modules/slider.js'

import Blockquote from '~/components/Blockquote'

export default {
  name: 'Quotes',
  components: { Blockquote, MarqueeText },
  props: {
    quotes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      slider: null,
      ticker: null,
      isPaused: false,
      impetus: null,
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

    setTimeout(() => {
      const items = this.$refs.container.querySelectorAll('.ticker__items')

      items.forEach((item) => {
        gsap.set(item, { x: -12000 })
      })
    })

    this.impetus = new Impetus({
      source: this.$refs.container,
      update: (x, y) => {
        const items = this.$refs.container.querySelectorAll('.ticker__items')

        items.forEach((item) => {
          gsap.set(item, { x: -12000 + x })
        })
      },
    })
  },
  beforeDestroy() {
    this.destroySlider()
    this.impetus?.destroy()
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
  @include padding-section;

  .ticker {
    cursor: grab;

    .marquee-text-text {
      &._paused {
        animation-play-state: paused;
      }
    }
  }

  &__slider-block {
    @include container;
    position: relative;
    margin: 0 auto;

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

._ticker-container {
  @include container;
  display: block;
  margin: 0 auto;
}

.ticker {
  margin-bottom: 8rem;

  &._chips {
    @include flexGap(1rem);
    padding-bottom: 8rem;

    @include --mobile {
      padding-bottom: 4rem;
    }
  }

  @include --mobile {
    margin-bottom: 5.2rem;
  }

  .marquee-text-text {
    display: flex;
  }

  &__items {
    display: flex;
  }

  &__item {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    padding: 4px 1.6rem 4px 4px;
    border: 1px solid $color_grey_border;
    border-radius: 10rem;
    cursor: pointer;

    @include --mobile {
      margin-right: 0.8rem;
    }
  }

  &__photo {
    @include box(4.2rem);
    margin-right: 1.2rem;
    border-radius: 50%;
    overflow: hidden;

    > img {
      @include adaptiveImg();
    }
  }

  &__name {
    @include text-small;
    margin: 0;
  }
}
</style>
