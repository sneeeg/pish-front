<template>
  <div
    ref="firstScreen"
    v-view="scrollHandler"
    :class="['first-screen', { '_adaptive-top': adaptiveTop }]"
  >
    <div class="first-screen__content">
      <div
        v-scroll-element="'right'"
        class="first-screen__background"
        :style="{ backgroundImage: background ? `url(${background})` : false }"
      ></div>
      <h1
        v-scroll-element
        :class="['first-screen__title', { '_visually-h2': !major }]"
      >
        {{ title }}
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HTMLContent from '~/components/utils/HTMLContent'
import Btn from '~/components/controls/Btn'
import scrollAnimation from '~/assets/js/composables/animations/scroll-animation'

export default {
  name: 'FirstScreen',
  components: { Btn, HTMLContent },
  props: {
    title: {
      type: String,
      required: true,
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
  },
  data() {
    return {
      motionIsActive: false,
    }
  },
  computed: {
    ...mapState('default', ['lang', 'settings', 'routing']),
  },
  mounted() {
    if (this.major) {
      this.$motion?.scenes.firstScreen.init(this.$refs.firstScreen)
    }

    scrollAnimation(this.$refs.firstScreen)
  },
  beforeDestroy() {
    this.major && this.$motion?.scenes.firstScreen.destroy()
  },
  methods: {
    scrollHandler(event) {
      if (!this.major) return

      if (event.type === 'enter' && !this.motionIsActive) {
        this.motionIsActive = true

        this.$motion?.scenes.firstScreen.start()
      } else if (event.type === 'exit' && this.motionIsActive) {
        this.motionIsActive = false

        this.$motion?.scenes.firstScreen.freeze()
      }
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
  min-height: calc(100vh - 15.7rem);

  &__background {
    position: absolute;
    top: 0;
    right: -3rem;
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
  }

  &__title {
    max-width: 60rem;
  }

  &__link {
    width: 22rem;
    margin-top: 6.8rem;

    @include --mobile {
      width: 18rem;
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
}
</style>
