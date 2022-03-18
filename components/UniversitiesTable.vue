<template>
  <table ref="table" class="universities-table">
    <thead>
      <tr>
        <th v-for="(item, index) in headers" :key="index">
          {{ item }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>
          <div class="universities-table-cell">
            <div class="universities-table-cell__content">
              <div
                v-if="item.shortName"
                :class="[
                  'universities-table-cell__title',
                  { _margin: item.name },
                ]"
                v-html="item.shortName"
              ></div>
              <div
                v-if="item.name"
                class="universities-table-cell__text"
                v-html="item.name"
              ></div>
            </div>
          </div>
        </td>
        <td>
          <div class="universities-table-cell">
            <div v-if="item.founderLogo" class="universities-table-cell__img">
              <img :src="item.founderLogo" :alt="item.founder" />
            </div>
            <div class="universities-table-cell__content">
              <div
                v-if="item.founder"
                class="universities-table-cell__text"
                v-html="item.founder"
              ></div>
            </div>
          </div>
        </td>
        <td>
          <div class="universities-table-cell">
            <div class="universities-table-cell__content">
              <div
                v-if="item.city"
                :class="[
                  'universities-table-cell__title',
                  { _margin: item.region },
                ]"
                v-html="item.city"
              ></div>
              <div
                v-if="item.region"
                class="universities-table-cell__text"
                v-html="item.region"
              ></div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UniversitiesTable',

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapState('default', ['lang']),
    headers() {
      const keys = ['university', 'founder', 'city']

      return keys.reduce((acc, key) => {
        acc.push(this.lang[`commission.${key}`])

        return acc
      }, [])
    },
  },

  mounted() {
    this.$utils.wrapTable(this.$refs.table)
  },
}
</script>

<style lang="scss">
@mixin cellGutter {
  padding: 2.4rem 0;

  @include --mobile {
    padding: 1.8rem 0;
  }

  &:not(:last-child) {
    padding-right: 2.4rem;

    @include --mobile {
      padding-right: 1.8rem;
    }
  }
}

.universities-table {
  width: 100%;
  border-collapse: collapse;

  td,
  th {
    text-align: left;
    vertical-align: middle;
  }

  thead {
    tr {
      th {
        @include cellGutter;
        padding-top: 0 !important;
        color: #959595;

        font-weight: 500;
      }
    }
  }

  tbody {
    tr {
      border-top: 2px solid $color_grey_border;

      td {
        @include cellGutter;

        &:first-child {
          min-width: 61rem;

          @include --tablet {
            min-width: 40rem;
          }

          @include --mobile {
            min-width: 36rem;
          }
        }

        &:not(:first-child) {
          min-width: 29rem;
          max-width: 29rem;

          @include --mobile {
            min-width: 20rem;
            max-width: 20rem;
          }

          .universities-table-cell__content {
            max-width: 21.5rem;
          }
        }
      }
    }
  }
}

.universities-table-cell {
  display: flex;

  &__title {
    font-weight: 500;

    &._margin {
      margin-bottom: 2px;
    }
  }

  &__text {
    @include text-button-small;

    color: #959595;
    font-weight: 400;
    text-transform: none;
  }

  &__img {
    flex-shrink: 0;
    width: 2.4rem;
    height: 100%;
    margin-right: 1.2rem;

    img {
      @include box(100%);
      object-fit: contain;
      object-position: top center;
    }
  }
}
</style>
