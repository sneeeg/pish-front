<template>
  <Loader v-if="isLoading" />
  <div v-else-if="data" class="members">
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
        <MapFounders :items="data.participants" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'
import CustomSelect from '~/components/controls/CustomSelect'
import Loader from '~/components/Loader'
import MapFounders from '~/components/new/MembersMap/MapFounders'

const GROUPS = [
  'Группа 1 - участники программы (основной трек)',
  'Группа 2 - университеты творческой направленности',
  'Группа 3 - кандидаты на участие в программе',
  'Группа 4 - участники программы (реорганизация)',
]

export default {
  name: 'MainMembers',
  components: { Loader, MapFounders, CustomSelect },
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    currentTabID: 1,
    tabsContentHeight: null,
    heightAnimation: null,
    animationIsOver: true,
    isLoading: true,
    data: null,
  }),
  async fetch() {
    this.isLoading = true

    const [{ data }] = await Promise.all([this.$api.analytics.get()])

    data.participants.forEach((participant) => {
      participant.group = GROUPS[+participant.group - 1]
      participant.direction = []

      if (participant.isBase) {
        participant.direction.push('Базовая часть')
      }

      if (participant.special) {
        participant.direction.push(participant.special)
      }
    })

    this.data = data

    this.isLoading = false

    this.tabsContentHeight = this.$refs.content.scrollHeight
  },
  computed: {
    contents() {
      return this.sections.find((item) => item.id === this.currentTabID)?.body
    },
    ...mapState('default', ['lang']),
    ...mapState('responsive', ['window']),
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
.members {
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
    font-weight: 500;
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
      color: $color_red;

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
