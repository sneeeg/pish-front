<template>
  <div
    v-view="scrollHandler"
    :class="[
      'first-screen',
      { '_adaptive-top': adaptiveTop, _IE: browser.isIE },
    ]"
  >
    <div ref="firstScreen" class="first-screen__content">
      <div
        v-if="!major || majorBackgroungJPG"
        v-scroll-element="'right'"
        :class="['first-screen__background', { _major: majorBackgroungJPG }]"
        :style="{ backgroundImage: background ? `url(${background})` : false }"
      ></div>
      <h1
        v-if="!titles.length"
        v-scroll-element
        :class="['first-screen__title', { '_visually-h2': !major }]"
      >
        {{ title }}
      </h1>
      <div
        v-else-if="!browser.isIE && titles.length > 1"
        ref="titles"
        v-scroll-element
        class="first-screen-titles"
      >
        <h2 v-for="item in titles" :key="item.id">{{ item }}</h2>
      </div>
      <h1
        v-else
        v-scroll-element
        :class="['first-screen__title', { '_visually-h2': !major }]"
      >
        {{ titles[0] }}
      </h1>
      <HTMLContent
        v-if="lead"
        v-scroll-element
        :html="lead"
        class="first-screen__lead"
      />
      <Btn
        v-if="link"
        v-scroll-element
        :text="lang['base.sendRequest']"
        class="first-screen__link"
        is-link
        :to="settings.lkLink"
      />
    </div>

    <div v-if="video" :class="['first-screen__video', { _IE: browser.isIE }]">
      <img
        v-if="browser.isMobileSafari"
        src="/videos/arm2-last-frame.jpg"
        alt=""
      />
      <video
        ref="video"
        preload="auto"
        src="/videos/arm2.mp4"
        playsinline
        muted
      ></video>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gsap from 'gsap'
import HTMLContent from '~/components/utils/HTMLContent'
import Btn from '~/components/controls/Btn'
import scrollAnimation from '~/assets/js/composables/animations/scroll-animation'

export default {
  name: 'FirstScreen',
  components: { Btn, HTMLContent },
  props: {
    title: {
      type: String,
      default: '',
    },
    titles: {
      type: Array,
      default: () => [],
    },
    lead: {
      type: String,
      default: '',
    },
    link: {
      type: Boolean,
      default: false,
    },
    major: {
      type: Boolean,
      default: false,
    },
    adaptiveTop: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '',
    },
    video: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      motionIsActive: false,
      timeline: null,
      currentTitle: 0,
    }
  },
  computed: {
    ...mapState('default', ['lang', 'settings', 'routing']),
    ...mapState('responsive', ['browser', 'device']),
    majorBackgroungJPG() {
      return this.major && (this.browser.isIE || !this.device.isDesktop)
    },
  },
  mounted() {
    if (this.major && this.device.isDesktop) {
      this.$motion?.scenes.firstScreen.init(this.$refs.firstScreen)
    }

    this.$refs.video?.play()

    if (this.titles.length > 1 && !this.browser.isIE) {
      this.calcHeight()

      if (document.fonts) {
        document.fonts.ready.then(() => {
          this.calcHeight()

          window.addEventListener('resize', this.calcHeight.bind(this))
          this.createTimeline()
          scrollAnimation(this.$refs.firstScreen)
        })
      }
    } else {
      scrollAnimation(this.$refs.firstScreen)
    }
  },
  beforeDestroy() {
    this.major &&
      this.device.isDesktop &&
      this.$motion?.scenes.firstScreen.destroy()

    if (this.titles.length > 1 && !this.browser.isIE) {
      window.removeEventListener('resize', this.calcHeight.bind(this))
      this.timeline?.kill()
    }
  },
  methods: {
    scrollHandler(event) {
      if (!this.major || !this.device.isDesktop) return

      if (event.type === 'enter' && !this.motionIsActive) {
        this.motionIsActive = true
        this.timeline?.resume()

        this.$motion?.scenes.firstScreen.start()
      } else if (event.type === 'exit' && this.motionIsActive) {
        this.motionIsActive = false
        this.timeline?.paused()

        this.$motion?.scenes.firstScreen.freeze()
      }
    },
    calcHeight() {
      let result = 0

      this.$refs.titles.querySelectorAll('h2').forEach((title) => {
        const height = parseFloat(getComputedStyle(title).height)

        if (height > result) {
          result = height
        }
      })

      gsap.set(this.$refs.titles, { height: result + 'px' })
    },
    createTimeline() {
      const items = this.$refs.titles.querySelectorAll('h2')
      items.forEach((item, index) => index && gsap.set(item, { opacity: 0 }))

      this.timeline = gsap.timeline({ repeat: -1 })

      items.forEach((item, index) => {
        this.timeline.to(item, { opacity: 0, delay: 2, duration: 1 })

        this.timeline.to(
          index >= items.length - 1 ? items[0] : items[index + 1],
          {
            opacity: 1,
            duration: 1,
          }
        )
      })
    },
  },
}
</script>

<style lang="scss">
.first-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &._IE {
    height: calc(100vh - 15.7rem);
  }

  &__background {
    position: absolute;
    top: 0;
    right: -6rem;
    width: 71.6rem;
    height: 43.5rem;
    background-repeat: no-repeat;
    background-size: contain;

    @include --tablet {
      width: 40rem;
      height: 24.3rem;
    }

    @include --mobile {
      top: -10vh;
      width: 26rem;
      height: 15.8rem;
    }

    &._major {
      top: calc(50% - 36.5rem);
      width: 73rem;
      height: 58rem;

      @include --tablet {
        top: -40vh;

        @media (orientation: landscape) {
          display: none;
        }
      }

      @include --mobile {
        top: -30vh;
        width: 42rem;
        height: 33rem;
      }
    }
  }

  canvas {
    @include --tablet {
      visibility: hidden;
    }
  }

  @include --tablet {
    justify-content: flex-end;
    min-height: calc(100vh - 12.3rem);
  }

  @include --mobile {
    min-height: calc(100vh - 11rem);
  }

  &._adaptive-top {
    @include --tablet {
      justify-content: flex-start;
    }
  }

  &__content {
    @include container;
    @include padding-section;
    position: relative;
    min-height: calc(100vh - 15.7rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__title {
    max-width: 56rem;
  }

  &__link {
    width: 22rem;
    margin-top: 6.8rem;

    @include --mobile {
      width: 18rem;
    }
  }

  &__video {
    @include container;
    position: absolute;
    bottom: 0;
    z-index: -1;
    display: block;
    height: 100%;
    margin: 0 auto;

    &._IE {
      right: 30rem;
      z-index: 1;
      overflow: hidden;

      &::after {
        position: absolute;
        top: 0;
        right: 40rem;
        width: 1rem;
        height: 100%;
        background-color: $color_background;
        content: '';
      }
    }

    @include --mobile {
      height: 70%;
    }

    video,
    img {
      position: absolute;
      right: 0;
      width: auto;
      height: 100%;
    }

    img {
      z-index: -1;
    }
  }

  &__lead {
    max-width: 57rem;
    margin-top: 8.4rem;

    @include --mobile {
      margin-top: 4rem;
    }

    p {
      font-size: 1.8rem;
      line-height: 2.9rem;

      @include --mobile {
        font-size: 1.4rem;
        line-height: 2.2rem;
      }
    }
  }

  .first-screen-titles {
    position: relative;
    max-width: 56rem;

    h2 {
      position: absolute;
      max-width: 56rem;
    }
  }
}
</style>
