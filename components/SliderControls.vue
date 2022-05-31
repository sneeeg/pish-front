<template>
  <div class="slider-controls-component">
    <ControlBtn
      class="slider-controls-component__btn"
      :disabled="!slideIndex"
      @click.native="changeSlide(slideIndex - 1)"
    />
    <!--    <div class="slider-controls-component-dots">
      <button
        v-for="(btn, index) in total"
        :key="btn.id"
        type="button"
        :class="[
          'slider-controls-component-dots__btn',
          'accent-color-by-active',
          { _active: slideIndex === index },
        ]"
        @click="changeSlide(index)"
      ></button>
    </div>-->
    <ControlBtn
      class="slider-controls-component__btn"
      :disabled="slideIndex === total - 1"
      type="next"
      @click.native="changeSlide(slideIndex + 1)"
    />
  </div>
</template>

<script>
import ControlBtn from '~/components/controls/ControlBtn'
export default {
  name: 'SliderControls',
  components: { ControlBtn },
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
.slider-controls-component {
  display: flex;
  align-items: center;

  &__btn:not(:first-child) {
    margin-left: 12px;
  }
}

.slider-controls-component-dots {
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
