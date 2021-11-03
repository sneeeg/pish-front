<template>
  <div class="checkbox-group">
    <Checkbox
      v-for="({ value, text }, index) in items"
      :key="index"
      readonly
      :model-value="!!value"
      black
      :label="text"
    />
  </div>
</template>

<script>
import Checkbox from '~/components/controls/Checkbox'

export default {
  name: 'CheckboxGroup',
  components: { Checkbox },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.checkbox-group {
  > * {
    &:not(:last-child) {
      margin-bottom: 1.6rem;
    }
  }
}
</style>
