<template>
  <div v-if="slides && slides.length" class="slider">
    <div ref="sliderItems" class="slider__items">
      <div v-for="(slide, index) in slides" :key="index" class="slider__item">
        <img
          :src="slide.src"
          :alt="slide.alt || lang['base.alt'] || 'Приоритет 2030'"
        />
      </div>
    </div>

    <div class="slider__footer">
      <div class="slider__titles">
        <transition name="fade" mode="out-in">
          <!-- eslint-disable -->
          <div
            v-for="(slide, index) in slides"
            v-if="currentSlide === index"
            :key="index"
            class="slider__title"
          >
            {{ slide.title }}
          </div>
          <!-- eslint-enable -->
        </transition>
      </div>

      <div class="slider-controls">
        <a
          href=""
          :class="[
            'slider-controls__btn',
            '_prev',
            'hover-opacity',
            { _disabled: !currentSlide },
          ]"
          @click.prevent="changeSlide('previous')"
        >
          <SvgIcon name="arrow-left" />
        </a>

        <div class="slider-controls__counter">
          <div>
            <span>{{ currentSlide + 1 }}</span> /
          </div>
          <div>{{ slides.length }}</div>
        </div>

        <a
          href=""
          :class="[
            'slider-controls__btn',
            '_next',
            'hover-opacity',
            { _disabled: currentSlide === slides.length - 1 },
          ]"
          @click.prevent="changeSlide('next')"
        >
          <SvgIcon name="arrow-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Slider from '~/assets/js/modules/slider.js'

export default {
  name: 'SliderMainFirst',
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentSlide: 0,
      sliderInstance: null,
    }
  },
  computed: {
    ...mapState('default', ['lang']),
  },
  mounted() {
    this.createSlider()
  },
  beforeDestroy() {
    this.sliderInstance?.destroy()
  },
  methods: {
    /**
     * Change slide
     * @param direction {String} - direction prev or next
     */
    changeSlide(direction = 'next') {
      this.sliderInstance.flickity.select(
        direction === 'next' ? this.currentSlide + 1 : this.currentSlide - 1
      )
    },

    /**
     * Create slider
     */
    createSlider() {
      const container = this.$refs.sliderItems

      this.sliderInstance = new Slider(container, { adaptiveHeight: true })
      this.sliderInstance.flickity.on('change', (index) => {
        this.currentSlide = index
      })
    },
  },
}
</script>

<style lang="scss">
.slider {
  &__item {
    width: 100%;

    img {
      width: 100%;
      height: auto;
    }
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 2.4rem;

    @include --mobile {
      flex-direction: column;
    }
  }

  &__titles {
    @include text-small();
    max-width: 50rem;

    @include --mobile {
      max-width: 100%;
    }
  }
}

.slider-controls {
  display: flex;
  align-items: center;
  height: fit-content;
  margin-left: 1.6rem;

  @include --mobile {
    justify-content: flex-end;
    width: 100%;
    margin-top: 1.6rem;
    margin-left: 0;
  }

  &__btn {
    color: $color_accent;

    svg {
      width: 1rem;
      height: 1.8rem;
    }
  }

  &__counter {
    @include h4();
    position: relative;
    top: -1px;
    display: flex;
    margin: 0 3.2rem;

    @include --mobile {
      margin: 0 2.4rem;
    }

    div:first-child {
      display: flex;
      margin-right: 0.7rem;
      color: $color_accent;
      font-weight: 700;

      @include --mobile {
        margin-right: 4px;
      }

      span {
        width: 2rem;

        @include --mobile {
          width: 1.8rem;
        }
      }
    }
  }
}
</style>
