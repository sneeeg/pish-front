<template>
  <div class="error">
    <div class="error__content">
      <h1 class="error__title _visually-h2">
        Иногда сайты тоже бывают перегруженными
      </h1>
      <p v-if="error.statusCode === 404" class="error__text">
        Извините, страница не найдена. Попробуйте еще раз позже
      </p>
      <p v-else class="error__text">произошла ошибка</p>
      <Btn to="/" text="Вернуться на главную" is-link />
    </div>
    <div class="error__image-wrapper">
      <img src="/error/404.png" />
    </div>
  </div>
</template>

<script>
import Btn from '~/components/controls/Btn'
export default {
  name: 'Error',
  components: { Btn },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.error {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  &__content {
    display: flex;
    flex: 0 0 54%;
    flex-direction: column;
    align-items: flex-start;

    @include --tablet {
      flex: 0 0 100%;
      margin-bottom: 2.4rem;
    }
  }

  &__title {
    margin: 0 0 3.7rem !important;

    @include --tablet {
      margin-bottom: 3.2rem !important;
    }

    @include --mobile {
      margin-bottom: 1.6rem !important;
    }
  }

  &__text {
    @include text;
    margin: 0 0 6.6rem;

    @include --tablet {
      margin-bottom: 4rem;
    }

    @include --mobile {
      margin-bottom: 2.4rem;
    }
  }

  &__image-wrapper {
    display: flex;
    flex: 0 0 44%;
    align-items: center;
    justify-content: center;

    @include --tablet {
      flex: 0 0 100%;
    }

    > img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
