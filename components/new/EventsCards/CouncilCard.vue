<template>
  <div class="events-card">
    <div>
      <div class="events-card__header">
        <div>
          <h1 class="card-header__date">
            {{
              $dayjs(new Date(dateStart)).format('D') +
              '-' +
              $dayjs(new Date(dateEnd)).format('D')
            }}
          </h1>
          <p class="card-header__month">
            {{ $dayjs(new Date(dateStart)).format('MMMM') }}
          </p>
        </div>
        <p v-if="status === 1" class="card-header__status _success">
          сейчас здесь
        </p>
      </div>
      <div class="events-card__body">
        <div class="card-body__logo">
          <img :src="logo" alt="logo" />
        </div>
        <div>
          <h4 class="card-body__title">
            {{ title }}
          </h4>
          <p class="card-body__city">{{ city }}</p>
        </div>
      </div>
    </div>
    <div class="events-card__footer">
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
    dateStart: {
      type: String,
      default: '',
    },
    dateEnd: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    city: {
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
.events-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 397px;
  min-height: 347px;
  padding: 24px;
  background: $color_white;

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .card-header {
      &__date {
        @include banner;
        font-weight: 400;
      }

      &__month {
        @include text-small;
        color: $color_grey_text;
      }

      &__status {
        @include text-small;
        display: flex;
        align-items: center;

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
      }
    }
  }

  &__body {
    display: flex;
    align-items: flex-start;
    margin-top: 24px;

    .card-body {
      &__logo {
        min-width: 24px;
        min-height: 24px;
        margin-right: 16px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      &__title {
        @include h4;
        font-weight: 500;
      }

      &__city {
        margin-top: 4px;
        color: $color_grey_text;
        font-size: 1.2rem;
      }
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;

    .card-footer {
      &__logo {
        width: 42px;
        height: 42px;
        border-radius: 100%;
        overflow: hidden;

        img {
          width: 100%;
        }
      }

      &__name {
        @include text-small;
        margin-left: 16px;
      }
    }
  }
}
</style>
