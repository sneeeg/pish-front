<template>
  <Section v-view="scrollHandler" :title="title" background>
    <div class="countdown">
      <p v-scroll-element class="countdown__subtitle _visually-h5">
        {{ subtitle }}
      </p>

      <div v-scroll-element class="timer">
        <div class="timer__item">
          <span class="timer__number">{{ padStart(days, 2, '0') }}</span>
          <span class="timer__label">{{
            plural(days, 'день', 'дня', 'дней')
          }}</span>
        </div>
        <div class="timer__item">
          <span class="timer__number">{{ padStart(hours, 2, '0') }}</span>
          <span class="timer__label">{{
            plural(hours, 'час', 'часа', 'часов')
          }}</span>
        </div>
        <div class="timer__item">
          <span class="timer__number">{{ padStart(minutes, 2, '0') }}</span>
          <span class="timer__label">мин</span>
        </div>
        <div class="timer__item">
          <span class="timer__number">{{ padStart(seconds, 2, '0') }}</span>
          <span class="timer__label">сек</span>
        </div>
      </div>

      <Btn
        v-scroll-element
        :text="lang['base.sendRequest']"
        class="countdown__btn"
        is-link
        :to="settings.lkLink"
      />
    </div>

    <div class="countdown-video">
      <video
        v-if="window.isDesktopSize"
        ref="video"
        preload="auto"
        src="/videos/arm.mp4"
        playsinline
        muted
      ></video>
    </div>
  </Section>
</template>
<script>
import { mapState } from 'vuex'
import padStart from 'string.prototype.padstart'
import plural from 'plural-ru'
import Countdown from 'countdown-js'
import Btn from '~/components/controls/Btn'
import Section from '~/components/layout/Section'

export default {
  name: 'TheCountdown',
  components: {
    Section,
    Btn,
  },
  props: {
    sectionTitle: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    dateTo: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      active: [],
      countdown: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  },
  computed: {
    ...mapState('default', ['lang', 'settings']),
    ...mapState('responsive', ['window']),
  },
  created() {
    const dateTime = this.$dayjs(this.dateTo).toDate()

    this.countdown = Countdown.timer(
      dateTime,
      (timeLeft) => {
        const { days, hours, minutes, seconds } = timeLeft

        this.days = days
        this.hours = hours
        this.minutes = minutes
        this.seconds = seconds
      },
      () => {}
    )
  },
  beforeDestroy() {
    this.countdown?.abort()
  },
  methods: {
    plural,
    padStart,
    scrollHandler(event) {
      this.$utils.scrollCenterDetection(event, () => {
        this.$refs.video?.play()
      })
    },
  },
}
</script>
<style lang="scss">
.countdown {
  position: relative;
  z-index: 1;

  @include --from-tablet {
    margin: 0 0 4rem;
  }

  &__subtitle {
    margin-bottom: 4rem;
  }

  .timer {
    display: flex;

    > :not(:last-child) {
      margin-right: 4rem;

      @include --mobile {
        margin-right: 2rem;
      }
    }

    &__item {
      display: flex;
      flex-direction: column;
      color: $color_grey_text;
      font-size: 1.8rem;
    }

    &__number {
      margin-bottom: 1.6rem;
      color: $color_accent;
      font-size: 12rem;
      line-height: 7.4rem;
      will-change: transform;

      @include --tablet {
        margin-bottom: 1rem;
        font-size: 9rem;
        line-height: 5.8rem;
      }

      @include --mobile {
        font-size: 5rem;
        line-height: 3.2rem;
      }
    }

    &__label {
      @include --from-mobile {
        margin-left: 0.6rem;
      }
    }
  }

  &__btn {
    display: inline-flex;
    margin-top: 6.2rem;
  }
}

.countdown-video {
  @include box(100%);
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;

  video {
    width: auto;
    height: 100%;
  }
}
</style>
