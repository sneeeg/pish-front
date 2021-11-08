<template>
  <v-data-table
    hide-default-footer
    :items-per-page="-1"
    :headers="headers"
    :items="items"
    class="vuetify-table"
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
          padding-bottom: 2rem;
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
          @include text-small;

          padding-top: 2.4rem;
          padding-bottom: 2.4rem;

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
            align-items: start;
            height: auto;

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
