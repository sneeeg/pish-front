<template>
  <div class="chart-banner">
    <div
      class="chart-banner__background"
      :style="{ backgroundImage: 'url(/i/analytics/banner.png)' }"
    ></div>

    <div class="chart-banner__content">
      <div class="chart-banner__title">
        У 4 университетов* поиск информации на&nbsp;сайте&nbsp;занимает<br />
        <strong>не более 26 секунд</strong>
      </div>

      <p class="chart-banner__text">
        По статистике, если студент ищет информацию
        <strong>более 26 секунд</strong>, вероятность того, что он бросит поиск,
        составляет <strong>87&thinsp;%</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
}
</script>

<style lang="scss">
.chart-banner {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;

  &__background {
    @include box(100%);

    position: absolute;
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: contain;
    right: -2.4rem;
    bottom: -2.4rem;

    @include --mobile {
      display: none;
    }
  }

  &__content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    z-index: 1;
    max-width: 30rem;

    @include --mobile {
      max-width: 100%;
    }
  }

  &__title {
    @include text-subtitle;

    font-weight: 400;

    strong {
      display: block;
      margin-top: 0.6rem;
      font-weight: 700;
      color: $color_accent;
    }
  }

  &__text {
    @include text-small;

    margin-top: 3.2rem;
  }
}
</style>
