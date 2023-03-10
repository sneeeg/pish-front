<template>
  <div class="tabs">
    <ul v-if="!window.isMobileSize" class="tabs__list">
      <li
        v-for="({ id, title }, index) in items"
        :key="id"
        :class="['tabs__item', { _selected: id === currentTabID }]"
        @click="toggleTab(id, index)"
      >
        {{ title }}
      </li>
    </ul>
    <CustomSelect
      v-else
      :value="currentTabID"
      :items="items"
      class="tabs__select"
      @input="toggleTab"
    />
    <transition mode="out-in" :css="false" @enter="enter" @leave="leave">
      <div ref="content" :key="currentTabID" class="tabs__content-list">
        <slot name="tabs__content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap'
import { mapState } from 'vuex'

import CustomSelect from '~/components/controls/CustomSelect'

export default {
  name: 'Tabs',
  components: { CustomSelect },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data() {
    const items = this.sections.map((section, i) => ({
      ...section,
      id: `${section.title + ' #' + i}`,
    }))
    return {
      currentTabID: items[0].id,
      items,
      tabsContentHeight: null,
      heightAnimation: null,
      animationIsOver: true,
    }
  },
  computed: {
    contents() {
      return this.items.find((item) => item.id === this.currentTabID)?.items
    },
    ...mapState('responsive', ['window']),
  },
  mounted() {
    this.tabsContentHeight = this.$refs.content.scrollHeight

    this.toggleTab(this.items[0].id, 0)
  },
  methods: {
    toggleTab(id, index) {
      this.currentTabID = id
      this.$emit('change', index)
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

<style lang="scss" scoped>
.tabs {
  &__list {
    display: flex;
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
    padding: 16px 0;
    font-weight: 500;
    font-size: 12px;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    opacity: 0.3;
    transition: all 300ms ease;

    &:not(:first-child) {
      margin-left: 24px;
    }

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
      color: $color_red;
      opacity: 1;

      &::after {
        background-color: $color_red;
      }
    }
  }

  &__select {
    margin-bottom: 2rem;
  }

  &__content-list {
    min-height: 17.8rem;
    //column-count: 3;

    li {
      //page-break-inside: avoid;
      //break-inside: avoid;
    }

    @include --tablet {
      min-height: 9.2rem;
      //column-count: 2;
    }

    @include --mobile {
      //column-count: auto;
    }
  }

  &__content-item {
    @include text-small;
    position: relative;
    padding: 0 2rem 0 2rem;
    break-inside: avoid-column;

    span {
      color: $color_accent;
    }

    &:not(:first-child) {
      margin-top: 2rem;
    }

    &::before {
      position: absolute;
      top: 0.6rem;
      left: 0;
      width: 5px;
      height: 5px;
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
    margin-bottom: 2rem;
    font-weight: bold;
  }
}
</style>
