<template>
  <div class="countdown">
    <template v-if="settings.dateTo">
      <div class="countdown__title caption">{{ lang['base.dateTo'] }}</div>

      <div class="timer">
        <div class="timer__item">
          <div class="timer__number body-2">
            <span
              v-for="digit in padStart(days, 2, '0')"
              :key="digit.id"
              class="timer__digit"
            >
              {{ digit }}
            </span>
          </div>
          <span class="timer__label caption">{{
            plural(days, 'день', 'дня', 'дней')
          }}</span>
        </div>
        <div class="timer__item">
          <div class="timer__number body-2">
            <span
              v-for="digit in padStart(hours, 2, '0')"
              :key="digit.id"
              class="timer__digit"
            >
              {{ digit }}
            </span>
          </div>
          <span class="timer__label caption">{{
            plural(hours, 'час', 'часа', 'часов')
          }}</span>
        </div>
        <div class="timer__item">
          <div class="timer__number body-2">
            <span
              v-for="digit in padStart(minutes, 2, '0')"
              :key="digit.id"
              class="timer__digit"
            >
              {{ digit }}
            </span>
          </div>
          <span class="timer__label caption">мин</span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import padStart from 'string.prototype.padstart'
import plural from 'plural-ru'
import Countdown from 'countdown-js'

export default {
  name: 'Countdown',
  components: {},
  props: {
    dateTo: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      instance: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  },
  computed: {
    ...mapState('default', ['lang', 'settings']),
  },
  created() {
    if (this.settings.dateTo) {
      const dateTime = this.$dayjs(this.settings.dateTo).toDate()

      this.instance = Countdown.timer(
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
    }
  },
  beforeDestroy() {
    this.instance?.abort()
  },
  methods: {
    plural,
    padStart,
  },
}
</script>
<style lang="scss">
.countdown {
  @include text-button-small;
  position: relative;
  z-index: 1;
  font-weight: normal;
  text-align: center;
  text-transform: none;

  &__title {
    margin-bottom: 0.8rem;
    text-align: left;
  }
}

.timer {
  display: flex;

  &__item {
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-right: 1.2rem;
    }
  }

  &__number {
    display: flex;
    will-change: transform;
  }

  &__digit {
    @include text-button;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.6rem;
    height: 3.6rem;
    border-radius: 4px;
    color: $color_white;
    text-transform: none;
    background-color: $color_accent;

    &:not(:last-child) {
      margin-right: 4px;
    }
  }

  &__label {
    margin-top: 4px;
  }
}
</style>
