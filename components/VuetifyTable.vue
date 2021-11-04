<template>
  <v-data-table
    hide-default-footer
    :items-per-page="-1"
    :headers="headers"
    :items="items"
    class="bool-table"
  >
  </v-data-table>
</template>

<script>
import { VDataTable } from 'vuetify/lib'

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

<style lang="scss"></style>
