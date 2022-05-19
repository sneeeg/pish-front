<template>
  <div class="events">
    <!--    <Tabs class="events__tabs" :sections="sections" />-->
    <ul v-if="!window.isMobileSize" class="tabs__list">
      <li
        v-for="{ id, title } in sections"
        :key="id"
        :class="['tabs__item', { _selected: id === currentTabID }]"
        @click="toggleTab(id)"
      >
        {{ title }}
      </li>
    </ul>
    <CustomSelect
      v-else
      :value="currentTabID"
      :items="sections"
      class="tabs__select"
      @input="toggleTab"
    />
    <transition mode="out-in" :css="false" @enter="enter" @leave="leave">
      <div ref="content" :key="currentTabID">
        <div v-if="currentTabID === 1" class="events__content">
          <CouncilCard
            v-for="content in contents"
            :key="content.id"
            :title="content.title"
            :date="content.date"
            :status="content.status"
          />
        </div>
        <div v-else class="events__content">
          <MeetingCard
            v-for="content in contents"
            :key="content.id"
            :title="content.title"
            :date="content.date"
            :status="content.status"
            :time-tart="content.timeStart"
            :time-end="content.timeEnd"
            :city="content.city"
            :tags="content.tags"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'
import CustomSelect from '~/components/controls/CustomSelect'
import MeetingCard from '~/components/new/EventsCards/MeetingCard'
import CouncilCard from '~/components/new/EventsCards/CouncilCard'

export default {
  name: 'MainEvents',
  components: { CouncilCard, MeetingCard, CustomSelect },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    currentTabID: 2,
    tabsContentHeight: null,
    heightAnimation: null,
    animationIsOver: true,
  }),
  computed: {
    contents() {
      return this.sections.find((item) => item.id === this.currentTabID)?.body
    },
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
  },
  mounted() {
    this.tabsContentHeight = this.$refs.content.scrollHeight
  },
  methods: {
    toggleTab(id) {
      this.currentTabID = id
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
.events {
  &__content {
    display: flex;
    gap: 24px;
  }
}

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
