<template>
  <ul class="priority-block">
    <li
      v-for="{ id, icon, content } in priorities"
      :key="id"
      class="priority-block__item"
    >
      <Priority :icon="icon" :content="content" />
    </li>
  </ul>
</template>

<script>
import Priority from '~/components/Priority'

export default {
  name: 'PriorityBlock',
  components: { Priority },
  props: {
    priorities: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.priority-block {
  @include flexGap(3rem);

  &__item {
    flex: 1 1 calc(33% - 3rem);
    max-width: calc(33% - 3rem);

    @include --tablet {
      flex-basis: calc(50% - 3rem);
      max-width: calc(50% - 3rem);
    }

    @include --mobile {
      flex-basis: calc(100% - 3rem);
      max-width: none;
    }

    > .priority {
      min-height: 100%;
    }
  }
}
</style>
