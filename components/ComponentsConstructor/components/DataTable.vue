<template>
  <v-data-table
    v-if="hasCategories"
    ref="table"
    class="v-data-table-custom constructor-data-table"
    :headers="_headers"
    :items="items"
    group-by="category"
    :items-per-page="-1"
    hide-default-footer
  >
  </v-data-table>
  <v-data-table
    v-else
    ref="table"
    class="v-data-table-custom constructor-data-table"
    :headers="_headers"
    :items="items"
    :items-per-page="-1"
    hide-default-footer
  >
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    _headers() {
      return this.headers.reduce((acc, item, index) => {
        if (!index) {
          item.align = 'start'
        }
        item.sortable = false

        acc.push(item)
        return acc
      }, [])
    },
    hasCategories() {
      return this.items.find((item) => item.category)
    },
  },
  mounted() {
    const groups = this.$refs.table.$el.querySelectorAll(
      '.v-row-group__header td'
    )

    groups.forEach((group) => {
      const name = group.innerText.split(':')[1]
      group.innerText = name
    })
  },
}
</script>

<style lang="scss">
.constructor-data-table {
  > .v-data-table__wrapper > table {
    .v-data-table-header {
      th {
        &:first-child {
          padding-left: 0 !important;
        }

        span {
          white-space: nowrap;
          text-transform: uppercase;
        }
      }
    }

    tbody {
      tr:not(.v-row-group__header) {
        td {
          &:first-child {
            padding-left: 0 !important;
          }
        }
      }

      tr {
        td {
          padding-top: 0.8rem !important;
          padding-bottom: 0.8rem !important;
          font-size: 1.5rem !important;
          line-height: 1.8rem !important;

          @include --mobile {
            font-size: 1.4rem !important;
            line-height: 1.6rem !important;
          }
        }
      }
    }
  }
}
</style>
