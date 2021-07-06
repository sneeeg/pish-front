<template>
  <div>
    <div
      v-view="scrollHandler"
      :class="[
        'first-screen',
        {
          '_adaptive-top': adaptiveTop,
          _IE: browser.isIE,
          _registration: registration,
        },
      ]"
    >
      <div ref="firstScreen" class="first-screen__content">
        <div
          v-if="!major || majorBackgroungJPG"
          v-scroll-element="'right'"
          :class="[
            'first-screen__background',
            { _major: majorBackgroungJPG, _about: about },
          ]"
          :style="{
            backgroundImage: background ? `url(${background})` : false,
          }"
        ></div>
        <h1
          v-if="!titles.length"
          v-scroll-element
          :class="[
            'first-screen__title',
            { '_visually-h2': !major, _about: about },
          ]"
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
        <HTMLContent
          v-if="htmlContent"
          v-scroll-element
          :html="htmlContent"
          class="first-screen__html-content"
        />
        <!--     TODO   -->
        <Btn
          v-if="false"
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
          :alt="$store.state.default.settings.siteName"
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

    <div
      ref="canvasContainer"
      :style="{
        position: 'absolute',
        top: '-15.7rem',
        left: '0vw',
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }"
      class="canvas-container"
    ></div>
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
    about: {
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
    registration: {
      type: Boolean,
      default: false,
    },
    htmlContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      motionIsActive: false,
      timeline: null,
      currentTitle: 0,
      calcHeightWrapper: this.calcHeight.bind(this),
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
      this.$motion?.scenes.firstScreen.init(this.$refs.canvasContainer)
    }

    this.$refs.video?.play()

    if (this.titles.length > 1 && !this.browser.isIE) {
      this.calcHeight()

      if (document.fonts) {
        document.fonts.ready.then(() => {
          this.calcHeight()

          window.addEventListener('resize', this.calcHeightWrapper)
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
      window.removeEventListener('resize', this.calcHeightWrapper)
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
.canvas-container {
  @include --tablet {
    visibility: hidden;
  }
}

.first-screen {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 16.3rem);

  &._IE {
    height: calc(100vh - 16.3rem);
  }

  &__html-content {
    margin-top: 8.6rem;

    @include --mobile {
      margin-top: 5.2rem;
    }

    .doc {
      color: $color_grey_text;

      span {
        background-image: none;
      }
    }
  }

  &__background {
    position: absolute;
    top: 10rem;
    right: -10rem;
    z-index: -1;
    width: 71.6rem;
    height: 43.5rem;
    background-repeat: no-repeat;
    background-size: contain;

    &._about {
      @include --tablet {
        top: 0;
        right: -20rem;
      }

      @include --mobile {
        right: -30rem;
        width: 58rem;
        height: 22rem;
      }
    }

    ._registration & {
      top: -15rem;
      right: -15rem;
      width: 85.4rem;
      height: 75.3rem;

      @include --tablet {
        top: -30rem;
        width: 60rem;
        height: 53rem;
      }

      @include --mobile {
        top: -25rem;
        display: block;
        width: 42rem;
        height: 37rem;
      }
    }

    //@include --tablet {
    //  display: none;
    //}

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

  @include --tablet {
    justify-content: flex-end;
    min-height: calc(100vh - 15.1rem);
  }

  @include --mobile {
    min-height: calc(100vh - 11.9rem);
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
  }

  &__title {
    max-width: 56rem;

    &._about {
      @include --tablet {
        margin-top: 30rem;
      }

      @include --mobile {
        margin-top: 15rem;
      }
    }
  }

  &-titles h2 {
    @include --mobile {
      font-size: 2.7rem;
    }
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

    ._registration & {
      max-width: 50rem;
      margin-top: 5.2rem;

      @include --mobile {
        margin-top: 4rem;
      }
    }

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
