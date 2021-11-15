<template>
  <v-data-table
    hide-default-footer
    :items-per-page="-1"
    :headers="headers"
    :items="items"
    class="v-data-table-custom vuetify-table"
  >
    <template #[`item.isParticipated`]="{ item }">
      <slot name="value" :value="item.isParticipated" />
    </template>
  </v-data-table>
</template>

<script>
import { VDataTable } from 'vuetify/lib'

/* TODO: table slots */
export default {
  name: 'VuetifyTable',

  components: { VDataTable },

  props: {
    /**
     * Table headers
     */
    headers: {
      type: Array,
      default: () => [],
    },

    /**
     * Table items
     */
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.vuetify-table {
  > .v-data-table__wrapper > table {
    > thead {
      > tr {
        > th {
          padding-bottom: 1.8rem;
          border-bottom: thin solid $color_grey_border !important;
          font-weight: 500;

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            padding-right: 0;
          }
        }
      }
    }

    > tbody {
      > tr {
        > td {

          padding-top: 2.4rem;
          padding-bottom: 2.4rem;
          font-size: 1.5rem !important;
          line-height: 1.8rem !important;

          @include --mobile {
            font-size: 1.4rem !important;
            line-height: 1.6rem !important;
          }

          &:first-child {
            padding-left: 0;
          }

          &:last-child {
            padding-right: 0;
          }

          @include --mobile {
            padding: 1.6rem 0;
          }

          &.v-data-table__mobile-table-row,
          &.v-data-table__mobile-row {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            height: auto !important;

            .v-data-table__mobile-row__header {
              margin-bottom: 1.2rem;
            }
          }

          &.v-data-table__mobile-table-row {
            padding-top: 0;
            border-bottom: none !important;
          }
        }
      }
    }
  }
}
</style>
