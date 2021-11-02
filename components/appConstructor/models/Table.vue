<template>
  <v-simple-table class="table">
    <template #default>
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.id"
            class="text-left body-1"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td
            v-for="item in row"
            :key="item.id"
            class="table__item"
            v-html="item"
          ></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { VSimpleTable } from 'vuetify/lib'

export default {
  name: 'Table',
  components: { VSimpleTable },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.table {
  &__item {
    padding: 1.6rem !important;

    &:first-child {
      padding-left: 0 !important;
    }

    a {
      @include hover-opacity;
      position: relative;
      display: block;
      max-width: 19rem;
      padding: 0.8rem 1.4rem 0.8rem 4rem;
      border: 1px solid #989db0;
      border-radius: 4px;
      white-space: nowrap;

      &::before {
        @include box(2rem);
        position: absolute;
        top: calc(50% - 1rem);
        left: 1.6rem;
        background-image: url('~/assets/i/sprite/svg/file.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 1rem;
        content: '';
        content: '';
      }
    }
  }
}
</style>
