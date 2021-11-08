<template>
  <div class="program-wrapper">
    <div
      v-for="item in items"
      :id="getItemId(item)"
      :key="item.id"
      :data-title="getItemId(item)"
      class="program-wrapper-item"
    >
      <div
        v-if="item.title || item.description"
        class="program-wrapper-item__head"
      >
        <div
          v-if="item.title"
          :class="['program-wrapper-item__title', { '_visually-h4': !isChild }]"
          v-html="item.title"
        ></div>

        <div
          v-if="item.description"
          class="program-wrapper-item__description"
          v-html="item.description"
        ></div>
      </div>

      <component
        :is="item.component"
        class="program-wrapper-item__component"
        v-bind="item.props"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramWrapper',

  props: {
    items: {
      type: Array,
      required: true,
    },
    isChild: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getItemId(item) {
      return (item.title || item.props.title) && !this.isChild ? item.id : false
    },
  },
}
</script>

<style lang="scss">
.program-wrapper-item {
  &:not(:last-child) {
    margin-bottom: 2.4rem;
  }

  &__head {
    margin-bottom: 1.8rem;
  }

  &__title {
    font-weight: 500;
  }
}
</style>
