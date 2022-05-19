<template>
  <div class="events__card">
    <div>
      <h1>
        {{ $dayjs(new Date(date)).format('D') }}
      </h1>
      <p>
        {{ $dayjs(new Date(date)).format('MMMM') }}
      </p>
      <h4 class="events__card-title">
        {{ title }}
      </h4>
      <p v-if="status === 1" class="events__card-status _success">
        идет сейчас
      </p>
      <p v-if="status === 2" class="events__card-status _ready">
        начнется завтра
      </p>
      <p v-if="status === 3" class="events__card-status _cancel">прошло</p>
    </div>
    <div>
      <div class="events__card-time">
        <div class="time-item">
          <SvgIcon name="clock" />
          <p>{{ timeStart + ' - ' + timeEnd }}</p>
        </div>
        <div class="time-item">
          <SvgIcon name="map-pin" />
          <p>{{ city }}</p>
        </div>
      </div>
      <div class="events__card-tags">
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
.events {
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
</style>
