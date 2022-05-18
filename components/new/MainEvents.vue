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
      <div ref="content" :key="currentTabID" class="events__content">
        <div v-for="content in contents" :key="content.id" class="events__card">
          <div>
            <h1>
              {{ $dayjs(new Date(content.date)).format('D') }}
            </h1>
            <p>
              {{ $dayjs(new Date(content.date)).format('MMMM') }}
            </p>
            <h4 class="events__card-title">
              {{ content.title }}
            </h4>
            <p v-if="content.status === 1" class="events__card-status _success">
              идет сейчас
            </p>
            <p v-if="content.status === 2" class="events__card-status _ready">
              начнется завтра
            </p>
            <p v-if="content.status === 3" class="events__card-status _cancel">
              прошло
            </p>
          </div>
          <div>
            <div class="events__card-time">
              <div class="time-item">
                <SvgIcon name="clock" />
                <p>{{ content.timeStart + ' - ' + content.timeEnd }}</p>
              </div>
              <div class="time-item">
                <SvgIcon name="map-pin" />
                <p>{{ content.city }}</p>
              </div>
            </div>
            <div class="events__card-tags">
              <p v-for="tag in content.tags" :key="tag" class="tags-item">
                {{ '#' + tag }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'
import CustomSelect from '~/components/controls/CustomSelect'

export default {
  name: 'MainEvents',
  components: { CustomSelect },
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

  &__card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 397px;
    min-height: 347px;
    padding: 24px;
    background: $color_white;

    &-title {
      margin-top: 24px;
      font-size: 18px;
      line-height: 23px;
    }

    &-status {
      display: flex;
      align-items: center;
      margin-top: 8px;
      font-size: 14px;
      line-height: 18px;

      &::before {
        display: block;
        width: 7px;
        height: 7px;
        margin-right: 8px;
        border-radius: 100%;
        background: currentColor;
        transition: 0.5s ease-in-out;
        content: '';
        pointer-events: none;
      }

      &._success {
        color: $color_status_success;
      }

      &._ready {
        color: $color_status_ready;
      }

      &._cancel {
        color: $color_status_cancel;
      }
    }

    &-time {
      margin-top: 24px;

      .time-item {
        display: flex;
        align-items: center;
        font-size: 16px;
        line-height: 24px;

        &:not(:first-child) {
          margin-top: 8px;
        }

        svg {
          @include box(2rem);
          margin-right: 12px;
        }
      }
    }

    &-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 32px;
      color: #6b6b74;
      font-weight: 500;
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
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
