<template>
  <Section>
    <div v-if="slides && slides.length" class="main-first">
      <div ref="sliderItems" class="main-first__items">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="main-first__item"
        >
          <div class="main-first__text-block">
            <h1 class="main-first__item-title">{{ slide.title }}</h1>
            <HTMLContent
              class="main-first__item-description"
              :html="slide.description"
            />
            <Btn class="main-first__item-btn" :text="lang['base.more']" />
          </div>
          <div class="main-first__image">
            <img
              :src="slide.src"
              :alt="slide.alt || lang['base.alt'] || 'Приоритет 2030'"
            />
          </div>
        </div>
      </div>

      <div class="slider__footer">
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
  </Section>
</template>

<script>
import { mapState } from 'vuex'
import Section from '~/components/layout/Section'
import Slider from '~/assets/js/modules/slider'
import Btn from '~/components/controls/Btn'
import HTMLContent from '~/components/utils/HTMLContent'

export default {
  name: 'MainFirstScreen2',
  components: { Section, Btn, HTMLContent },
  props: {
    slides: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localCells: [],
      currentSlide: 0,
      sliderInstance: null,
    }
  },
  computed: {
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['browser']),
  },
  mounted() {
    this.createSlider()
  },
  beforeDestroy() {
    this.sliderInstance?.destroy()
  },
  methods: {
    changeSlide(direction = 'next') {
      this.sliderInstance.flickity.select(
        direction === 'next' ? this.currentSlide + 1 : this.currentSlide - 1
      )
    },
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
.main-first {
  position: relative;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &-title {
      font-weight: 500;
      font-size: 40px;
      line-height: 52px;
    }

    &-description {
      margin-top: 32px;
      color: $color_dark_grey;
      line-height: 27px;
    }

    &-btn {
      margin-top: 80px;
    }
  }

  &__text-block {
    max-width: 574px;
  }

  &__image {
    margin-right: 100px;
  }
}

.slider {
  position: relative;

  &__item {
    width: 100%;
  }

  &__footer {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.slider-controls {
  display: flex;
  align-items: center;
  height: fit-content;
  margin-left: 1.6rem;

  &__btn {
    color: $color_accent;

    &._disabled {
      color: $color_grey_text;
      opacity: 1;
    }

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
  }

  div {
    color: $color_grey_text;
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
</style>
