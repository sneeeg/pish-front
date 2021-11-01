<template>
  <div class="indicator">
    <div class="indicator__title">
      {{ indicator.indicator }} {{ indicator.description }}
    </div>

    <div class="indicator__chart">
      <ChartController
        :initial-indicator="indicator"
        is-need-prepare
      ></ChartController>
    </div>

    <Expandable>
      <template #title> Значения показателя </template>
      <template #default>
        <table>
          <thead>
            <tr>
              <th class="text-left">Год</th>
              <th class="text-left">Значение</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(label, index) in indicator.label"
              :key="index"
              class="text-left"
            >
              <td>{{ label }}</td>
              <td>
                {{
                  new Intl.NumberFormat('ru-RU', {
                    minimumFractionDigits: indicator.value[index]
                      .toString()
                      .includes('.')
                      ? 2
                      : 0,
                  }).format(indicator.value[index])
                }}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="indicator.calculationMethod"
          class="indicator__calculation-method"
          v-html="indicator.calculationMethod"
        ></div>
      </template>
    </Expandable>
  </div>
</template>
<script>
import Expandable from '~/components/Expandable'
import ChartController from '~/components/charts/ChartController'

export default {
  name: 'Indicator',
  components: {
    Expandable,
    ChartController,
  },
  props: {
    indicator: {
      type: Object,
      default: null,
    },
  },
}
</script>
<style lang="scss">
.indicator {
  padding: 2.4rem;
  border-radius: 4px;
  background: #fff;

  &__title {
    margin-bottom: 2.4rem;
    font-size: 1.5rem;
    line-height: 2rem;

    @include --mobile {
      margin-bottom: 1.4rem;
    }
  }

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  &__chart {
    margin-bottom: 4rem;

    @include --mobile {
      margin-bottom: 2.8rem;
    }
  }

  .expandable {
    &__label {
      position: relative;
      padding-left: 3rem;
      border: 0;
      color: inherit;
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 2.4rem;
      background: transparent;

      &::before {
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 1.2rem;
        height: 0.8rem;
        background: url("data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.41 7.41 6 2.83l4.59 4.58L12 6 6 0 0 6l1.41 1.41Z' fill='%23F32735'/%3E%3C/svg%3E")
          no-repeat center center / contain;
        transform: translate(0, -50%) rotate(-180deg);
        transition: transform 0.25s ease;
        content: '';
      }

      &._active {
        &::before {
          transform: translate(0, -50%);
        }
      }
    }

    &__content {
      &::before,
      &::after {
        display: table;
        height: 3rem;
        content: '';

        @include --mobile {
          height: 1.8rem;
        }
      }
    }
  }

  table {
    width: 100%;
    max-width: 90rem;
    border-collapse: collapse;

    tbody {
      font-family: $font-monospaced;
      text-align: right;
    }

    th {
      color: $color_dark_grey;
      font-weight: 400;
      font-size: 1.4rem;
      text-align: left;
      text-transform: uppercase;
      background: #f9f9f9;

      &:first-child {
        text-align: left;
      }
    }

    td,
    th {
      padding: 1rem 3rem;

      @include --mobile {
        padding: 1rem;
      }

      &:not(:last-child) {
        border-right: 1px solid $color_grey_border;
      }
    }

    td {
      padding: 1rem 6rem;
      border-bottom: 1px solid $color_grey_border;

      @include --mobile {
        padding: 1rem;
      }
    }
  }

  &__calculation-method {
    max-width: 86.6rem;
    margin-top: 4rem;
    font-size: 1.5rem;
  }
}
</style>
