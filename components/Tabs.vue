<template>
  <div class="tabs">
    <template v-if="!window.isMobileSize">
      <ul class="tabs__list">
        <li
          v-for="{ id, title } in sections"
          :key="id"
          :class="[
            'tabs__item',
            '_visually-h4',
            { _selected: title === currentTab },
          ]"
          @click="toggleTab(title)"
        >
          {{ title }}
        </li>
      </ul>
      <transition mode="out-in" :css="false" @enter="enter" @leave="leave">
        <ul ref="content" :key="currentTab" class="tabs__content-list">
          <li
            v-for="content in contents"
            :key="content.id"
            class="tabs__content-item"
          >
            {{ content }}
          </li>
        </ul>
      </transition>
    </template>
    <template v-else>
      <ul ref="slider" class="tabs__slider">
        <li
          v-for="{ id, title, items } in sections"
          :key="id"
          class="tabs__ceil"
        >
          <h3 class="tabs__title">{{ title }}</h3>
          <ul class="tabs__content-list">
            <li v-for="item in items" :key="item.id" class="tabs__content-item">
              {{ item }}
            </li>
          </ul>
        </li>
      </ul>
      <div class="controls">
        <button ref="prev" class="controls__btn controls__prev">
          <svg-icon name="arrow-slider" />
        </button>
        <ol class="controls__dots">
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
        <button ref="next" class="controls__btn controls__next">
          <svg-icon name="arrow-slider" />
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState } from 'vuex'
import Slider from '~/assets/js/modules/slider.js'

export default {
  name: 'Tabs',
  components: {},
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data() {
    const dotNumbers = this.sections.map((item, i) => i)
    return {
      currentTab: this.sections[0].title,
      tabsContentHeight: null,
      heightAnimation: null,
      animationIsOver: true,
      slider: null,
      currentSlideIndex: 0,
      dotNumbers,
      sliderViewport: null,
      sliderViewportHeight: null,
    }
  },
  computed: {
    contents() {
      return this.sections.find((section) => section.title === this.currentTab)
        .items
    },
    ...mapState('responsive', ['window']),
  },
  mounted() {
    if (!this.window.isMobileSize) {
      this.tabsContentHeight = this.$refs.content.scrollHeight
    } else {
      this.initSlider()
    }

    this.$watch('window.isMobileSize', () => {
      this.window.isMobileSize && this.updateSlider()
    })
  },
  beforeUpdate() {
    !this.window.isMobileSize && this.destroySlider()
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
          adaptiveHeight: true,
          watchCSS: true,
          draggable: this.window.isMobileSize,
        },
        {
          prevButton: this.$refs.prev,
          nextButton: this.$refs.next,
        }
      )
      this.sliderViewport =
        this.$refs.slider.querySelector('.flickity-viewport')
      this.sliderViewportHeight = this.sliderViewport.style.height

      this.slider.flickity.on('change', (i) => {
        this.currentSlideIndex = i
        const viewportHeight = this.sliderViewportHeight
        const currentSlide = this.slider.flickity.selectedElement
        const currentSlideHeight = currentSlide.scrollHeight + 3
        gsap.set(this.sliderViewport, {
          height: viewportHeight,
          willChange: 'transform',
        })
        gsap.to(this.sliderViewport, {
          height: currentSlideHeight,
          duration: 0.45,
          ease: 'power1.out',
          onComplete: () => {
            this.sliderViewportHeight = currentSlideHeight
          },
        })
        if (parseInt(viewportHeight, 10) < currentSlideHeight) {
          gsap.set(currentSlide, {
            height: viewportHeight,
            willChange: 'transform',
          })
          gsap.to(currentSlide, {
            height: 'auto',
            duration: 0.45,
            ease: 'power1.out',
          })
        }
      })
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
    toggleTab(title) {
      this.currentTab = title
    },
    appearContent(el, done) {
      gsap.to(el, {
        opacity: 1,
        duration: 0.15,
        ease: 'power1.out',
        onComplete: () => {
          this.animationIsOver = true
          done()
        },
      })
    },
    enter(el, done) {
      this.animationIsOver = false
      gsap.set(el, {
        opacity: 0,
        willChange: 'transform',
      })
      if (this.tabsContentHeight !== el.scrollHeight) {
        gsap.set(el, {
          height: this.tabsContentHeight,
        })
        this.heightAnimation = gsap.to(el, {
          height: 'auto',
          duration: 0.45,
          delay: 0.15,
          ease: 'power1.out',
          onComplete: () => {
            this.appearContent(el, done)
          },
        })
      } else {
        this.appearContent(el, done)
      }
    },
    leave(el, done) {
      if (this.heightAnimation !== null) {
        this.heightAnimation.kill()
      }
      this.tabsContentHeight =
        el.style.height !== 'auto' && el.style.height !== ''
          ? el.style.height
          : el.scrollHeight
      if (this.animationIsOver) {
        gsap.fromTo(
          el,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 0.15,
            ease: 'power1.out',
            onComplete: done,
          }
        )
      } else {
        done()
      }
    },
  },
}
</script>

<style lang="scss">
.tabs {
  &__list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4.3rem;
    border-bottom: 1px solid $color_grey_border;

    @include --tablet {
      margin-bottom: 3.2rem;
    }

    @include --mobile {
      margin-bottom: 2.4rem;
    }
  }

  &__item {
    position: relative;
    flex: 0 1 auto;
    padding: 3px 2.4rem;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    opacity: 0.3;
    transition: all 300ms ease;

    @include --tablet {
      padding: 3px 0;
      font-size: 1.6rem;
      line-height: 2.2rem;
    }

    &::after {
      position: absolute;
      bottom: -2px;
      left: 0;
      display: block;
      width: 100%;
      height: 3px;
      background-color: transparent;
      content: '';
    }

    &._selected {
      opacity: 1;

      &::after {
        background-color: $color_red;
      }
    }
  }

  &__content-list {
    min-height: 17.8rem;
    column-count: 3;

    @include --tablet {
      min-height: 9.2rem;
      column-count: 2;
    }

    @include --mobile {
      column-count: auto;
    }
  }

  &__content-item {
    @include text-small;
    position: relative;
    padding: 0 2rem 0 1rem;
    break-inside: avoid-column;

    &:not(:first-child) {
      margin-top: 2rem;
    }

    &::before {
      position: absolute;
      top: 1rem;
      left: 0;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: $color_red;
      content: '';

      @include --mobile {
        top: 5px;
      }
    }
  }

  &__slider {
    margin-bottom: 3rem;

    &::after {
      display: none;
      content: 'flickity';
    }
  }

  &__ceil {
    width: 100%;
    margin-right: 2rem;
    padding: 2.7rem 2.1rem 5.1rem;
    border: 1px solid $color_red;
    overflow: hidden;
  }

  &__title {
    max-width: 75%;
    margin-bottom: 2px;
    font-weight: bold;
  }
}
</style>
