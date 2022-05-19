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
    <div class="events__card-footer">
      <div class="card-footer__logo">
        <img src="/i/commission/example.jpg" alt="avatar" />
      </div>
      <p class="card-footer__name">Волков Андрей Евгеньевич</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouncilCard',
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

    &-footer {
      display: flex;
      align-items: center;

      .card-footer__logo {
        width: 42px;
        height: 42px;
        border-radius: 100%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
