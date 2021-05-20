<template>
  <div class="slider-controls">
    <button
      :class="['slider-controls__btn', '_prev', { _disabled: !slideIndex }]"
      @click="changeSlide(slideIndex - 1)"
    >
      <SvgIcon name="arrow-left" />
    </button>
    <div class="slider-controls-dots">
      <button
        v-for="(btn, index) in total"
        :key="btn.id"
        type="button"
        :class="[
          'slider-controls-dots__btn',
          'accent-color-by-active',
          { _active: slideIndex === index },
        ]"
        @click="changeSlide(index)"
      ></button>
    </div>
    <button
      :class="[
        'slider-controls__btn',
        '_next',
        { _disabled: slideIndex === total - 1 },
      ]"
      @click="changeSlide(slideIndex + 1)"
    >
      <SvgIcon name="arrow-right" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'SliderControls',
  props: {
    sliderInstance: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      slideIndex: 0,
      total: 0,
    }
  },
  created() {
    this.slideIndex = this.sliderInstance.flickity.selectedIndex
    this.total = this.sliderInstance.flickity.slides.length

    this.sliderInstance.flickity.on(
      'change',
      (index) => (this.slideIndex = index)
    )
  },
  methods: {
    changeSlide(index) {
      this.sliderInstance.flickity.select(index)
    },
  },
}
</script>

<style lang="scss">
.slider-controls {
  display: flex;
  align-items: center;

  &__btn {
    @include btn-reset;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: $color_accent;
    transition: color 0.3s ease;

    @include hover {
      color: $color_accent_light;
    }

    svg {
      @include box(2rem);
    }
  }
}

.slider-controls-dots {
  display: flex;
  margin: 0 4.8rem;

  @include --mobile {
    margin: 0 3.2rem;
  }

  &__btn {
    @include box(2rem);
    @include btn-reset;
    position: relative;
    display: block;
    color: $color_grey_text;

    &:not(:last-child) {
      margin-right: 0.5rem;
    }

    &::after {
      position: absolute;
      top: calc(50% - 0.45rem);
      left: calc(50% - 0.45rem);
      border-radius: 50%;
      background-color: currentColor;
      content: '';
      @include box(0.9rem);
    }
  }
}
</style>
