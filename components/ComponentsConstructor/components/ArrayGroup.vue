<template>
  <ProgramWrapper :items="items" is-child />
</template>

<script>
import ProgramWrapper from '~/components/ProgramWrapper'

export default {
  name: 'ArrayGroup',
  components: { ProgramWrapper },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
}
</script>
