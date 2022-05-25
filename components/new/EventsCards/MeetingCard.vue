<template>
  <div class="events-card">
    <div class="events-card__header">
      <h1 class="card-header__date">
        {{ $dayjs(new Date(date)).format('D') }}
      </h1>
      <p class="card-header__month">
        {{ $dayjs(new Date(date)).format('MMMM') }}
      </p>
      <h4 class="card-header__title">
        {{ title }}
      </h4>
      <p v-if="status === 1" class="card-header__status _success">
        идет сейчас
      </p>
      <p v-if="status === 2" class="card-header__status _ready">
        начнется завтра
      </p>
      <p v-if="status === 3" class="card-header__status _cancel">прошло</p>
    </div>
    <div class="events-card__footer">
      <div class="card-footer__time">
        <div class="time-item">
          <SvgIcon name="clock" />
          <p>{{ timeStart + ' - ' + timeEnd }}</p>
        </div>
        <div class="time-item">
          <SvgIcon name="map-pin" />
          <p>{{ city }}</p>
        </div>
      </div>
      <div class="card-footer__tags">
        <p v-for="tag in tags" :key="tag" class="tags-item">
          {{ '#' + tag }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetingCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    status: {
      type: Number,
      default: null,
    },
    city: {
      type: String,
      default: '',
    },
    timeStart: {
      type: String,
      default: '',
    },
    timeEnd: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.events-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 32.1%;
  min-height: 347px;
  padding: 24px;
  background: $color_white;

  &:not(:last-child) {
    margin-right: 1.9%;
  }

  &__header {
    .card-header {
      &__date {
        @include banner;
        font-weight: 400;
      }

      &__month {
        @include text-small;
        color: $color_grey_text;
      }

      &__title {
        @include h4;
        margin-top: 24px;
        font-weight: 500;
      }

      &__status {
        @include text-small;
        display: flex;
        align-items: center;
        margin-top: 8px;

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
    }
  }

  &__footer {
    .card-footer {
      &__time {
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

      &__tags {
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
}
</style>
