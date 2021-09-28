<template>
  <div class="persons-list">
    <PersonCard
      v-for="person in items"
      :key="person.id"
      class="persons-list__item"
      :person="person"
      :colored="colored"
    />
  </div>
</template>

<script>
import PersonCard from '~/components/PersonCard'
export default {
  name: 'PersonsList',
  components: { PersonCard },
  props: {
    colored: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.persons-list {
  @include flexGap(3rem);

  > * {
    flex: 1 1 25%;
  }
}
</style>
