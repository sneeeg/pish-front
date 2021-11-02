<template>
  <div>
    <ProgramConstructor is-child :items="items"></ProgramConstructor>
  </div>
</template>

<script>
import ProgramConstructor from '~/components/appConstructor/ProgramConstructor'

export default {
  name: 'ArrayGroup',
  components: { ProgramConstructor },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  mounted() {},
}
</script>
