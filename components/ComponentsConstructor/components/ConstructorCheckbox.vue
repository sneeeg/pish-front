<template>
  <div>
    <Checkbox v-model="model" readonly black :label="text" />
  </div>
</template>

<script>
import Checkbox from '~/components/controls/Checkbox'

export default {
  name: 'ConstructorCheckbox',
  components: { Checkbox },
  props: {
    value: {
      type: Boolean,
      default: null,
    },
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      model: !!this.value,
    }
  },
}
</script>

<style scoped></style>
